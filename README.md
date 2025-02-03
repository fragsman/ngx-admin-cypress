# ngx-admin-cypress
### Introduction
This repo will contain Cypress tests used in Cypress course on Udemy from Artem Bondar Academy. I'll be adding more tests in the future just for practice.
The tests in this repo are to be used with with NGX-Admin which is in _ngx-admin_ repo. 

### Get Started
- Install Git
- Go to ngx-admin app and clone that repo (read the Introduction ⚠️)
- Clone this Repo
- Install NodeJS (I used 14.21).
- Install VS Code (or any IDE of your choice)
- Install Cypress. In a 📟 and type `npm install cypress --save-dev`
- Open Cypress Menu. In a new 📟 type `npx cypress open` and choose any test to run
- Install Multi-Reporter. In a new 📟 type `npm install cypress-multi-reporters mocha-junit-reporter --save-dev`
- Install Mochawesome. In a new 📟 type `npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev`
- Install JunitMerge. In a new 📟 type `npm install -g junit-merge`
- Install JunitMerge. In a new 📟 type `npm install del`

### Running tests
You can either run tests with npx cypress open and visually analyze the test in Cypress Window, or
You can run the command `npm run cypress:e2e`. It will run headlessly and a report will be generated in mochawesome-report folder.


### Reference 
📟 => Terminal