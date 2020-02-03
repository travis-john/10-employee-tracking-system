//Calling required node packages
const inquirer = require('inquirer'),
      mysql = require('mysql');

//Configuring database connection
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "INSERT PASSWORD HERE",
  database: 'ems_db'
});

//Connecting to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  firstPrompt();
});

//first prompt that a user will see
const firstPrompt = () => {

  //first inquirer prompt
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['ADD', 'VIEW', 'UPDATE', 'DELETE']
    },
    {
      name: 'option',
      type: 'list',
      message: 'Select from below',
      choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT']
    }
  ]).then(function(response) {

    //confirming response in terminal
    console.log(`You chose to ${response.action} a/an ${response.option}`);

    //using a switch statement to determine logic of user's choice of acction and target
    switch(response.action){
      case 'ADD':
          createData(response.option);
          break;
      case 'VIEW':
          viewData(response.option);
          break;
      case 'UPDATE':
          updateData(response.option);
          break;
      case 'DELETE':
          deleteData(response.option);
          break;
    }
  });
}
