import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form>
        <fieldset id="personal_details">
          <legend> Personal Details </legend>
          <label for="first_name">First name:</label> <br/>
          <input type="text" id="first_name" name="first_name" placeholder="John" /> <br/>

          <label for="last_name">Last name:</label> <br/>
          <input type="text" id="last_name" name="last_name" placeholder="Doe"/> <br/>

          <label for="phone_number">Phone Number:</label> <br/>
          <input type="tel" id="phone_number" name="phone_number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="000-000-0000"></input> <br/>
 
          <label for="email_address">Email:</label> <br/>
          <input type="email" id="email_address" name="email_address"></input> <br/>

          <label for= "linkedin_profile">Linkedin:</label> <br/>
          <input type="url" id="linkedin_url" name="linkedin_url"></input> <br/>

          <label for="personal_github">Github:</label> <br/>
          <input type="url" id="personal_github" name="personal_github"></input> <br/>

          <label for="personal_website">Your Website:</label> <br/>
          <input type="url" id="personal_website" name="personal_website"></input> <br/>
          </fieldset>
      </form>
    </>
  )
}

export default App
