import { prompt } from "inquirer";

(async () => {
  const { framework } = await prompt([
    {
      type: "list",
      message: "Pick the framework you want to use:",
      name: "framework",
      choices: ["react", "vue"]
    }
  ]);

  console.log(`Installing ${framework} project`);
})();
