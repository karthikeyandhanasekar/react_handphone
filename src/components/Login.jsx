import { Input, Form, Button } from "antd";
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import poster from '../assets/images/loginposter.png'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    React.useEffect(() => {
        const authToken = sessionStorage.getItem('auth-token')
        console.log(authToken)
        if (authToken) {
            navigate('/')
        }

    }, [navigate])

    const onsubmit = (data) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                console.log("success created");
                navigate("/")
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use !')
                        break;
                    case 'auth/wrong-password':
                        alert('Please check the Password')
                        break;

                    case 'auth/user-not-found':
                        alert('Please check the Email');
                        break;

                    default:
                        break;
                }
            })

        reset({
            email: "",
            password: ""
        })
    }
    return (
        <main>

            <div className="login">
                <div className="form">
                    <h4>Login</h4>

                    <Form layout="vertical" onFinish={handleSubmit(onsubmit)} >

                        {/* email */}
                        <Form.Item label="Email" required tooltip="Email is required" >
                            <Controller control={control}
                                name="email"
                                defaultValue={"karthik@gmail.com"}
                                render={({ field }) =>
                                    <Input {...field} placeholder="Email" required />
                                } />
                        </Form.Item>

                        {/* password */}
                        <Form.Item label="Password" required tooltip="Password is required" >
                            <Controller control={control}
                                name="password"
                                defaultValue={"karthik123"}
                                render={({ field }) =>
                                    <Input.Password {...field} placeholder="password" autoComplete="on" required />
                                } />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form>
                    <br />
                    <Link to="/signin" >New User...Singin Here</Link>
                </div>
                <div className="loginposter">
                    <img src={poster} alt="handphone.png" />
                </div>
            </div>
        </main>
    )
}

export default Login