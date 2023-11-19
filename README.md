# Intro to Nodejs
> Scott Moss & Frontend Masters
- [Resources](#resources)
- [Course](#course)
- [Exercises](#exercises)
  - [Installing Node](#installing-node)
  - [Modules (node vs browser)](#modules-node-vs-browser)
  - [CLI (npm)](#cli-npm)
  - [API (async code)](#api-async-code)
  - [Debugging & Testing](#debugging--testing)
  - [Sharing and Deploying](#sharing-and-deploying)

## Resources
* [Slides](https://slides.com/scotups/deck/fullscreen)
* [Nodejs](https://nodejs.org/en/)
* [NVM](https://github.com/creationix/nvm)
* [Heroku](https://heroku.com)
* [NPM](https://www.npmjs.com/)

## Course
Taken  [Node.js: The Complete Guide to Build RESTful APIs ](https://www.udemy.com/course/nodejs-master-class/) course by Mosh Hamedani .

## Exercises

### Installing Node
Install node with [node version manager (NVM)](https://github.com/creationix/nvm#installation). NVM was created by the community and not the Nodejs foundation. However, it is the recommended approach. After installing nvm, use nvm to install the lates version of Nodejs, which at this time is `10` and set it to the default version
```bash
nvm install node # node is an alias for the latest version
nvm alias default node
```
If this fails, or you want to install nodejs from nodejs source, [then go here](https://nodejs.org/en/)

Important: After installing node, please run `npm install i` or `npm install` to install the dependencies located in the `package.json` file (utilized in future exercises).
### Modules (node vs browser)
* location - `exercises/modules`
* commands
  * test - `npx jest`

### CLI (npm)
* location - `exercises/cli`
* commands
  * new - `node exercises/cli/index.js new`
  * list - `node exercises/cli/index.js list`

### API (async code)
* location - `exercises/api`
* commands
  * start the server - `node exercises/api/server.js`

### Debugging & Testing
* location - `exercises/testing`
* commands
  * start the server - `node exercises/testing/index.js`
  * test - `npm test` or `yarn test` or `npx jest`

You have to debug and track down some issues in a small app. Use your logging and inspector to find them. Try and fix them, once you do, write some test to make sure it stays fixed 👌🏾😎💯

- [ ] checkout to start branch
- [ ] check the README on how to execute this program and run test
- [ ] there are 3 bugs, find them and fix them
- [ ] write some unit test with Jest to make sure those bugs stay fixed. Refactor the code if you have to
### Sharing and Deploying
Deploy one of the exercises to heroku (server) or npm (cli)
