// Internal node package imports
const fs = require('fs');
const util = require('util');

// External package imports
const ejs = require('ejs');
const { prompt } = require('inquirer');

// Import the individual classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//  Creating promises
const writeFile = util.promisify(fs.writeFile);

const newEmployees: any[] = [];
let keepRunning: boolean = true;

// Main functional logic
const init = async () => {
  // let i = 0; Reserved for later use

  const manager = new Manager();
  await manager.getEmpInfo(`manager's`);
  await manager.getManagerInfo();

  manager && newEmployees.push(manager) && (await getSubordinates());

  render(newEmployees);
};

const getSubordinates = async () => {
  while (keepRunning) {
    const { role } = await prompt([
      {
        message: 'Whats the employees role: ',
        name: 'role',
        type: 'list',
        choices: ['Engineer', 'Intern', 'Done'],
      },
    ]);

    switch (role) {
      case 'Engineer':
        const engineer = new Engineer();
        await engineer.getEmpInfo(`engineer's`);
        await engineer.getEngineerInfo();
        engineer && newEmployees.push(engineer);
        break;
      case 'Intern':
        const intern = new Intern();
        await intern.getEmpInfo(`intern's`);
        await intern.getInternInfo();
        intern && newEmployees.push(intern);
        break;
      case 'Done':
        keepRunning = false;
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

init();

export {};
