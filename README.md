# Visual Studio Code Language Server Extension

This project is a sample language server extension for Visual Studio Code. It provides language support for JavaScript files and can be used as a starter project for your own language server extension.

## Prerequisites

To perform development using this code first clone this repository to your local machine. If running on a Windows machine then clone into a WSL session. Once cloned open the project in Visual Studio Code.

When open, re-open the project in the devcontainer contained within the project. This devcontainer has all dependencies and tools required for working with this project, including Node.js, linting, formating, and packaging tools. Once open, run `npm install` to install all required packages.

## Building and Running

To build the project output simply run the command `npm run build`. This will build the project with the currently installed NPM packages. Linting of the code can be performed using either `npm run lint:check` to check the code or `npm run lint:fix` to check and automatically fix any issues found. Formatting of the code can be performed using `npm run format`, or by right clicking on the file in Visual Studio Code and selecting `Format Document with` and selecting Prettier.

Debugging the project can be done using the Extension Development Host by selecting the `Launch Client` option in the Debug pane of Visual Studio Code and clicking the green arrow or pressing `F5`. This launches the extension client. If you wish to debug the Language Server, once the client is up and running, change the launch option to `Attach to Server` and click the green arrow. This wil connect the debugger to the running server instance. Breakpoints, watches and all the usual debugging tools will then be available to you.

## Packaging

To build and package the extension for distribution and installation, simply run the `npm run package` command which will build all code and package it up as an installable VSIX file that can be manually installed into Visual Studio Code. This package is created in the `dist` directory.