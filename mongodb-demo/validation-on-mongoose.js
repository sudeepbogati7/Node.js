const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/students')
    .then(() => console.log("Successfully connected to mongoDB ....."))
    .catch(err => console.log("Faild to connect , something went wrong  ! ", err.message));


//Required validator 
const createSchema = new mongoose.Schema({
    name : String,
    // name : {
    //     type : String ,
    //     required : true,
    //     minlength: 5,
    //     maxlength :344
    // },
    age : {
        type : Number,
        min : 18, 
        max : 25
    },
    isNepali : Boolean, 
    address : String,
    contact : Number, 
    DOB : Date,
    parentName: String, 
    major : {
        type : Array,
        validate : {
            validator : function(v) {
                return v && v.length > 0
            },
            message : 'The student should have at least one major subject. '
        }

        // using callback validators 
        // validate :{
        //     isAsync : true,
        //     validator : function (v, callback){
        //         setTimeout(() => {
        //             const result = v.length > 0
        //             callback(result);
        //         }, 3000);
        //     },
        //     message : "The student should have at least one major subject."
        // }
    }
});

// create a model , with singular name of the schema is about 
const Student = mongoose.model('Student', createSchema); // since it returns a class so first letter must be upppercase (Pascal) 

//create a new instance of class 
async function createStudent(){
    const student = new Student({
        name : 'The Sudeep',
        age : 12, 
        address : 'Kathmandu',
        contact : 948875,
        isNepali : false,
        parentName : "Shah Rukh Khan",
        major :[]
    });
    
    try{
        const result = await student.save()
        console.log(result);
        }
    catch(ex){
        // console.log(ex.message);
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

createStudent();


