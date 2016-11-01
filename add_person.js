const settings = require('./settings');
const myArgs = process.argv.slice(2);
const firstName = myArgs[0];
const lastName = myArgs [1];
const birthday = myArgs [2];

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

knex.returning("id").insert({first_name: firstName, last_name: lastName, birthdate: birthday})
    .into("famous_people")
    .then(() => {knex.select("*").from("famous_people")
    .then((result) => {console.log(result)}
    )});
