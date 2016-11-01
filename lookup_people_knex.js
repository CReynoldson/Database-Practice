const settings = require('./settings');
const myArgs = process.argv.slice(2).toString();
const printer = require('./printer');

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.select().from('famous_people').where('first_name', myArgs).orWhere('last_name', myArgs).asCallback(function (err, result){
  if (err){
    console.log(err);
  }
  printer.printResults(null, result, myArgs);
})





