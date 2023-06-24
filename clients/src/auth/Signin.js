import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import Layout from "../core/Layout";
import axios from 'axios'
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    })
    const { email, password, buttonText } = values;
    // console.log(values)
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        }).then((res) => {
            console.log('SIGNUP SUCCESS', res)
            // save the response (user,token) local storage/cookies
            authenticate(res, () => {
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' })
                toast.success(`HEY ${res.data.user.name}, Welcome back!`)

            }) //callback 

        }).catch((error) => {

            console.log('SIGNIN ERROR', error)
            setValues({ ...values, buttonText: 'Submit' })
            toast.error(error.response.data.error)
        })

    }

    const SigninForm = () => {
        return (
            <>
                <div className="division">
                    <div className="row">

                        <div className="col-6 mx-auto">
                            <div className="inputBox">
                                <span className="main-heading">Login form</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="myform">
                    <div className="mb-3">

                        <div className="inputBox">
                            {/* <span className="main-heading">Login</span> */}
                            <input className="form-control"
                                onChange={handleChange}
                                type="text"
                                name="email"
                                value={email}
                                placeholder="name@example.com"
                                required />
                            <label>Email</label>
                        </div>

                        <div className="inputBox">
                            <input className="form-control"
                                onChange={handleChange}
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter your password..."
                                required />
                            <label>Password</label>
                        </div>

                        <div className="my-3">
                            <button className="btn btn-block btn-primary btn-lg" onClick={clickSubmit}>
                                {buttonText}
                            </button>

                        </div>
                    </div>



                </form>
            </>)

    }
    return (
        <Layout>
            <div className="container">
                <div className="row w-100 d-flex justify-content-center align-items-center main_div">
                    <div className="col-12 col-md-8 col-xxl-5">
                        <div className="card py-3 px-2">
                            <p className="text-center my-3 text-capitalize"><span>Signin</span></p>
                            <ToastContainer />
                            {/* {JSON.stringify({  email, password })} */}
                            {isAuth() ? <Redirect to={isAuth().role === 'admin' ? '/admin' : '/private'} /> : null}
                            {SigninForm()}
                            <br />
                            <Link to="/auth/password/forget-password" className="btn btn-sm btn-outline-danger">
                                Forgot Password
                            </Link>







                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
export default Signin;