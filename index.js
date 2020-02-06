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
      choices: ['ADD EMPLOYEE', 'VIEW INFORMATION', 'UPDATE INFORMATION', 'DELETE INFORMATION']
    }
  ]).then(function(response) {

    //confirming response in terminal
    console.log(`You chose to ${response.action}`);

    //using a switch statement to determine logic of user's choice of acction and target
    switch(response.action){
      case 'ADD EMPLOYEE':
          addEmployee();
          break;
      case 'VIEW INFORMATION':
          viewData()
          break;
      case 'UPDATE INFORMATION':
          createData()
          break;
      case 'DELETE INFORMATION':
          deleteData();
          break;
    }
  })
  .catch(function(err) {
    console.log(err);
  })
}

const addEmployee = () => {
  const employeesQuery = 'SELECT * FROM employees',
        rolesQuery = 'SELECT * FROM roles';
  connection.query(employeesQuery, function(err, employee) {
    if (err) throw err
    connection.query(rolesQuery, function(err, role) {
        if (err) throw err
        inquirer.prompt([{
          name: 'first_name',
          type: 'input',
          message: "What is the employee's first name?"
        },
        {
          name: 'last_name',
          type: 'input',
          message: "What is the employee's last name"
        },
        {
          name: 'role',
          type: 'list',
          message: "What is this employee's role",
          choices: () => role.map(val => val.title)
        }
        {
          name: 'hasManager',
          type: 'confirm',
          message: "Does this employee have a manager?"
        },
        {
          name: 'manager',
          type: 'list',
          message: 'Choose their manager',
          when: 'hasManager',
          choices: () => employee.map(val => val.first_name + " " + val.last_name)
        }
      ]).then(function(response) {

      })
    })
  })
}

//viewing all data function
const viewData = () => {
  inquirer.prompt([
    {
      name: 'filter',
      type: 'list',
      message: 'How would you like to view the data?',
      choices: ['VIEW ALL EMPLOYEES', 'VIEW EMPLOYEES BY DEPARTMENT', 'VIEW EMPLOYEES BY MANAGER']
    }]).then(function(response){
      switch(response.filter){
        case 'VIEW ALL EMPLOYEES':
          console.log('Selecting all employees...\n');
          connection.query(`SELECT * FROM employees`, function(err, response) {
            if(err) throw err
            console.table(response);
            continuePrompt();
          });
          break;
        case 'VIEW EMPLOYEES BY DEPARTMENT':
          let query = 'SELECT department_name FROM departments';
          connection.query(query, function(err, response) {
            if(err) throw err;
            console.log(response);
            inquirer.prompt(
              {
              type: 'list',
              name: 'department',
              message: 'SELECT DEPARTMENT',
              // choices: ()=>response
              choices: ['SALES', 'ENGINERING', 'FINANCE', 'LEGAL']
            }).then(function(response) {
              let query = 'SELECT d_id FROM departments Where ?';
              connection.query(query, { department_name: response.department }, function(err, data) {
                if (err) throw err
                const departmentId = data[0].d_id;
                const newQuery = "SELECT * FROM employees e INNER JOIN roles r on e.role_id = r.department_id Where e.role_id = ?";
                connection.query(newQuery, [departmentId], (err, response) => {
                    if(err) throw err;
                    console.table(response);
                });
                continuePrompt();
              });
            });
          });
          break;
      }
    });
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
