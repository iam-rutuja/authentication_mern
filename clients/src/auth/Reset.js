import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios'
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    })
    const { name, token, newPassword, buttonText } = values;

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        // console.log(name);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);
    // console.log(values)
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Done' });
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Reset password' });
            });
    };
    const resetPasswordForm = () => {
        return (
            <>
                <form>
                    <div className="main_div">
                        <div className="box">


                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    name="newPassword"
                                    value={newPassword}
                                    placeholder="Type new password"
                                    required />
                            </div>


                            <div>
                                <button className="btnSubmit" onClick={clickSubmit}>
                                    {buttonText}
                                </button>

                            </div>
                        </div>

                    </div>

                </form>
            </>)

    }
    return (
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />
                {/* {JSON.stringify({  email, password })} */}
                <h1 className="p-5 text-center">HEY ,{name}Reset</h1>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
}
export default Reset;