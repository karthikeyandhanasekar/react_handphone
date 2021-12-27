
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'



export const FirebaseLogin = ({ data ,route}) => {
    try {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                console.log("success created");
                route("/")
            })
    } catch (error) {
        console.error(error.message);

    }
}