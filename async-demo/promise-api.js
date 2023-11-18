/*The promise which is already resolved/ fulfilled 
const p = Promise.resolve({id: 1, name: "Dude"});
p.then(result => console.log('Result: ', result));
*/

/* the promise which is already rejected 
const p = Promise.reject(new Error("An error occurred !! "));
p.catch(err => console.log("Error: ", err));
*/


// Runnning parallel Promises 

// First promise 
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Reading FACEBOOK API ......");
        resolve({platform : 'facebook.com', username : "sudeep.bogati07" });
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Reading Instagram APIs .....");
        resolve({platform : 'instagram.com', username: '_sudeep.bogati'});
    }, 2000);
});

/* To run these operations at the same time 
Promise.all([p1,p2])
    .then(result => console.log('Rsult : ', result))
    .catch(err => console.log('Error',err));
*/

/* to display as soon as one of these operations completes , 
Promise.race([p1,p2])
    .then(result => console.log("Result: ", result ));
*/


