  const settings = require('./settings');
  const pg = require('pg');

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
});

module.exports = {
lookup: function (query, cb) {
    client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1", ["%"+query+"%"],
    (err, result) => {
      if (err) {
        cb(err, null, null);
      } else if (result.rows.length){
        cb(null, result.rows, query);
        client.end();
      } else {
        console.log(`Didn't find anything matching ${query}. SORRY.`);
        client.end();
      }
    });
  }
};
