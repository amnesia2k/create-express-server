#!/usr/bin/env node

import inquirer from "inquirer";
import { Command } from "commander";
import chalk from "chalk";
import path from "node:path";
import fs from "fs-extra";
import handlebars from "handlebars";
import { execa } from "execa";
import figlet from "figlet";
import gradient from "gradient-string";

const program = new Command();

program
  .name("create-xpress-server")
  .description("Scaffolds a new Express.js backend project.")
  .version("0.1.0");

program
  .argument("[project-name]", "Name of the project to create")
  .action(async (projectNameArg) => {
    // Flag to track if the process is being cancelled by SIGINT (Ctrl+C)
    let isCancelling = false;
    let projectPathForCleanup = null;

    // ─── ✨ Welcome Banner ────────────────────────────────
    console.clear();
    const banner = figlet.textSync("Express Server", {
      horizontalLayout: "default",
      verticalLayout: "default",
    });
    console.log(gradient.instagram.multiline(banner));
    console.log(chalk.greenBright("🚀 Welcome to create-xpress-server CLI!\n"));
    console.log(
      chalk.white(`
This CLI scaffolds a full-featured Express.js backend with just a few prompts.

👉 Choose language:      TypeScript or JavaScript
👉 Pick a database:      PostgreSQL or MongoDB
👉 Select an ORM/ODM:    Drizzle or Mongoose
👉 Add utilities:        JWT, bcrypt, multer (multi-select)

No more manual setup. No more boilerplate hell.\n`)
    );

    // ─── Graceful Cancellation Handler ─────────────────────
    process.on("SIGINT", () => {
      if (!isCancelling) {
        isCancelling = true;
        console.log(chalk.yellow("\n\nCancelling project creation..."));
        process.exit(1);
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
          if (!input) return "Project name cannot be empty.";
          if (!/^[a-z0-9-_]+$/.test(input))
            return "Project name can only contain lowercase letters, numbers, hyphens, and underscores.";
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
      const answers = await inquirer.prompt(questions);
      const resolvedProjectName = projectNameArg || answers.projectName;
      projectPathForCleanup = path.join(process.cwd(), resolvedProjectName);

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
      console.log(chalk.cyan(`  ${answers.packageManager} install`));
      console.log(chalk.cyan(`  ${answers.packageManager} dev`));
      console.log(chalk.cyan(`\nHappy coding! 🚀`));
    } catch (error) {
      if (isCancelling) {
        console.log(chalk.red("Project creation aborted by user."));
      } else if (error.isCanceled) {
        console.log(chalk.red("\nProject creation cancelled by user."));
      } else {
        console.error(
          chalk.red("An unexpected error occurred during project creation:"),
          error.message
        );
      }

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

      process.exit(1);
    }
  });

program.parse(process.argv);

// ─── Core Scaffolding Logic ───────────────────────────────

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

  handlebars.registerHelper("ifEq", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  handlebars.registerHelper("ifIncludes", function (array, value, options) {
    if (Array.isArray(array) && array.includes(value)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(
        `Error: Directory ${chalk.bold(
          projectName
        )} already exists. Please choose a different name or delete it.`
      )
    );
    const error = new Error(`Directory ${projectName} already exists.`);
    error.cleanupRequired = false;
    throw error;
  }

  fs.mkdirSync(projectPath);

  const langTemplateBaseDir = path.join(
    templateDir,
    language === "TypeScript" ? "typescript" : "javascript"
  );

  await copyAndProcessTemplates(langTemplateBaseDir, projectPath, templateData);

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
    error.cleanupRequired = true;
    throw error;
  }

  console.log(chalk.yellow(`\nFormatting code with Prettier...`));
  try {
    await execa(packageManager, ["run", "prettier"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    console.log(chalk.green("Code formatted successfully."));
  } catch (error) {
    console.warn(
      chalk.yellow(
        `Warning: Code formatting failed: ${error.message}. Please run '${packageManager} run prettier' manually.`
      )
    );
  }
}

// ─── Copy & Process Template Files ─────────────────────────────

async function copyAndProcessTemplates(sourceDir, destinationDir, data) {
  const items = await fs.readdir(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      const newDestinationDir = path.join(destinationDir, item);
      await fs.mkdirp(newDestinationDir);
      await copyAndProcessTemplates(sourcePath, newDestinationDir, data);
      continue;
    }

    let destinationItemName = item.endsWith(".hbs") ? item.slice(0, -4) : item;

    if (sourcePath.includes(path.join("db", "mongodb")) && !data.isMongo)
      continue;
    if (sourcePath.includes(path.join("db", "postgresql")) && !data.isPostgres)
      continue;
    if (item.includes("user.model") && !data.isMongoose) continue;
    if (item.includes("schema") && !data.isDrizzle) continue;
    if (item.includes("db.") && !data.isDrizzle) continue;
    if (item.includes("drizzle.config") && !data.isDrizzle) continue;
    if (item.includes("auth-check") && !data.useJwt) continue;
    if (item.includes("env.d.ts") && !data.useJwt) continue;
    if (item.includes("upload") && !data.useMulter) continue;

    const destinationPath = path.join(destinationDir, destinationItemName);
    const content = await fs.readFile(sourcePath, "utf8");
    const template = handlebars.compile(content);
    const renderedContent = template(data);
    await fs.writeFile(destinationPath, renderedContent);
  }
}
