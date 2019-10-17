#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

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
    const { docker } = await inquirer.prompt([
      {
        type: "confirm",
        message: "¿Deseas agregar docker?",
        name: "docker",
        default: true
      }
    ]);

    fs.unlinkSync(configFileName);
    fs.appendFile(
      configFileName,
      JSON.stringify({
        docker
      }),
      err => {
        if (err) throw err;
        console.log(`${configFileName} creado exitosamente`);
      }
    );
  }
};

try {
  if (argv["_"].length === 1) {
    if (argv["_"].includes("init")) {
      init();
    } else {
      throw new Error("El fichero ya existe");
    }
  } else {
    throw new Error("No se pudo crear el fichero");
  }
} catch (e) {
  console.log(e.name, ": ", e.message);
}
