#!/usr/bin/env node

const inquirer = require("inquirer");
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");

class dirItem {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  isDir() {
    return fs.lstatSync(this.path).isDirectory();
  }
}

const options = yargs.usage("Usage: -d <path>").option("d", {
  alias: "dir",
  describe: "Path to directory",
  type: "string",
}).argv;

let curDir = process.cwd();

if (options.dir) curDir = options.dir;

const run = async () => {
  const list = await fs.readdirSync(curDir);
  const listItems = list.map(
    (name) => new dirItem(name, path.resolve(curDir, name))
  );

  const chooseElem = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: listItems.map((elem) => elem.name),
      },
    ])
    .then(
      (answer) => listItems.filter((elem) => elem.name === answer.fileName)[0]
    );

  if (chooseElem.isDir()) {
    curDir = chooseElem.path;
    return await run();
  } else {
    await fs.readFile(chooseElem.path, "utf-8", (err, data) => {
      if (err) console.log(err);

      console.log(data);
    });
  }
};

run();
