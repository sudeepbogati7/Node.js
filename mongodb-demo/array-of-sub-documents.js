const { async } = require('jshint/src/prod-params');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/embedding-docs')
    .then(() => console.log("Successfully connected to mongoDB ...."))
    .catch(err => console.error('Failed to connect ', err.message));


const authorSchema = new mongoose.Schema({
    name : String, 
    bio : String , 
    website : String
})

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name : String,
    authors : [authorSchema]
})); 


async function createAuthor(name , bio, website){
    const author = new Author({
        name , 
        bio, 
        website
    });
    const result= await author.save();
    console.log(result);
}
async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(result);
}
async function listCourses(){
    const courses = Course
        .find()
        .select('name author')
}
/*async function updateAuthor(courseId, newAuthor){
    const course = await Course.findById(courseId);
    course.author.name = newAuthor;
    course.save();
}*/

/*or above function can be implemented as 
async function updateAuthor(courseId){
    const course = await Course.updateOne({_id : courseId},{
        $set :{ // also unset method to remove the property or the sub-object (author)
            'author.name' : 'Nepali Coder' // this method directly changes the database without explicitly saving it to the memory
        }
    }); 
}*/


// updateAuthor('655a100d910131ac254c296e');

// createCourse('Node.js Course', new Author({
//     name : 'Thomas Alwa Edition ',
//     bio: "Hello this is thomas.",
//     website : 'www.thomasedition.com'
// }));

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    console.log(course);

}
// addAuthor('655a203ec0d58c63ca7b3d29', new Author({name : 'Tero Bau'}));


async function deleteAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const authorIndex = course.authors.findIndex(author => author._id == authorId);
    course.authors.splice(authorIndex, 1);
    course.save();
    console.log(course.authors);
}

deleteAuthor('655a203ec0d58c63ca7b3d29','655a24cfec7a78cfb2502e6d');
// createCourse('Python with Data Science ', [
//     new Author({name : "Mosh Hamedani "}),
//     new Author({name : "Mr.Sunil Bogati"})
// ]);

