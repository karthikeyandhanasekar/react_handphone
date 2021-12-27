
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';



export const FirebaseSignin = ({data}) =>
{
    try {
        const naviagte = useNavigate()
        console.log(data);
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                naviagte.push('/login')
                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                console.log("success created");
            })
        

    } catch (error) {
        console.error(error.message);

    }
}