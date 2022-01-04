import { Input, Form, Button, Modal } from "antd";
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import poster from '../assets/images/loginposter.png'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Text from "antd/lib/typography/Text";

const Login = () => {
    const { control, handleSubmit, reset } = useForm();
    const [visible, setvisible] = React.useState(false)
    const [email, setemail] = React.useState('')


    console.log(email);


    const navigate = useNavigate()
    React.useEffect(() => {
        const authToken = sessionStorage.getItem('auth-token')
        if (authToken) {
            navigate('/')
        }

    }, [navigate])


    const resetpassword = () => {
        try {

            sendPasswordResetEmail(getAuth(), email).then((response) => {
                toast.success("Mail been Shared")
                setemail('')
                setvisible(false)
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
        } catch (error) {
            console.error(error.message);
        }
    }


    const onsubmit = (data) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, data["email"], data["password"])
            .then((response) => {
                sessionStorage.setItem('auth-token', response._tokenResponse.refreshToken)
                sessionStorage.setItem('email', data["email"])
                navigate("/")

                reset({
                    email: "",
                    password: ""
                })
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
                        <Text type="link" className="forgetpass" onClick={() => setvisible(true)} >Forget Password..?</Text><br />
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form>
                    <br />
                    <Link to="/signin" >New User...Singin Here</Link>
                </div>
                <div className="loginposter">
                    <ToastContainer />
                    <img src={poster} alt="handphone.png" />
                </div>
            </div>


            <Modal
                title="Forget Password"
                visible={visible}
                onOk={resetpassword}
                // confirmLoading={confirmLoading}
                onCancel={() => setvisible(false)}
            >
                <Form>
                    <Input value={email} placeholder="Email.." onChange={(e) => setemail(e.target.value)} required autoFocus />
                </Form>

            </Modal>


        </main>
    )
}

export default Login