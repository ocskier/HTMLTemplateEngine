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
  let i = 0;
  const newEmployees = [];
  while (i < 5) {
    const team = await ask.prompt([
      {
        message: 'Enter your name: ',
        name: 'name',
      },
      {
        message: 'Enter your email: ',
        name: 'email',
      },
      {
        message: 'Whats your role: ',
        name: 'role',
        validate: async (input: string) => {
          if (
            input !== 'Engineer' &&
            input !== 'Intern' &&
            input !== 'Manager'
          ) {
            return 'Incorrect asnwer';
          }
          return true;
        },
      },
      {
        message: 'Github Username: ',
        name: 'githubID',
      },
    ]);
    switch (team.role) {
      case 'Engineer':
        newEmployees.push(new Engineer(team.name, team.email, team.githubID));
        break;
      case 'Intern':
        newEmployees.push(new Intern(team.name, team.email, 'LRHS'));
        break;
      case 'Manager':
        newEmployees.push(
          new Manager(
            team.name,
            team.email,
            Math.floor(Math.random() * 100) + 1
          )
        );
        break;
    }
    console.log(newEmployees);
    i++;
  }
  render(newEmployees);
};

init();

async function render(empArr: any[]) {
  try {
    let html = await ejs.renderFile('./templates/engineer.ejs', {
      data: empArr,
    });
    const mainHtml = await ejs.renderFile('./templates/main.ejs', {
      data: { main: html },
    });
    await writeFile('dist/index.html', mainHtml, 'UTF-8');
  } catch (error) {
    console.log(error);
  }
}

export {};
