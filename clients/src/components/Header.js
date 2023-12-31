import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuth, signout } from '../auth/helpers'

const Header = ({ children, history, match }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    }
    return (
        <>
            <div className="header-component">
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive('/')}>
                            Home
                        </Link>
                    </li>

                    {!isAuth() && (
                        <>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                                    Signin

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuth() && isAuth().role === 'admin' && (
                        <li className="nav-item">

                            <Link to="/admin" className="nav-link" style={isActive('/admin')} >
                                My Account

                            </Link>
                        </li>
                    )}

                    {isAuth() && isAuth().role === 'subscriber' && (
                        <li className="nav-item">
                            <Link to="/private" className="nav-link" style={isActive('/private')} >
                                My Account

                            </Link>
                        </li>
                    )}
                    {
                        isAuth() && (
                            <>

                                <li className="nav-item">
                                        <Link to="/about" className="nav-link" style={isActive('/about')} >
                                            About

                                        </Link>
                                </li>

                                <li className="nav-item">
                                    <span className="nav-link"
                                        style={{ cursor: 'pointer', color: '#fff' }}
                                        onClick={
                                            () => signout(() => {
                                                history.push('/')
                                            })
                                        }
                                    >
                                        Signout
                                    </span>
                                </li>
                            </>
                        )}
                </ul>
            </div>
        </>
    )
}

export default withRouter(Header)