
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
let employeeId = [];

function validateId(input) {
    if (isNaN(input)) {
        return "Please enter a four digit employee ID number";        
    }
    for (i = 0; i < employeeId.length; i++) {
        if (input === employeeId[i]) {
            return "That ID number is already in use!"
        }
    }
    return true;
 }

 console.log("Please build your engineering team");

 const engineerStart = () => {
     inquirer.prompt([
         {
             type: "input",
             message: "What is your engineer's name?",
             name: "name"
         },
         {
             type: "number",
             message: "What is your engineer's ID number?",
             name: "id",
             validate: validateId
         },
         {
             type: "input",
             message: "What is your engineer's email address?",
             name: "email"
         },
         {
             type: "input",
             message: "What is your engineer's Github user name?",
             name: "github"
         }         
     ]).then((prompt) => {
         // create new engineer
         const newEngineer = new Engineer(prompt.name, prompt.id, prompt.email, prompt.github);


         employees.push(newEngineer);
         employeeId.push(prompt.id);

         secondPrompt();
     });
};


const internStart = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your intern's ID number?",
            name: "id",
            validate: validateId
        },
        {
            type: "input",
            message: "What is your intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "Where is your intern attending school?",
            name: "school"
        }
    ]).then((prompt) => {
        const newIntern = new Intern(prompt.name, prompt.id, prompt.email, prompt.school);

        employees.push(newIntern);
        employeeId.push(prompt.id);

        secondPrompt();
    });
};


const secondPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add now?",
            choices: ["Engineer", "Intern", "I don't want to add anyone"],
            name: "action"
        }
    ]).then((prompt) => {
        switch (prompt.action) {
            case "Engineer": 
            engineerStart();
            break;
            
            case "Intern": 
            internStart();
            break;
            default:

            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log("Your html has been rendered! Head over to the output folder");
            break;
        }
    });
};

const templateStart = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your manager's ID number?",
            name: "id",
            validate: validateId
        },
        {
            type: "input",
            message: "What is your manager's email address?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your manager's office phone number?",
            name: "officeNumber"
        },
        {
            type: "list",
            message: "Which type of team member would you like to add now?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"],
            name: "action"
        }
    ]).then((prompt) => {
        const newManager = new Manager(prompt.name, prompt.id, prompt.email, prompt.officeNumber);

        employees.push(newManager);
        employeeId.push(prompt.id);

        switch (prompt.action) {
            case "Engineer":
                engineerStart();
                break;
                case "Intern":
                    internStart();
                    break;
                    default: 
                    fs.writeFile(outputPath, render(employees), function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    console.log("html has been rendered - checkout output folder");
                    break;
                }
            });
        };

        templateStart();