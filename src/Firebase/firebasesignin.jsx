
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'



export const FirebaseSignin = ({data}) =>
{
        console.log(data);
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                return true
            })
            .catch(error =>{
                switch(error.code) {
                    case 'auth/email-already-in-use':
                          alert('Email already in use !')
                          break;
                    default:
                        break;
            }})
        
        return false
   
}