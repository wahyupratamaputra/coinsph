import axios from 'axios'


export const checkUsername = (formUsername:string) =>{
  return new Promise((resolve, reject) => {
    axios.post('https://api.wahyu.ninja/check-username', {
      username: formUsername
    }).then((response) => {
      let message
      if (!response.data.isAvailable) {
        message = `Username ${formUsername} has been taken`
      }else{
        message = ""
      }
      resolve(message)
    }).catch((error) => {
      reject(error);
    });
  });
}