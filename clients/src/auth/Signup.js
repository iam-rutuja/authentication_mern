import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import Layout from "../core/Layout";
import axios from 'axios'
import { isAuth } from "./helpers";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const { name, email, password, buttonText } = values;
    // console.log(values)
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        }).then((res) => {
            console.log('SIGNUP SUCCESS', res)
            // empty the name once we submit once with the user has been created.
            setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitting' })
            toast.success(res.data.message)
        }).catch((error) => {
            // we are sending the error message from the back end.
            // For example if the name is required password is to you know all that we
            // are sending the error message
            // so we can grab that using error dot response dot data.
            console.log('SIGNUP ERROR', error)
            setValues({ ...values, buttonText: 'Submit' })
            toast.error(error.response.data.error)
        })
    }

    const SignupForm = () => {
        return (
            <>
                <div className="division">
                    <div className="row">

                        <div className="col-6 mx-auto">
                            <div className="inputBox">
                                <span className="main-heading">Register form</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="myform">
                    <div className="mb-3">

                        <div className="inputBox">
                            <input className="form-control"
                                onChange={handleChange}
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Enter your full name"
                                required />
                            <label>Name</label>
                        </div>

                        <div className="inputBox">
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
                            <p className="text-center my-3 text-capitalize"><span>Signup</span></p>
                            <ToastContainer />
                            {isAuth() ? <Redirect to="/" /> : null}
                            {/* {JSON.stringify({ name, email, password })} */}

                            {SignupForm()}
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
export default Signup;