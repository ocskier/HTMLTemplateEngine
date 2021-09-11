// Internal node package imports
const fs = require('fs');
const util = require('util');

// External package imports
const ask = require('inquirer');
const ejs = require('ejs');
const validator = require('validator');

// Import the individual classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//  Creating promises
const writeFile = util.promisify(fs.writeFile);

const newEmployees: any[] = [];
let keepRunning: boolean = true;

const validateInput = (input: string) => input != '';

const mainQues = (employeeType: string) => [
  {
    message: `Enter ${employeeType} name: `,
    name: 'name',
    validate: validateInput,
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
    validate: validateInput,
  },
];

const internQues = [
  ...mainQues(`intern's`),
  {
    message: 'Enter his/her school: ',
    name: 'school',
    validate: validateInput,
  },
];

const render = async (empArr: any[]) => {
  try {
    let managerHtml = await ejs.renderFile('./templates/manager.ejs', {
      data: empArr[0],
    });
    let employeesHtml = '';
    employeesHtml += await ejs.renderFile('./templates/engineer.ejs', {
      data: empArr.filter((emp) => emp.getRole() === 'Engineer'),
    });
    employeesHtml += await ejs.renderFile('./templates/intern.ejs', {
      data: empArr.filter((emp) => emp.getRole() === 'Intern'),
    });
    const mainHtml = await ejs.renderFile('./templates/main.ejs', {
      data: {
        manager: managerHtml,
        employees: employeesHtml,
      },
    });
    await writeFile('./dist/index.html', mainHtml, 'UTF-8').then(() => {
      console.log('\nFile Written!\n');
    });
  } catch (error) {
    console.log(error);
  }
}

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
        break;
    }
  }
};

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

  render(newEmployees);
};

init();

export {};
