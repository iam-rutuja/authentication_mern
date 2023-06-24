import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import Layout from "../core/Layout";
import axios from 'axios'
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
    });
    
    useEffect(() => {
        let token = match.params.token;
        // console.log(match)
        // console.log(token)
        let { name } = jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
    }, [])

    const { name, token, show } = values;

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token }
        }).then((res) => {
            console.log('ACCOUNT ACTIVATION', res);
            setValues({ ...values, show: false });
            toast.success(res.data.message);
        }).catch((error) => {

            console.log('SIGNUP ERROR', error)
            console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
            toast.error(error.response.data.error);
        });
    };

   

    const activationLink = () => {
        return (
            <div>
                <h1>Hey {name} ,ready to activate your account? </h1>
                <button onClick={clickSubmit}>Activate Account</button>
            </div>
        )
    }

    return (
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    )
}
export default Activate ;