const { async } = require('jshint/src/prod-params');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises')
    .then(() => console.log('Successfully connected to mongoDB ....'))
    .catch(err => console.log("Failed to connect ! Something went wrong ..."));




const courseSchema = new mongoose.Schema({
    name : String, 
    author : String,
    tags : [ String],
    date : Date,
    isPublished: Boolean , 
    price : Number
});

const Course = mongoose.model('Course', courseSchema)


/* Exercise-1 
async function getCourse(){
    return await Course
        .find({ isPublished : true , tags: 'backend'})
        .sort({ name : 1 })
        .select({ name : 1, author : 1 })
}

async function run(){
    const result = await getCourse()
    console.log(result);
}
run();*/

async function getCourse(){
    return await Course 
        // .find({isPublished : true , tags : {$in: ['frontend', 'backend']}})
        .find({isPublished:true})
        .or([
            {tags: 'backend'}, 
            {tags: 'frontend'}
        ])
        .sort({price : -1})
        .select({name : 1 , author : 1 })
}


async function run(){
    const result = await getCourse();
    console.log(result);
}
run();