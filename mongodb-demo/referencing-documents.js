const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log("Successfully connected to mongoDB ...."))
    .catch(err => console.log("Failed to connect ...", err.message));



// =====================================================================
const Author = mongoose.model('Author', new mongoose.Schema({
    name: String, 
    bio : String, 
    website : String 
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name : String,
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    }
}));

// =====================================================================
async function createAuthor(name , bio, website){
    const author = new Author({
        name,
        bio, 
        website
    })

    const result = await author.save();
    console.log(result);
}
async function createCourse(name , author ){
    const course = new Course({
        name , 
        author
    });

    const result = await course.save();
    console.log(result);
}
async function listCourse(){
    const courses = await Course
        .find()
        .populate('author', 'name website -_id')
        .select('name author');
    console.log(courses);
}
//============================================================================



// createAuthor("Mosh Hamedani", "Hello , this is mosh ", "www.codewithmosh.com");
// createCourse("Node Js Tutorial" ,"6559fb131ed8fc2ed45b348e" );

 
listCourse();   