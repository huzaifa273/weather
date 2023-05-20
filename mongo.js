const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cPassword:{
      type:String,
      require:true
  }
})
const collection = mongoose.model("users", userSchema)
module.exports = collection


// collection.create({
//     email: "malik huzaifa",
//     password: 123456,
//   }).then((ans) => {
//     console.log("Document inserted")
//   }).catch((err) => {
//     console.log(err.Message);
//   })

// const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/weather")
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log("failed to connect");
// })

// const contactSchema = new mongoose.Schema({
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "User",
//     },
//     name:{
//         type:String,
//         require:[true, "Please add the contact name"]
//     },
//     email:{
//         type:String,
//         require:[true, "Please add the contact email"]
//     },
//     phone:{
//         type:String,
//         require:[true, "Please add the contact phone number"]
//     }
// },
// {
//     timestamps: true,
// }
// );

// module.exports = mongoose.model("contact", contactSchema)

// // module.exports = collection