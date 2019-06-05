#!/usr/bin/env node

const inquirer = require("inquirer");

(async () => {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Pick the framework you want to use:",
      name: "framework",
      choices: ["react", "vue"]
    }
  ]);

  console.log(`Installing ${framework} project`);
})();
