import inquirer = require('inquirer');

const ui = new inquirer.ui.BottomBar();

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

let keepRunning = true;

const engineerQues = [
  {
    message: 'Enter Engineers name: ',
    name: 'name',
    validate: (input: string) => {
      if (input) return true;
      else return false;
    },
  },
  {
    message: 'Enter his/her email: ',
    name: 'email',
    // validate: async (input: string) => {
    //   const regex = RegExp('');
    //   if (regex.test(input)) return true;
    //   else return 'Please enter a valid email address!';
    // },
  },
  {
    message: 'Enter his/her Github id: ',
    name: 'githubID',
    validate: (input: string) => {
      if (input) return true;
      else return false;
    },
  },
];

const internQues = [
  {
    message: 'Enter Interns name: ',
    name: 'name',
    validate: (input: string) => {
      if (input) return true;
      else return false;
    },
  },
  {
    message: 'Enter his/her email: ',
    name: 'email',
    // validate: async (input: string) => {
    //   const regex = RegExp('');
    //   if (regex.test(input)) return true;
    //   else return 'Please enter a valid email address!';
    // },
  },
  {
    message: 'Enter his/her school: ',
    name: 'school',
    validate: (input: string) => {
      if (input) return true;
      else return false;
    },
  },
];

// Main functional logic
const init = async () => {
  let i = 0;
  const newEmployees = [];

  const manager = await ask.prompt([
    {
      message: 'Enter Managers name: ',
      name: 'name',
      validate: (input: string) => {
        if (input) return true;
        else return false;
      },
    },
    {
      message: 'Enter his/her email: ',
      name: 'email',
      // validate: async (input: string) => {
      //   const regex = RegExp('');
      //   if (regex.test(input)) return true;
      //   else return 'Please enter a valid email address!';
      // },
    },
  ]);
  newEmployees.push(
    new Manager(
      manager.name,
      manager.email,
      Math.floor(Math.random() * 100) + 1
    )
  );

  ui.log.write('\nManager Logged!\n\n');

  while (keepRunning) {
    const employees = await ask.prompt([
      {
        message: 'Whats the employees role: ',
        name: 'role',
        type: 'list',
        choices: ['Engineer', 'Intern', 'Done'],
      },
    ]);

    switch (employees.role) {
      case 'Engineer':
        const engineer = await inquirer.prompt(engineerQues);
        engineer &&
          newEmployees.push(
            new Engineer(engineer.name, engineer.email, engineer.githubID)
          );
        break;
      case 'Intern':
        const intern = await inquirer.prompt(internQues);
        intern &&
          newEmployees.push(
            new Intern(intern.name, intern.email, intern.school)
          );
        break;
      case 'Done': 
        keepRunning = false;
    }
    console.log(newEmployees);
  }
  ui.log.write('\nEmployees Logged!\n\n');
  // render(newEmployees);
};

init();

async function render(empArr: any[]) {
  try {
    let html = await ejs.renderFile('./templates/manager.ejs', {
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
