const ask = require('inquirer');

const Engineer = require('./lib/Employee');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const Jon = new Engineer('Jon', 'ocskier@gmail.com', 'ocskier');
console.log(Jon.getId());
// console.log(Jon.getGithub());


export{}