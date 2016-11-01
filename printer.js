
module.exports.printResults = function (err, result, myArgs){
  if (err){
    throw (err);
  }
  let birthdateFormat = (result[0].birthdate);
  birthdateFormat =  birthdateFormat.toDateString();
  console.log("Searching...");
  console.log(`Found ${result.length} person(s) by the query \'${myArgs}\':`);
  result.forEach(function (element, index){
    console.log(`${index + 1}: ${element.first_name} ${element.last_name}, born \'${birthdateFormat}\'`);
  });
}