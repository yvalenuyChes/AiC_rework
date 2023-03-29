const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
   name:String,
   email:{
      type:String,
      required:true,
      unique: [true, "email already exists in database!"],
   },
   password: String
}, 
{ timestamp: true },
)

module.exports = model('User', UserSchema)