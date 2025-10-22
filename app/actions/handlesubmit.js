import React from 'react'

const handlesubmit = (e) => {
  const existingArray = JSON.parse(localStorage.getItem("myArray")) || [];

   let obj = {
    link:e.get("link"),
    username: e.get("username"),
    password:e.get("password"),
    id:Date.now()
   }
  existingArray.push(obj);
  localStorage.setItem("myArray", JSON.stringify(existingArray));


  return (
    <div>
      
    </div>
  )
}


const handleedit = () => {

  return (
    <div>
      
    </div>
  )
}

const handledelete = (id) => {

  const existingArray = JSON.parse(localStorage.getItem("myArray")) 
  const updated = existingArray.filter((i) => i.id !== id);
   localStorage.setItem("myArray", JSON.stringify(updated));

  return (
    <div>
      
    </div>
  )
}



export {handlesubmit,handleedit,handledelete}
