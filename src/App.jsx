import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formEmail, setFormEmail] = useState("")
  const [formUsername, setFormUsername] = useState("")
  const [formPassword, setFormPassword] = useState("")
  const [formPasswordConfirm, setFormPasswordConfirm] = useState("")
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [validationMessage, setValidationMessage] = useState({
    errorEmail: "",
    errorPassword: "",
    errorPasswordConfirm: "",
    errorUsername: "",
  })


  // watching for input username change
  useEffect(() => {
    checkUsernameAvailability()
  }, [formUsername])

  const validateForm = () => {
    let message = { ...validationMessage }
    let isHasError = false
    // test validity email input
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(formEmail)) {
      message.errorEmail = "Email format is incorrect"
      isHasError = true
    } else {
      message.errorEmail = ""
    }

    // test validity username input
    if (formUsername === "") {
      message.errorUsername = "Username cannot be blank"
      isHasError = true
    }

    // test validity confirm password input
    if (formPassword === "") {
      message.errorPassword = "Password cannot be blank"
      isHasError = true
    } else {
      message.errorPassword = ""
    }

    // test validity confirm password confirmation input
    if (formPassword !== formPasswordConfirm) {
      message.errorPasswordConfirm = "Confirmation password must be same with password"
      isHasError = true
    } else {
      message.errorPasswordConfirm = ""
    }

    setValidationMessage(message)
    if (!isHasError && isUsernameAvailable) {
      // code submit here
      alert("registering user")
    }
  }

  const checkUsernameAvailability = () => {
    axios.post('https://api.wahyu.ninja/check-username', {
      username: formUsername
    }).then((response) => {
      let message = { ...validationMessage }
      if (!response.data.isAvailable) {
        message.errorUsername = `Username ${formUsername} has been taken`
      }else{
        message.errorUsername = ""
      }
      setIsUsernameAvailable(response.data.isAvailable)
      setValidationMessage(message)
      
    }).catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className="container">
      <h2 className="text-center my-5">Registration Form</h2>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input type="email" className={`form-control ${validationMessage.errorEmail ? "is-invalid" : ""}`} id="inputEmail" onChange={(e) => setFormEmail(e.target.value)} />
        <div className="invalid-feedback">{validationMessage.errorEmail}</div>
      </div>
      <div className="form-group">
        <label htmlFor="inputUsername">Username</label>
        <input type="text" className={`form-control ${validationMessage.errorUsername ? "is-invalid" : ""}`} id="inputUsername" onChange={(e) => setFormUsername(e.target.value)} />
        <div className="invalid-feedback">{validationMessage.errorUsername}</div>
        <small id="usernameHelp" class="form-text text-muted">try input <b>coinsph</b> or <b>wahyupratama</b> for taken username</small>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" className={`form-control ${validationMessage.errorPassword ? "is-invalid" : ""}`} id="inputPassword" onChange={(e) => setFormPassword(e.target.value)} />
        <div className="invalid-feedback">{validationMessage.errorPassword}</div>
      </div>
      <div className="form-group">
        <label htmlFor="inputConfirmPassword">Confirm Password</label>
        <input type="password" className={`form-control ${validationMessage.errorPasswordConfirm ? "is-invalid" : ""}`} id="inputConfirmPassword" onChange={(e) => setFormPasswordConfirm(e.target.value)} />
        <div className="invalid-feedback">{validationMessage.errorPasswordConfirm}</div>
      </div>
      <button className="btn btn-primary" onClick={validateForm}>Register</button>
    </div>
  )
}

export default App
