import { Input, Form, Button } from "antd";
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import poster from '../assets/images/loginposter.png'

const Login = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();


    const onsubmit = (data) => {
        console.log(data);

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