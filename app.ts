// Internal node package imports
const fs = require('fs');
const util = require('util');

// External package imports
const ask = require('inquirer');
const ejs = require('ejs');
const validator = require('validator');
// const ui = new inquirer.ui.BottomBar();

// Import the individual classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//  Creating promises
// const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const newEmployees: any[] = [];
let keepRunning: boolean = true;

const mainQues = (employeeType: string) => [
  {
    message: `Enter ${employeeType} name: `,
    name: 'name',
    validate: (input: string) => {
      return input != '';
    },
  },
  {
    message: `Enter the ${employeeType} email: `,
    name: 'email',
    validate: async (input: string) => {
      if (validator.isEmail(input)) return true;
      else return 'Please enter a valid email address!';
    },
  },
];

const engineerQues = [
  ...mainQues(`engineer's`),
  {
    message: 'Enter his/her Github id: ',
    name: 'githubID',
    validate: (input: string) => {
      return input != '';
    },
  },
];

const internQues = [
  ...mainQues(`intern's`),
  {
    message: 'Enter his/her school: ',
    name: 'school',
    validate: (input: string) => {
      return input != '';
    },
  },
];

// Main functional logic
const init = async () => {
  // let i = 0; Reserved for later use

  const manager = await ask.prompt(mainQues(`manager's`));

  manager &&
    newEmployees.push(
      new Manager(
        manager.name,
        manager.email,
        Math.floor(Math.random() * 1000) + 1
      )
    ) &&
    (await getSubordinates());

  // ui.log.write('\nManager Logged!\n\n');
  render(newEmployees);
};

const getSubordinates = async () => {
  while (keepRunning) {
    const { role } = await ask.prompt([
      {
        message: 'Whats the employees role: ',
        name: 'role',
        type: 'list',
        choices: ['Engineer', 'Intern', 'Done'],
      },
    ]);

    switch (role) {
      case 'Engineer':
        const engineer = await ask.prompt(engineerQues);
        engineer &&
          newEmployees.push(
            new Engineer(engineer.name, engineer.email, engineer.githubID)
          );
        break;
      case 'Intern':
        const intern = await ask.prompt(internQues);
        intern &&
          newEmployees.push(
            new Intern(intern.name, intern.email, intern.school)
          );
        break;
      case 'Done':
        keepRunning = false;
        // ui.log.write('\nEmployees Logged!\n\n');
        break;
    }
  }
};

async function render(empArr: any[]) {
  try {
    let managerHtml = await ejs.renderFile('./templates/manager.ejs', {
      data: empArr[0],
    });
    let employeesHtml = '';
    employeesHtml += await ejs.renderFile('./templates/engineer.ejs', {
      data: empArr.filter(emp => emp.getRole() === 'Engineer'),
    });
    employeesHtml += await ejs.renderFile('./templates/intern.ejs', {
      data: empArr.filter(emp => emp.getRole() === 'Intern'),
    });
    const mainHtml = await ejs.renderFile('./templates/main.ejs', {
      data: {
        manager: managerHtml,
        employees: employeesHtml,
      },
    });
    await writeFile('./dist/index.html', mainHtml, 'UTF-8').then(() => {
      console.log('\nFile Written!');
    });
  } catch (error) {
    console.log(error);
  }
}

init();

export {};
