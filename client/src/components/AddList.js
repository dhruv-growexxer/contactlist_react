import React, { useState } from 'react'
import axios from 'axios';

const AddList = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState(0);

    const addToList = async () => {
        try {
            const postList = await axios.post('http://localhost:5000/api/contact', {
                first_name: firstName, last_name: lastName, phone
            })
            console.log(postList, "postList")
        } catch (error) {
            console.log("error ",error)
        }
    }
  return (
      
    <>
        <label htmlFor="first_name">Enter first name: </label>  
          <input type="text" name="first_name" id="" onChange={(e) => setFirstName(e.target.value)} />
          
        <label htmlFor="last_name">Enter last name: </label>  
        <input type="text" name="last_name" id="" onChange={(e)=>setLastName(e.target.value)}/>
        <label htmlFor="phone">Enter phone number: </label>  
        <input type="number" name="phone" id="" onChange={(e) => setPhone(e.target.value)} />
      <button onClick={addToList}>Add user</button>  <br /><br />
      
    </>
  )
}

export default AddList