#!/usr/bin/env node

import inquirer from "inquirer";
import { Command } from "commander";
import chalk from "chalk";
import path from "node:path";
import fs from "fs-extra";
import handlebars from "handlebars";
import { execa } from "execa";

const program = new Command();

program
  .name("create-xstack")
  .description("Scaffolds a new Express.js backend project.")
  .version("0.1.0");

program
  .argument("[project-name]", "Name of the project to create")
  .action(async (projectNameArg) => {
    // Flag to track if the process is being cancelled by SIGINT (Ctrl+C)
    let isCancelling = false;
    // To store the path of the partially created project for cleanup
    let projectPathForCleanup = null;

    // --- Graceful Cancellation (SIGINT) Handler ---
    process.on("SIGINT", () => {
      if (!isCancelling) {
        // Prevent multiple messages on repeated Ctrl+C
        isCancelling = true;
        console.log(chalk.yellow("\n\nCancelling project creation..."));
        // Exit immediately. The outer try-catch will then check `isCancelling`
        // and perform cleanup.
        process.exit(1); // Exit with non-zero code to indicate interruption
      }
    });

    const questions = [
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: "express-project",
        when: !projectNameArg,
        validate: (input) => {
          if (!input) {
            return "Project name cannot be empty.";
          }
          if (!/^[a-z0-9-_]+$/.test(input)) {
            return "Project name can only contain lowercase letters, numbers, hyphens, and underscores.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "language",
        message: "Which language do you want to use?",
        choices: ["TypeScript", "JavaScript"],
        default: "TypeScript",
      },
      {
        type: "list",
        name: "database",
        message: "Which database do you want to use?",
        choices: ["PostgreSQL", "MongoDB"],
        default: "PostgreSQL",
      },
      {
        type: "list",
        name: "ormOdM",
        message: "Which ORM/ODM do you want to use?",
        when: (answers) =>
          answers.database === "PostgreSQL" || answers.database === "MongoDB",
        choices: (answers) =>
          answers.database === "PostgreSQL" ? ["Drizzle"] : ["Mongoose"],
        default: (answers) =>
          answers.database === "PostgreSQL" ? "Drizzle" : "Mongoose",
      },
      {
        type: "checkbox",
        name: "otherTools",
        message:
          "Select other tools you want to include (press space to select):",
        choices: [
          { name: "JWT (JSON Web Tokens)", value: "JWT" },
          { name: "Bcrypt (password hashing)", value: "Bcrypt" },
          { name: "Multer (file uploads)", value: "Multer" },
        ],
        default: [],
      },
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use?",
        choices: ["npm", "pnpm"],
        default: "pnpm",
      },
    ];

    try {
      const answers = await inquirer.prompt(questions); // Inquirer might throw if cancelled here
      const resolvedProjectName = projectNameArg || answers.projectName;
      projectPathForCleanup = path.join(process.cwd(), resolvedProjectName); // Set path for potential cleanup

      console.log(
        chalk.green(
          `\nScaffolding project ${chalk.bold(resolvedProjectName)}...`
        )
      );

      await createExpressApp({
        ...answers,
        projectName: resolvedProjectName,
      });

      console.log(
        chalk.green(
          `\n🚀 Project ${chalk.bold(
            resolvedProjectName
          )} created successfully!`
        )
      );
      console.log(chalk.cyan(`\nNext steps:`));
      console.log(chalk.cyan(`  cd ${resolvedProjectName}`));
      console.log(chalk.cyan(`  ${answers.packageManager} install`)); // Remind user to install dependencies again (though we already did it)
      console.log(chalk.cyan(`  ${answers.packageManager} dev`));
      console.log(chalk.cyan(`\nHappy coding!`));
    } catch (error) {
      if (isCancelling) {
        // Catching SIGINT signal initiated exit
        console.log(chalk.red("Project creation aborted by user."));
      } else if (error.isCanceled) {
        // Inquirer.js specific cancellation (e.g., hitting ESC during prompts)
        console.log(chalk.red("\nProject creation cancelled by user."));
      } else {
        console.error(
          chalk.red("An unexpected error occurred during project creation:"),
          error.message
        );
      }

      // Attempt cleanup of partial project directory only if explicitly aborted or major error
      if (
        projectPathForCleanup &&
        fs.existsSync(projectPathForCleanup) &&
        (isCancelling || error.isCanceled || error.cleanupRequired)
      ) {
        console.log(
          chalk.red(
            `Cleaning up partially created project directory: ${projectPathForCleanup}`
          )
        );
        await fs.remove(projectPathForCleanup).catch((err) => {
          console.error(chalk.red(`Error during cleanup: ${err.message}`));
        });
      }
      process.exit(1); // Exit with a non-zero code to indicate failure/cancellation
    }
    // Finally block is usually for guaranteed execution, but process.exit() prevents it.
    // All necessary cleanup is handled within the catch block now.
  });

program.parse(process.argv);

// --- Core Scaffolding Function ---
async function createExpressApp(options) {
  const {
    projectName,
    language,
    database,
    ormOdM,
    otherTools,
    packageManager,
  } = options;

  console.log(chalk.blue(`\nOptions selected:`));
  console.log(`  Project Name: ${projectName}`);
  console.log(`  Language: ${language}`);
  console.log(`  Database: ${database}`);
  console.log(`  ORM/ODM: ${ormOdM}`);
  console.log(
    `  Other Tools: ${otherTools.length > 0 ? otherTools.join(", ") : "None"}`
  );
  console.log(`  Package Manager: ${packageManager}`);

  const projectPath = path.join(process.cwd(), projectName);
  const templateDir = path.join(import.meta.dirname, "../templates");

  // Prepare template data for Handlebars (important for conditional logic in templates)
  const templateData = {
    projectName,
    isTypeScript: language === "TypeScript",
    isJavaScript: language === "JavaScript",
    isPostgres: database === "PostgreSQL",
    isMongo: database === "MongoDB",
    isDrizzle: ormOdM === "Drizzle",
    isMongoose: ormOdM === "Mongoose",
    useJwt: otherTools.includes("JWT"),
    useBcrypt: otherTools.includes("Bcrypt"),
    useMulter: otherTools.includes("Multer"),
    isPnpm: packageManager === "pnpm",
    isNpm: packageManager === "npm",
  };

  // --- Register Handlebars Helpers ---
  handlebars.registerHelper("ifEq", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  handlebars.registerHelper("ifIncludes", function (array, value, options) {
    if (Array.isArray(array) && array.includes(value)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Ensure project directory is empty or create it
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(
        `Error: Directory ${chalk.bold(
          projectName
        )} already exists. Please choose a different name or delete it.`
      )
    );
    // Throw an error to be caught by the outer try-catch, enabling cleanup
    const error = new Error(`Directory ${projectName} already exists.`);
    error.cleanupRequired = false; // Don't clean up if dir exists and user should resolve
    throw error;
  }
  fs.mkdirSync(projectPath);

  // --- Copy and process language specific files (new approach) ---
  const langTemplateBaseDir = path.join(
    templateDir,
    language === "TypeScript" ? "typescript" : "javascript"
  );

  await copyAndProcessTemplates(langTemplateBaseDir, projectPath, templateData);

  // --- Install dependencies ---
  console.log(
    chalk.yellow(`\nInstalling dependencies with ${packageManager}...`)
  );
  try {
    await execa(packageManager, ["install"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    console.log(chalk.green("Dependencies installed successfully."));
  } catch (error) {
    console.error(chalk.red("Failed to install dependencies:"), error.message);
    // Re-throw for outer catch to handle, marking for cleanup if it's an installation failure
    error.cleanupRequired = true; // Indicate that cleanup might be desired for this type of error
    throw error;
  }

  // --- Run Prettier for consistent formatting ---
  console.log(chalk.yellow(`\nFormatting code with Prettier...`));
  try {
    // We already updated prettier command to include --loglevel silent in package.json.hbs
    await execa(packageManager, ["run", "prettier"], {
      cwd: projectPath,
      stdio: "inherit", // Keep inherit so any other Prettier errors (not silent warnings) are visible
    });
    console.log(chalk.green("Code formatted successfully."));
  } catch (error) {
    // Prettier failure is not critical for project creation functionality
    console.warn(
      chalk.yellow(
        `Warning: Code formatting failed: ${error.message}. Please run '${packageManager} run prettier' manually.`
      )
    );
  }
}

/**
 * Recursively copies and processes template files from a specific language directory.
 * @param {string} sourceDir The language-specific template directory to copy from.
 * @param {string} destinationDir The project directory to copy to.
 * @param {object} data The data to pass to Handlebars templates.
 */
async function copyAndProcessTemplates(sourceDir, destinationDir, data) {
  const items = await fs.readdir(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stats = await fs.stat(sourcePath);

    // If it's a directory, recurse into it
    if (stats.isDirectory()) {
      const newDestinationDir = path.join(destinationDir, item);
      await fs.mkdirp(newDestinationDir);
      await copyAndProcessTemplates(sourcePath, newDestinationDir, data);
      continue; // Skip to next item after recursing
    }

    let destinationItemName = item; // e.g., "server.js.hbs", "user.model.ts.hbs"

    // Remove .hbs extension if present
    if (item.endsWith(".hbs")) {
      destinationItemName = item.slice(0, -4); // Now it's "server.js", "user.model.ts"
    }

    // --- Conditional file skipping based on user choices ---
    // These conditions filter files WITHIN the selected language folder.

    // 1. Database-specific top-level files (db/mongodb or db/postgresql)
    if (sourcePath.includes(path.join("db", "mongodb"))) {
      if (!data.isMongo) {
        continue; // Skip ALL files in the mongodb folder if MongoDB not selected
      }
      // Specific Mongoose model within mongodb folder
      if (item.includes("user.model") && !data.isMongoose) {
        continue; // Skip user.model.js.hbs/ts.hbs if Mongoose not selected
      }
    } else if (sourcePath.includes(path.join("db", "postgresql"))) {
      if (!data.isPostgres) {
        continue; // Skip ALL files in the postgresql folder if PostgreSQL not selected
      }
      // Drizzle specific files within postgresql folder (schema/ and its contents)
      if (item.includes("schema") && !data.isDrizzle) {
        continue; // Skip schema/index.js.hbs/ts.hbs and schema/user.schema.js.hbs/ts.hbs if Drizzle not selected
      }
      // If it's the main db.ts.hbs/js.hbs in postgresql, ensure Drizzle is selected
      if (item.includes("db.") && !data.isDrizzle) {
        // 'db.' to catch 'db.ts.hbs' or 'db.js.hbs'
        continue;
      }
    }

    // 2. Root-level Drizzle config file
    if (item.includes("drizzle.config") && !data.isDrizzle) {
      continue; // Skip drizzle.config.js.hbs/ts.hbs if Drizzle not selected
    }

    // 3. Other Tools (JWT, Multer) specific files
    if (item.includes("auth-check") && !data.useJwt) {
      continue;
    }
    // env.d.ts is specifically tied to TypeScript + JWT in your templates.
    // If you add other universal env vars, this condition needs adjustment.
    if (item.includes("env.d.ts") && !data.useJwt) {
      // Also implicitly skips if not TS, as it's only in TS templates
      continue;
    }
    if (item.includes("upload") && !data.useMulter) {
      continue;
    }

    const destinationPath = path.join(destinationDir, destinationItemName);

    // If it's a template file, compile and write
    const content = await fs.readFile(sourcePath, "utf8");
    const template = handlebars.compile(content);
    const renderedContent = template(data);
    await fs.writeFile(destinationPath, renderedContent);
  }
}
