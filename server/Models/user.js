const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
   name:String,
   email:{
      type:String,
      required:true,
      unique: [true, "email already exists in database!"],
   },
   password: String,
   tickets:[{
      name: String,
      personNumber: Number,
      dateFrom: Date,
      dateCome:Date,
      price: Number
   }]
}, 
{ timestamp: true },
)

module.exports = model('User', UserSchema)