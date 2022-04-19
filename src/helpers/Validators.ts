export const validateSignupInput = (formInput: any) => {
  let message:any = {}
  // test validity email input
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(formInput.email)) {
    message.errorEmail = "Email format is incorrect"
  } else {
    message.errorEmail = ""
  }

  // test validity username input
  if (formInput.username === "") {
    message.errorUsername = "Username cannot be blank"
  }

  // test validity confirm password input
  if (formInput.password === "") {
    message.errorPassword = "Password cannot be blank"
  } else {
    message.errorPassword = ""
  }

  // test validity confirm password confirmation input
  if (formInput.password !== formInput.passwordConfirm) {
    message.errorPasswordConfirm = "Confirmation password must be same with password"
  } else {
    message.errorPasswordConfirm = ""
  }

  return message
}