const ask = require('inquirer');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const Jon = new Engineer('Jon', 'ocskier@gmail.com', 'ocskier');
console.log(Jon.getId());
console.log(Jon.getRole());
console.log(Jon);


export{}