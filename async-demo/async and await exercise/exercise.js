const { async } = require("jshint/src/prod-params");

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });
// converting into async and await 

async function notifyCustomer(){
  try {
    const customer = await getCustomer(1);
    console.log("Hello Customer: ", customer);
    if(customer.isGold){
      const topMovies = await getTopMovies();
      console.log('Top Movies: ',topMovies);
      const emailSent = await sendEmail(customer.email, topMovies);
      console.log("Email sent ....");
    }
  }
  catch(err){
    console.log("An error occurred ...", err);
  }
}

notifyCustomer();

// converting into promises
function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 2000);  
  });
}

function getTopMovies() {
  return new Promise ((resolve, reject) =>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}