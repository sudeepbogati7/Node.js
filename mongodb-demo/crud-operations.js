const { async } = require('jshint/src/prod-params');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/students')
    .then(() => console.log("Successfully connected to mongoDB ....."))
    .catch(err => console.log("Faild to connect , something went wrong  ! ", err.message));


// 1. create a new document schema 
const createSchema = new mongoose.Schema({
    name : String,
    age : Number,
    address : String,
    contact : Number, 
    DOB : { type : Date , default : Date.now},
    isNepali : Boolean, 
    parentName: String, 
    major : [ String ] 
});

// create a model , with singular name of the schema is about 
const Student = mongoose.model('Student', createSchema); // since it returns a class so first letter must be upppercase 

//create a new instance of class 
async function createStudent(){
    const student = new Student({
        name : 'Thor Ondinson',
        age : 19, 
        address : 'Kathmandu',
        contact : 999948875,
        isNepali : true,
        parentName : "ShahRukh Khan",
        major : ['English', 'Computer']
    });
    
    const result = await student.save()
    console.log(result);
}



/*Quering the document 
async function getStudent(){
    // const students = await Student.find() // returns all the records 
    const students = await Student
        .find({ isNepali:true, age : 19 }) // returns records with filter 
        .limit(10) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .select({ name : 1, age : 1 , isNepali : 1, address : 1 })
    
    console.log(students);
}

getStudent();
*/




/*result :
Successfully connected to mongoDB .....
[
  {
    _id: new ObjectId('6557434d042ced5e6b96cfe2'),
    name: 'Sudeep Bogati',
    age: 19,
    address: 'Kathmandu',
    isNepali: true
  },
  {
    _id: new ObjectId('65574746ea068c5b99e0adf0'),
    name: 'Thor Ondinson',
    age: 19,
    address: 'Kathmandu',
    isNepali: true
  }
]*/


/* Arithmatic Operators 

async function getStudent(){
    // const students = await Student.find() // returns all the records 

    // Arithmatic Operators 
    // eq = ( equal )
    // ne = ( not equal )
    // gt = (greater than )
    // gte = ( greater than or equal to )
    // lt = ( less than )
    // lte = ( less than and equal to )
    // in 
    // nin ( not in )
    
    const students = await Student
        // .find({ isNepali:true, age : 19 }) // returns records with filter 
        
        // .find({ age : { $gt : 19}}) // greater than 19 (age)
        //.find({ age : { $gte : 19 , $lte : 25}}) // greater than or equal to 19 and less than or equal to 25
        .find({ age : { $in : [19,20,21]}}) // if the age is 19 , 20 or 21 
        .limit(10) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .select({ name : 1, age : 1 , isNepali : 1, address : 1 })
    
    console.log(students);
}

getStudent();
*/



/*Logical Operators

async function getStudent(){
    // const students = await Student.find() // returns all the records 
    const students = await Student
        .find()
        // .or([ { isNepali : true }, {age: 20}]) // Is Nepali or age = 20 
        .and( [ {isNepali : true},{ age: 19} ]) // isnepali and age of 20
        .limit(10) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .select({ name : 1, age : 1 , isNepali : 1, address : 1 })
    
    console.log(students);
}

getStudent();*/



/* Regular Expresssions (RegEx)
// if we need to filter strings which contains specific character , we use regular expression 


async function getStudent(){
    // const students = await Student.find() // returns all the records 
    const students = await Student
        // .find( { name: /pattern/ } ) //  
        .find( { name : /^Sudeep/i}) // if the name contains sudeep at the beginning ----- i => case insensative
        .find({ name : /Bogati$/}) // at the end 
        // .find({name : /.*sudeep.* /i}) // at any point 
        .limit(10) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .select({ name : 1, age : 1 , isNepali : 1, address : 1 })
    
    console.log(students);
}

getStudent()
*/


/* Count operator
async function getStudent(){
    // const students = await Student.find() // returns all the records 
    const students = await Student
        .find({ isNepali:true, age : 19 }) // returns records with filter 
        .limit(10) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .count() // this will return the number of documents which matches the above filters
    
    console.log(students);
}

getStudent(); // 2

*/

/*Pagination 

async function getStudent(){

    const pageNumber = 2;
    const pageSize = 10;

    const students = await Student
        .find({ isNepali:true, age : 19 }) // returns records with filter 
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize) // upto 10 records
        .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
        .count() // this will return the number of documents which matches the above filters
    
    console.log(students);
}

getStudent();
*/

// Update document

async function getStudent(){
    
    const pageNumber = 2;
    const pageSize = 10;
    
    const students = await Student
    .find({ isNepali:true, age : 19 }) // returns records with filter 
    .limit(pageSize) // upto 10 records
    .sort({ name : 1 }) // 1 mean ascending and -1 mean descending 
    .count() // this will return the number of documents which matches the above filters
    
    console.log(students);
}


/* Query First Approach : 
    1. Find by ID
    2. Modify properties 
    3. Save 


async function updateStudent(id){
    const student = await Student.findById(id);
    if(!student) return ;
    
    // student.isNepali = true ;
    // student.name = 'Tony Stark';
    

    //also
    student.set({
        isNepali : false,
        name : 'Tony Stark'
    });

    const result = await student.save()
    console.log(result);
}


updateStudent('6557434d042ced5e6b96cfe2');
*/



/* Update First Approach 
async function updateStudent(id){
    const result = await Student.findByIdAndUpdate(id , {
        $set : {
            name: 'Kathmandu wala name ',
            age: 100
        }
    }, {new: true})
    console.log(result);
}
updateStudent('6557434d042ced5e6b96cfe2');*/




/* Delete a document */

async function deleteStudent(id){
    const result = await Student.deleteOne({_id : id});
    console.log(result);
}
deleteStudent('6557434d042ced5e6b96cfe2');