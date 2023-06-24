import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });
    const token = getCookie('token')
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("PRIVATE PROFILE UPDATE", response);
            const { role, name, email } = response.data.user;
            setValues({ ...values, role, name, email })

        }).catch(error => {
            console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error)
            // token is expired and user is trying to update its profile
            if (error.response.status === 401) {
                signout(() => {
                    history.push('/')
                })
            }

        })
    }
    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');

                })
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-muted">Role</lable>
                <input defaultValue={role} type="text" className="form-control" disabled />
            </div>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input defaultValue={email} type="email" className="form-control" disabled />
            </div>

            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="container">
                <div className="row w-100 d-flex justify-content-center align-items-center main_div">
                    <div className="col-12 col-md-8 col-xxl-5">
                        <div className="card py-3 px-2">
                            <p className="text-center my-3 text-capitalize"><span>Profile update</span></p>
                            <ToastContainer />
                            {updateForm()}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Private;