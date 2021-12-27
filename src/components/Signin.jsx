import { Input, Form, Button } from "antd";
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import poster from '../assets/images/loginposter.png'
import { FirebaseSignin } from "../Firebase/signin";
const Signin = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();


    const onsubmit = (data) => {
        FirebaseSignin({data : data})

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
                    <img src={poster} alt="handphone.png" />
                </div>
            </div>
        </main>
    )
}

export default Signin