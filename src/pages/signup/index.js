import axios from "axios"

const { useState } = require("react")

const signupPage = () => {

   const [values, setValues] = useState({
      name:'',
      email:'',
      password:''
   })

   const {name, email, password  } = values

   const handleChange = name => event => {
      setValues({
         ...values,
         [name]: event.target.value
      })
   }

   function handleSubmit(event) {
      event.preventDefault()

      const configuration = {
         method:'post',
         url:'http://localhost:3000/signup',
         data:{
            name: values.name,
            email:values.email,
            password: values.password,
         }
      }

      axios(configuration)
      .then(result => console.log(result))
      .catch(err => console.log(err))
   }


   return(
      <div>
         <form
            method="POST"
            onSubmit={handleSubmit}
         >
            <input placeholder="name" value={name} onChange={handleChange('name')} />
            <input placeholder="email" value={email} onChange={handleChange('email')} />
            <input placeholder="password" value={password} onChange={handleChange('password')} />
            <button type="submit" >Send</button>
         </form>
        
      </div>
   )
}

export default signupPage