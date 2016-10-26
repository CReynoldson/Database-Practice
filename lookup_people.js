const settings = require ('./settings');
const db = require('./db.js');
const printer = require('./printer.js')
const myArgs = process.argv.slice(2).toString();

function findPeople (myArgs) {
  db.lookup(myArgs, printer.printResults);
}

findPeople(myArgs);



