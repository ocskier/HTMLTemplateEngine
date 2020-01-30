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
    const team = await ask.prompt([
        {
            message: "Enter your name: ",
            name: "name"
        },
        {
            message: "Enter your email: ",
            name: "email"
        },
        {
            message: "Github Username: ",
            name: "githubID"
        }
    ]);
    const newEmployees = [];
    newEmployees.push(new Engineer(team.name, team.email, team.githubID));
    console.log(newEmployees);
    render(newEmployees);
}

init();

async function render(emp: any) {
  try {
    let html = '';
    for (let i = 0; i < emp.length; i++) {
        let employeeHtml = await ejs.renderFile('./templates/engineer.ejs', { data: emp[i] });
        html += employeeHtml;
    }
    const mainHtml = await ejs.renderFile('./templates/main.ejs', {data: {main: html}});
    console.log(mainHtml);
    await writeFile('dist/index.html', mainHtml, 'UTF-8');
  } catch (error) {
    console.log(error);
  }
}

export{}