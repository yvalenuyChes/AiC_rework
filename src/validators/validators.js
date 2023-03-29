export const emailValidator = (email) =>{
   let isValid = false
   if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email))
   {
      isValid = false
   }else{
      isValid = true
   }
   return isValid
}

export const checkMinLength = (string, min) => {
   let isValid = false
   if(string > min){
      isValid = true
   }else{
      isValid = false
   }
   return isValid
}

export const checkMaxLength = (string, max) => {
   let isValid = false
   if(string < max){
      isValid = true
   }else{
      isValid = false
   }
   return isValid
}