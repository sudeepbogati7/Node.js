
/*Promise Object Simple Overview 
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1);
        reject(new Error('SyntaxError')); // pending => resolved , fulfilled 
        resolve("Success !");
    }, 2000);
});
p
    .then(result => console.log("Result: ", result))
    .catch(err => console.log("An error occurred ..", err.message));

*/

const { async } = require("jshint/src/prod-params");


//Replacing callbacks with promises // => Promise solution to CALLBACK HELL

/*callback hell
console.log("Before");
getUserId(1, (user) => {
    getRepositories(user.githubUsername, (repos) =>{
        getCommits(repos[0], (commits) =>{
            console.log(commits);
        });
    });
});*/

/* Consuming promises 
console.log("Before....");
getUserId(1)
    .then((user) => getRepositories(user.githubUsername))
    .then((repos) => getCommits(repos[0]))
    .then((commits) => console.log("Commits , ", commits))
    .catch(err => console.log('Error occurred ,', err.message));
*/
// this above promise implemetation can be shortened into the below code using async and await 

// async when a function body uses await then the function should use await keyword 
// to catch error on this (though we can't use .catch(function ) ) method in this approach 
// we use try and catch method 

// Using async and await
async function displayCommits(){
    try {
        const user = await getUserId(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log("Commit : ", commits);
    }
    catch(err){
        console.log("Error : ", err.message);
    }
}

displayCommits();


// getting user-id
function getUserId(id){
    return new Promise( (resolve, reject)=>{
        setTimeout( () => {
            console.log("Getting username from database,..................");
            resolve({id: id, githubUsername:'sudeep'});
        }, 2000);
    });
}



// getting repositories
function getRepositories(username){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log("Getting repositories......");
            resolve(['repo1', 'repo2', 'repo3', 'repo4']);
        }, 2000);
    });
}
// getting commits
function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("calling github API .........")
            // resolve(['First commit']);
            reject(new Error("Something went wrong ! Please try again ."));
        }, 3000);
    });
}





