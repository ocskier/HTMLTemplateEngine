// Internal node package imports
const fs = require('fs');
const util = require('util');

// External package imports
const ask = require('inquirer');
const ejs = require('ejs');

// Import the individual classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//  Creating promises
// const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Main functional logic

const init = async () => {
    const team = ask.prompt();
    render();
}

init();

const Jon = new Engineer('Jon', 'ocskier@gmail.com', 'ocskier');

async function render() {
  try {
    const employeeHtml = await ejs.renderFile('./templates/engineer.ejs', { data: Jon });
    const mainHtml = await ejs.renderFile('./templates/main.ejs', {data: {main: employeeHtml}});
    console.log(mainHtml);
    await writeFile('dist/index.html', mainHtml, 'UTF-8');
  } catch (error) {
    console.log(error);
  }
}

export{}