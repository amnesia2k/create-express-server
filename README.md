# **Express.js Project Scaffolder: Rapid Backend Setup**

This project is a command-line interface (CLI) tool designed to streamline the initialization of Express.js backend applications. It provides developers with a quick, opinionated, yet highly customizable starting point, allowing for the effortless scaffolding of projects with choices for programming language (JavaScript or TypeScript), database integrations (MongoDB or PostgreSQL), ORM/ODM selection (Mongoose or Drizzle ORM), and essential features like JWT authentication, Bcrypt password hashing, and Multer for file uploads. 🛠️

## **Installation**

Getting this project up and running on your local machine is straightforward. Follow these steps:

*   **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/create-express-server.git
    ```
*   **Navigate to the Project Directory**:
    ```bash
    cd create-express-server
    ```
*   **Install Dependencies**: This project uses `pnpm` as its package manager, as specified in `package.json`. If you don't have pnpm, you can install it globally via npm: `npm install -g pnpm`.
    ```bash
    pnpm install
    ```
*   **Link the CLI Tool (for local development/testing)**:
    To use `create-express-server` directly from your terminal, you can link it locally:
    ```bash
    pnpm link --global
    ```

Now, the `create-express-server` command should be available in your terminal!

## **Usage**

To create a new Express.js project using this CLI, simply open your terminal in the directory where you want to create your new project and run the command:

```bash
create-express-server
```

You will be guided through an interactive prompt where you can configure your new Express.js application. The CLI will ask you to specify:

*   **Project Name**: The name for your new backend project.
*   **Language**: Choose between JavaScript and TypeScript.
*   **Database**: Select either MongoDB or PostgreSQL.
*   **ORM/ODM**: Based on your database choice, select Mongoose (for MongoDB) or Drizzle ORM (for PostgreSQL).
*   **Authentication**: Option to include JSON Web Tokens (JWT) for authentication.
*   **Password Hashing**: Option to include Bcrypt.js for secure password hashing.
*   **File Uploads**: Option to include Multer for handling file uploads.

After answering the prompts, the CLI will scaffold a new Express.js project in a subdirectory with the chosen name, pre-configured with your selections.

**Example Flow (Illustrative):**

```bash
? What is the name of your project? (my-new-express-app)
? Which language would you like to use? (Use arrow keys)
  JavaScript
❯ TypeScript
? Which database would you like to use? (Use arrow keys)
  MongoDB
❯ PostgreSQL
? Which ORM/ODM would you like to use? (Use arrow keys)
❯ Drizzle ORM
  Mongoose
? Do you want to include JWT for authentication? (y/N) y
? Do you want to include Bcrypt.js for password hashing? (y/N) y
? Do you want to include Multer for file uploads? (y/N) n

✨ Creating my-new-express-app...
🎉 Project 'my-new-express-app' created successfully!
```

Once your project is generated, navigate into its directory (`cd my-new-express-app`) and run `pnpm install` to install its specific dependencies, then `pnpm dev` to start the development server.

## **Features**

This CLI tool comes packed with features designed to accelerate your backend development workflow:

*   🚀 **Rapid Project Scaffolding**: Quickly set up a new Express.js project in seconds.
*   🌐 **Language Choice**: Seamlessly generate projects in either JavaScript or TypeScript, catering to different team preferences and project requirements.
*   💾 **Database Flexibility**: Support for both NoSQL (MongoDB with Mongoose) and SQL (PostgreSQL with Drizzle ORM) databases.
*   🔑 **Authentication Ready**: Built-in option to integrate JSON Web Tokens (JWT) for robust authentication mechanisms.
*   🔒 **Secure Password Hashing**: Include Bcrypt.js for best-practice password security right from the start.
*   📤 **File Uploads**: Easily add Multer support for handling multipart/form-data, perfect for file and image uploads.
*   ⚙️ **Configurable Middlewares**: Pre-configured common Express.js middlewares like CORS, Morgan for logging, and body parsers.
*   📁 **Modular Structure**: Generated projects follow a clean, modular structure, making them easy to navigate, extend, and maintain.
*   Linting and Formatting: Includes ESLint and Prettier configurations for consistent code quality.

## **Technologies Used**

| Category         | Technology                 | Description                                    |
| :--------------- | :------------------------- | :--------------------------------------------- |
| **CLI Core**     | `Node.js`                  | JavaScript runtime for the CLI.                |
|                  | `Commander.js`             | Powerful CLI framework.                        |
|                  | `Inquirer.js`              | Interactive command-line prompts.              |
|                  | `Handlebars.js`            | Templating engine for file generation.         |
|                  | `Chalk`                    | Terminal string styling.                       |
|                  | `fs-extra`                 | Extended file system utilities.                |
| **Backend (Generated)** | `Express.js`               | Fast, unopinionated, minimalist web framework. |
|                  | `JavaScript`               | Primary language for generated projects.       |
|                  | `TypeScript`               | Optional static type-checking for projects.    |
|                  | `MongoDB`                  | Popular NoSQL database.                        |
|                  | `PostgreSQL`               | Powerful open-source relational database.      |
|                  | `Mongoose`                 | MongoDB object modeling for Node.js.           |
|                  | `Drizzle ORM`              | Modern TypeScript ORM for relational databases.|
|                  | `dotenv`                   | Loads environment variables from `.env` file.  |
|                  | `CORS`                     | Middleware for enabling Cross-Origin Resource Sharing. |
|                  | `jsonwebtoken`             | JSON Web Token implementation (optional).      |
|                  | `bcryptjs`                 | Password hashing library (optional).           |
|                  | `multer`                   | Middleware for handling multipart/form-data (optional). |
| **Development**  | `Nodemon`                  | Automatically restarts the node application.   |
|                  | `Morgan`                   | HTTP request logger middleware.                |
|                  | `ESLint`                   | Pluggable JavaScript linter.                   |
|                  | `Prettier`                 | Opinionated code formatter.                    |
|                  | `tsx`                      | Node.js execute for TypeScript.                |
|                  | `typescript`               | TypeScript language compiler.                  |
|                  | `drizzle-kit`              | CLI and migration tooling for Drizzle ORM.     |
|                  | `dotenv-cli`               | CLI for loading environment variables.         |

## **Contributing**

I welcome contributions from the community! If you have suggestions for improvements, new features, or find any bugs, please feel free to:

*   ⭐ **Star the repository**: Show your support!
*   🐛 **Report a bug**: Open an issue if you encounter any problems.
*   💡 **Suggest a feature**: Propose new ideas by opening an issue.
*   💻 **Submit a pull request**: Fork the repository, create a new branch, make your changes, and submit a pull request. Please ensure your code adheres to the existing style and conventions.

## **License**

This project is licensed under the MIT License. You can find the full text of the license [here](https://opensource.org/licenses/MIT).

## **Author Info**

Hey there! I'm the creator of this project. Feel free to connect with me!

*   LinkedIn: [your_linkedin_profile](https://linkedin.com/in/your_username)
*   Twitter: [your_twitter_handle](https://twitter.com/your_username)
*   Portfolio: [your_portfolio_website](https://your-portfolio.com)

---

[![npm version](https://badge.fury.io/js/create-express-server.svg)](https://badge.fury.io/js/create-express-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Package Manager: pnpm](https://img.shields.io/badge/package%20manager-pnpm-red?logo=pnpm)](https://pnpm.io/)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)