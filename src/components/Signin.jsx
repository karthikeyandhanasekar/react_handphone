import { Input, Form, Button } from "antd";
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import poster from '../assets/images/loginposter.png'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { database } from '../Firebase/firebaseconfig'
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const naviagte = useNavigate()

    const { control, handleSubmit, reset } = useForm();

    const users = collection(database, "users")

    const onsubmit = (data) => {
        const auth = getAuth()

        const storeusers = async (data) => {
            try {
                console.log(data);
                await addDoc(users, data)
            } catch (error) {
                console.log(error.message);
            }
        }

        createUserWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                storeusers(data)
                sessionStorage.setItem('username', data['username'])
                sessionStorage.setItem('email', data['email'])

                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                naviagte("/login")
                toast.success("Account Created Successfully")
            })

            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('Email already in use !')
                        break;
                    case 'auth/wrong-password':
                        toast.error('Please check the Password')
                        break;

                    case 'auth/user-not-found':
                        toast.error('Please check the Email');
                        break;

                    default:
                        break;
                }
            })

        reset({
            username: "",
            email: "",
            password: ""
        })
    }
    return (
        <main>

            <div className="login">
                <div className="form">
                    <h4>Signin</h4>

                    <Form layout="vertical" onFinish={handleSubmit(onsubmit)} >

                        <Form.Item label="Username" required tooltip="Username is required" >
                            <Controller control={control}
                                name="username"
                                render={({ field }) =>
                                    <Input {...field} placeholder="Username" required />
                                } />
                        </Form.Item>

                        {/* email */}
                        <Form.Item label="Email" required tooltip="Email is required" >
                            <Controller control={control}
                                name="email"
                                render={({ field }) =>
                                    <Input {...field} placeholder="Email" required />
                                } />
                        </Form.Item>

                        {/* password */}
                        <Form.Item label="Password" required tooltip="Password is required" >
                            <Controller control={control}
                                name="password"

                                render={({ field }) =>
                                    <Input.Password {...field} placeholder="password" autoComplete="on" required />
                                } />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form>
                    <br />
                    <Link to="/login" >Already has account...login here </Link>


                </div>
                <div className="loginposter">
                    <ToastContainer />
                    <img src={poster} alt="handphone.png" />
                </div>
            </div>
        </main>
    )
}

export default Signin