import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forget = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request password reset link'
    })
    const { email,  buttonText } = values;
    // console.log(values)
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Requesting' })
        axios({
            method: 'PUT',
            // server -route path in put 
            url: `${process.env.REACT_APP_API}/forget-password`,
            data: { email }
        }).then((res) => {
            console.log('REQUEST SUCCESS', res)
                setValues({ ...values,  email: '', buttonText: 'Submitted' })
                toast.success(res.data.message)
              
           
        }).catch((error) => {

            console.log('FORGOT PASSWORD ERROR', error)
            setValues({ ...values, buttonText: 'Request password reset link' })
            toast.error(error.response.data.error)
        })
    
    }
    
    const ForgetPasswordForm = () => {
        return (
            <>
                <form>
                    <div className="main_div">
                        <div className="box">


                            <div className="inputBox">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    value={email}
                                    required />
                                <label>Email</label>
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
                <h1 className="p-5 text-center">Forget</h1>
                {ForgetPasswordForm()}
            </div>
        </Layout>
    )
}
export default Forget;