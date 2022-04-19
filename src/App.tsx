import { useState, useEffect } from 'react'
import './App.css'
import InputForm from './components/InputForm'
import { checkUsername } from './helpers/ApiServices'
import useDebounce from './helpers/Debounce'
import { validateSignupInput } from './helpers/Validators'


function App() {
  const [isClickRegister, setIsClickRegister] = useState(false)
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  })
  const [errorMessage, setErrorMessage] = useState({
    errorEmail: "",
    errorPassword: "",
    errorPasswordConfirm: "",
    errorUsername: "",
  })

  // will watch changes for username with half a second debounce time
  const debouncedUsername = useDebounce(formInput.username, 500);

  useEffect(() => {
    checkUsernameAvailability()
  }, [debouncedUsername])


  useEffect(() => {
    // check if user click button register/submit to activate validation every form edit
    if (isClickRegister) {
      validateForm()
    }
  }, [formInput])

  const validateForm = (isClickSubmit:boolean = false) => {
    setIsClickRegister(true)
    let validationMessage = validateSignupInput(formInput)
    // combine errormessage because debounce effect of username
    validationMessage = {...errorMessage, ...validationMessage}
    let isHasError = (validationMessage.errorEmail || validationMessage.errorPassword || validationMessage.errorPasswordConfirm || validationMessage.errorUsername)

    setErrorMessage({ ...errorMessage, ...validationMessage })
    if (!isHasError && isClickSubmit) {
      // code submit here
      alert("Register success")
    }
  }

  const checkUsernameAvailability = () => {
    checkUsername(formInput.username).then((message) => {
      setErrorMessage({ ...errorMessage, errorUsername: message })
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="container">
      <h2 className="text-center my-5">Registration Form</h2>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <InputForm type="email" id="inputEmail" errorMessage={errorMessage.errorEmail} onInputChange={(e) => setFormInput({ ...formInput, email: e.target.value })} />
        <div className="invalid-feedback">{errorMessage.errorEmail}</div>
      </div>
      <div className="form-group">
        <label htmlFor="inputUsername">Username</label>
        <InputForm type="text" id="inputUsername" errorMessage={errorMessage.errorUsername} onInputChange={(e) => setFormInput({ ...formInput, username: e.target.value })} />
        <div className="invalid-feedback">{errorMessage.errorUsername}</div>
        <small id="usernameHelp" className="form-text text-muted">try input <b>coinsph</b> or <b>wahyupratama</b> for taken username</small>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <InputForm type="password" id="inputPassword" errorMessage={errorMessage.errorPassword} onInputChange={(e) => setFormInput({ ...formInput, password: e.target.value })} />
        <div className="invalid-feedback">{errorMessage.errorPassword}</div>
      </div>
      <div className="form-group">
        <label htmlFor="inputConfirmPassword">Confirm Password</label>
        <InputForm type="password" id="inputConfirmPassword" errorMessage={errorMessage.errorPasswordConfirm} onInputChange={(e) => setFormInput({ ...formInput, passwordConfirm: e.target.value })} />
        <div className="invalid-feedback">{errorMessage.errorPasswordConfirm}</div>
      </div>
      <button className="btn btn-primary" onClick={() => validateForm(true)}>Register</button>
    </div>
  )
}

export default App
