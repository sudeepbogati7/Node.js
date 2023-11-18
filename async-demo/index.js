
/*synchronous 
console.log("Before...");
setTimeout(() => {
    console.log("Loading your interface, .............");
}, 3000);

console.log("After....");*/


/* Synchronous 
console.log("Before....");
function getUserId(id){
    setTimeout(() => {
        console.log("Getting user ID from database...........");
        return { id: id, gitHubUsername : 'sudeepbogati7'}
    }, 1);
}

console.log(getUserId(1));
console.log("After");*/

/*Using callback funcion */



/* asynchronous callback hell problem 
console.log("Before");
getUserId(1, (user) => {
    getRepositories(user.githubUsername , (repos) => {
        getCommits(repos, (commits) => {
            // callback hell 
        });
    });
}); // Here we can notice that as long as the nested functions increases, it will more look like a tree , which is very complex to understand 
    // to overcome this 'Callback Hell' problem , we should use the separate function   
console.log("After........");
*/

// Call back hell / Christmas tree problem soltion ;

console.log("Before");
// for this solution 
// here we define a separate function 

getUserId(1, getRepositories);

function getRepositories(user){
    getRepositories(user.githubUsername, getCommits);
}

function getCommits(repos){
    getCommits(repos, displayCommits);
}

function displayCommits(commit){
    console.log("This is my first Commit. ", commit);
}


function getUserId(id, callback){
    setTimeout( () => {
        console.log("Getting username from database,..................");
        callback({id: id, githubUsername:'sudeep'});
    }, 2000);
}

// getting repositories

function getRepositories(username,callback){
    setTimeout(() => {
        console.log("Getting repositories......");
        callback(['repo1', 'repo2', 'repo3', 'repo4']);
    }, 2000);
}

