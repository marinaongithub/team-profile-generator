const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function init() {

    let employeeType = "Manager";
    let extraInfo = "office number";

    let prompts = [
            {
                type: "input",
                message: () => {

                return `What's the ${employeeType} name?`
            },
                name: "name",
                validate: (input) => {
                    if (!input) {
                        return `Please enter ${employeeType} name!`;
                    }
                    return true;
                }
            },
            {
                type: "input",
                message: () => {
                    return `What's the ${employeeType} id?`
                },
                name: "id",
                validate: (input) => {
                    if (!input) {
                        return `Please enter the ${employeeType} id!`;
                    }
                    return true;
                }
            },
            {
                type: "input",
                message: () => {
                    return `What's the ${employeeType} email?`
                },
                name: "email",
                validate: (input) => {
                    if (!input) {
                        return `Please enter the ${employeeType} email!`;
                    }
                    return true;
                }
            },
            {
                type: "input",
                message: () => {
                    return `What's the ${employeeType} ${extraInfo}?`
                },
                name: "extraInfo",
                validate: (input) => {
                    if (!input) {
                        return "Please enter the team Manager office number";
                    }
                    return true;
                }
            },
            {
                type: "list",
                message: "Which type of team member do you want to add?",
                name: "employeeType",
                choices: ["Engineer", "Intern", "I don't want to add another team member."],
            },
        ];

        inquirer.prompt(prompts)
        .then(async (response) => {

            // Employee type of the new member to add
            employeeType = response.employeeType;

            // array to store the team members
            let team = [];

            // creates a new manager object
            let manager = new Manager(response.name, response.id, response.email, response.extraInfo);
           
            // add the new manager object to the array
            team.push(manager);

            // while the user decides to add a new member, the questions presented with wording corresponding to the new member to add
            while (employeeType !== "I don't want to add another team member.") {

                // update extraInfo wording to 'github' if the new member to add is an engineer
                if (employeeType === "Engineer") {
                    extraInfo = "github";

                    // prompts with updated wording
                    newMember = await inquirer.prompt(prompts)

                    // creates a new Employee, type depending on the user previous input
                    team.push(new Engineer(newMember.name, newMember.id, newMember.email, newMember.extraInfo));
                    console.log(newMember);
                }

                // update extraInfo wording to 'school' if the new member to add is an intern
                else if (employeeType === "Intern") {
                    extraInfo = "school";

                    // prompts with updated wording
                    newMember = await inquirer.prompt(prompts)

                    // creates a new Employee, type depending on the user previous input
                    team.push(new Intern(newMember.name, newMember.id, newMember.email, newMember.extraInfo));
                    console.log(newMember);
                }

                employeeType = newMember.employeeType;

                console.log(team);
            }               
    })
}


init();