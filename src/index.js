#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
const Git = require("nodegit");
const rimraf = require("rimraf");

const configFileName = "lcliconfig.json";

const init = async () => {
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      message: "Elige que tipo de proyecto deseas crear:",
      name: "projectType",
      choices: ["frontend", "backend"]
    }
  ]);

  if (projectType === "backend") {
    console.log(`Todavía no puedes instalar proyectos backend :(`);
  }

  if (projectType === "frontend") {
    const { items } = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Elige todos los items que deseas en tu proyecto",
        name: "items",
        choices: [
          {
            name: "Arquitectura Hexagonal",
            value: "hex"
          },
          {
            name: "Design System",
            value: "ds"
          },
          {
            name: "Redux",
            value: "rd"
          },
          {
            name: "Prettier",
            value: "pt"
          }
        ]
      }
    ]);

    fs.appendFile(
      configFileName,
      JSON.stringify(
        {
          options: {
            Architecture: items.includes("hex"),
            DesignSystem: items.includes("ds"),
            Redux: items.includes("rd"),
            Prettier: items.includes("pt")
          }
        },
        null,
        "  "
      ),
      err => {
        if (err) throw err;
      }
    );
  }
};

const install = async () => {
  const data = fs.readFileSync(configFileName, "utf8");
  fs.unlinkSync(configFileName);

  console.log("Descargando repositorio...");
  await Git.Clone("https://github.com/lacafetalab/cafetacli-docker.git", "./");
  console.log("Repositorio descargado");

  fs.appendFile(configFileName, data, err => {
    if (err) throw err;
  });

  rimraf.sync(".git/");
};

try {
  if (argv["_"].length === 1) {
    if (argv["_"].includes("init")) {
      init();
    } else if (argv["_"].includes("install")) {
      install();
    }
  } else {
    throw new Error("No se pudo crear el fichero");
  }
} catch (e) {
  console.log(e.name, ": ", e.message);
}
