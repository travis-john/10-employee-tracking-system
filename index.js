//Calling required node packages
const inquirer = require('inquirer'),
      mysql = require('mysql');

//Configuring database connection
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "",
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
      choices: ['EMPLOYEES', 'ROLES', 'DEPARTMENTS']
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
  })
  .catch(function(err) {
    console.log(err);
  })
}

//viewing all data function
const viewData = (response) => {
  switch(response){
    case 'EMPLOYEES':
      console.log(`Selecting all employees...\n`)
      connection.query(`SELECT * FROM employees`, function(err, response) {
        if (err) throw err
        console.table(response);
        continuePrompt();
      });
      break;
    case 'ROLES':
      console.log(`Selecting all roles...\n`)
      connection.query(`SELECT * FROM roles`, function(err, response) {
        if (err) throw err
        console.table(response);
        continuePrompt();
      })
      break;
    case 'DEPARTMENTS':
      console.log(`Selecting all departments...\n`)
      connection.query(`SELECT * FROM departments`, function(err, response) {
        if(err) throw err
        console.table(response);
        continuePrompt();
      });
  }
}

const continuePrompt = () => {
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Would you like to contine or exit?',
      choices: ['CONTINUE', 'EXIT']
    }
  ]).then(function(response){
    console.log(`${response.action} \n`)
    switch(`${response.action}`){
      case 'CONTINUE':
        firstPrompt();
        break;
      case 'EXIT':
        connection.end();
    }
  });
}
