# **Express Server CLI: Rapid Express.js Project Scaffolding** 🚀

> ⚠️ **Don’t install this package manually!**  
> Use it like this instead:
>
> **`npx create-xpress-server@latest`**  
> or  
> **`pnpx create-xpress-server@latest`**  
> or  
> **`pnpm create create-xpress-server@latest`**
>
> Installing directly with `npm i create-xpress-server` will not do what you want. It's a CLI generator, not a library!

This project is a robust Command Line Interface (CLI) tool designed to streamline the setup of your Express.js backend applications. Say goodbye to repetitive boilerplate! Express Server CLI empowers developers to quickly scaffold new projects with customizable options for language (JavaScript or TypeScript), database (MongoDB or PostgreSQL), ORM/ODM (Mongoose or Drizzle ORM), and essential utilities like JWT authentication and Multer for file uploads. It's engineered to kickstart your development process efficiently, letting you focus on building core features right away.

---

## Usage 💡

Express Server CLI is designed to be highly interactive and easy to use. Once installed, you can simply run the command and follow the prompts.

- **Interactive Mode**:
  The simplest way to use Express Server CLI is by running the command without any arguments. It will guide you through the setup process with a series of interactive prompts.

  ```bash
  pnpx create-xpress-server@latest
  ```

  or

  ```bash
  npx create-xpress-server@latest
  ```

  or

  ```bash
  pnpm create create-xpress-server@latest
  ```

  The CLI will prompt you for various configurations to tailor your new Express.js project:

  - **Project Name**: Define the name for your new Express.js application.
  - **Language**: Choose between **JavaScript** or **TypeScript** for your codebase.
  - **Database**: Select your preferred database: **MongoDB** or **PostgreSQL**.
  - **ORM/ODM**: The appropriate ORM/ODM will be automatically selected based on your database choice (Mongoose for MongoDB, Drizzle ORM for PostgreSQL).
  - **Additional Features**: Opt to include powerful utilities like **JWT authentication** for secure routes, **Bcrypt.js** for robust password hashing, and **Multer** for efficient file uploads.

  After you've made your selections, Express Server CLI will generate a new, fully configured Express.js project in a fresh directory named after your chosen project name.

---

## Features ✨

Express Server CLI comes packed with features to accelerate your backend development:

- **🚀 Rapid Scaffolding**: Quickly generate a complete Express.js project structure in seconds, saving valuable setup time.
- **🌐 Language Flexibility**: Choose between JavaScript or TypeScript to align with your team's expertise or project-specific requirements.
- **🗄️ Diverse Database Support**: Seamlessly integrate with leading databases:
  - **MongoDB**: Comes configured with Mongoose for powerful Object Data Modeling.
  - **PostgreSQL**: Includes Drizzle ORM for a modern, type-safe, and high-performance SQL experience.
- **🔑 Authentication Ready**: Optional integration of JSON Web Tokens (JWT) for robust and secure user authentication flows.
- **🔒 Secure Password Hashing**: Easily include Bcrypt.js to implement industry-standard password hashing, enhancing application security.
- **📤 Effortless File Uploads**: Add Multer for handling `multipart/form-data`, making file uploads straightforward.
- **🧩 Essential Middleware**: Pre-configured with common Express.js middleware such as `cors` (for Cross-Origin Resource Sharing), `morgan` (for HTTP request logging), and built-in body parsers for JSON and URL-encoded data.
- **⚙️ Development Utilities**: Your generated project includes `nodemon` for automatic server restarts on code changes, `ESLint` for enforcing code quality standards, and `Prettier` for consistent code formatting.
- **📦 Drizzle Kit Integration**: If you opt for PostgreSQL and Drizzle, the generated project will include `drizzle-kit` commands to manage database migrations, schema generation, and more.

---

## Technologies Used 🛠️

This project leverages a modern stack to deliver a seamless and efficient development experience.

| Category      | Technology    | Description                                                                                  | Link                                                     |
| :------------ | :------------ | :------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **Core**      | Node.js       | JavaScript runtime for server-side applications.                                             | [nodejs.org](https://nodejs.org/en)                      |
|               | Express.js    | Fast, unopinionated, minimalist web framework for Node.js.                                   | [expressjs.com](https://expressjs.com/)                  |
| **Languages** | JavaScript    | The primary language for the project and generated templates.                                | [javascript.info](https://javascript.info/)              |
|               | TypeScript    | Superset of JavaScript that compiles to plain JavaScript.                                    | [typescriptlang.org](https://www.typescriptlang.org/)    |
| **CLI Tools** | Commander.js  | Node.js command-line interfaces made easy.                                                   | [npm/commander](https://www.npmjs.com/package/commander) |
|               | Inquirer.js   | Common interactive command-line user interfaces.                                             | [npm/inquirer](https://www.npmjs.com/package/inquirer)   |
|               | Chalk         | Terminal string styling done right.                                                          | [npm/chalk](https://www.npmjs.com/package/chalk)         |
|               | Handlebars.js | Logic-less templating language for dynamic project generation.                               | [handlebarsjs.com](https://handlebarsjs.com/)            |
| **Databases** | MongoDB       | NoSQL database for flexible data storage (with Mongoose).                                    | [mongodb.com](https://www.mongodb.com/)                  |
|               | PostgreSQL    | Powerful, open-source object-relational database system (with Drizzle ORM).                  | [postgresql.org](https://www.postgresql.org/)            |
| **ORMs/ODMs** | Mongoose      | MongoDB object modeling for Node.js.                                                         | [mongoosejs.com](https://mongoosejs.com/)                |
|               | Drizzle ORM   | TypeScript ORM for SQL databases.                                                            | [orm.drizzle.team](https://orm.drizzle.team/)            |
| **Utilities** | JWT           | JSON Web Token implementation for secure authentication.                                     | [jwt.io](https://jwt.io/)                                |
|               | Bcrypt.js     | Library for hashing passwords.                                                               | [npm/bcryptjs](https://www.npmjs.com/package/bcryptjs)   |
|               | Multer        | Middleware for handling `multipart/form-data`.                                               | [npm/multer](https://www.npmjs.com/package/multer)       |
|               | Dotenv        | Loads environment variables from a `.env` file.                                              | [npm/dotenv](https://www.npmjs.com/package/dotenv)       |
|               | Cors          | Provides a Connect/Express middleware that can be used to enable CORS.                       | [npm/cors](https://www.npmjs.com/package/cors)           |
|               | Morgan        | HTTP request logger middleware for Node.js.                                                  | [npm/morgan](https://www.npmjs.com/package/morgan)       |
| **Dev Tools** | Nodemon       | Utility that monitors for any changes in your source and automatically restarts your server. | [nodemon.io](https://nodemon.io/)                        |
|               | ESLint        | Pluggable linting utility for JavaScript and JSX.                                            | [eslint.org](https://eslint.org/)                        |
|               | Prettier      | Opinionated code formatter.                                                                  | [prettier.io](https://prettier.io/)                      |

---

## Contributing 🤝

We welcome contributions from the community to make Express Server CLI even more powerful and versatile! If you're interested in helping out, please follow these guidelines:

- 🌟 **Fork the Repository**: Start by forking the `create-express-server` repository to your personal GitHub account.
- 🌿 **Create a New Branch**: Before making any changes, create a new branch for your feature or bug fix: `git checkout -b feature/your-awesome-feature` or `git checkout -b bugfix/fix-that-bug`.
- ✍️ **Make Your Changes**: Implement your desired changes, ensuring your code adheres to the project's established coding style. ESLint and Prettier are configured to help maintain consistency.
- 🧪 **Test Your Changes**: If your contribution involves new functionality, please add corresponding tests. For changes to the CLI itself, consider thoroughly testing the generated project output.
- ➕ **Commit Your Work**: Write clear, concise, and descriptive commit messages that explain the purpose of your changes.
- ⬆️ **Push to Your Fork**: Once your changes are complete and tested, push your new branch to your forked repository.
- ➡️ **Open a Pull Request**: Finally, submit a pull request to the `main` branch of the original `create-express-server` repository. Provide a detailed description of your changes, including any relevant context or problem solved.

We truly appreciate your efforts and contributions to improving this tool!

---

## License 📜

This project is licensed under the **MIT License**. For more details, please see the [LICENSE](LICENSE) file in the repository.

---

## Author Info ✍️

A passionate developer dedicated to building impactful tools and improving the developer experience.

- **GitHub**: [amnesia2k](https://github.com/amnesia2k)
- **Twitter**: [@olathedev\_](https://x.com/@olathedev_)
- **Portfolio**: [olatilewa.dev](https://olatilewa.dev)

---

[![NPM Version](https://img.shields.io/npm/v/create-xpress-server?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/create-xpress-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
