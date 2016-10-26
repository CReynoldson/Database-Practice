const pg = require ('pg');
const settings = require ('./settings');
const myArg = process.argv.slice(2).toString();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect ((err) => {
  if (err) {
    return (console.log(err));
  }
  client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1", ["%"+myArg+"%"],
  (err, result) => {
    if (err) {
      throw err;
    }
    printResults(result, myArg);
    client.end();
  });

});

function printResults(result, myArg){
  console.log(result.rows[0].birthdate);
  let birthdateFormat = (result.rows[0].birthdate);
  birthdateFormat =  birthdateFormat.toDateString();
  console.log("Searching...");
  console.log(`Found ${result.rows.length} person(s) by the query \'${myArg}\':`);
  result.rows.forEach(function (element){
    console.log(`-1: ${element.first_name} ${element.last_name}, born \'${birthdateFormat}\'`);
  });
}

