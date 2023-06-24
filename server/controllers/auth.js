
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
const expressJwt = require('express-jwt');
const _ = require('lodash');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                error: "user exist"
            })
        }

        // let newUser = new User({ name, email, password })
        // newUser.save();
        // res.status(200).json({
        //     message: "user saved successfully"
        // })



        else {
            let token = jwt.sign({ name, email, password }, process.env.SIGNUP_SECRET_KEY, { expiresIn: '10m' });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rutujayadav17@gmail.com',
                    pass: 'mkihzotxehphikhk'
                }
            });
            var mailOptions = {
                from: 'rutujayadav17@gmail.com',
                to: email,
                subject: 'Account activation link',
                html: `
                    <h1>Please use the following link to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    <hr/>
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({
                        message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
                        token
                    })
                }
            });
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "signup error"
        })

    }


}
exports.accountActivation = async (req, res) => {
    const { token } = req.body

    if (token) {
        jwt.verify(token, process.env.SIGNUP_SECRET_KEY, (err, decode) => {
            if (err) {
                console.log("JWT ACCOUNT VERIFICATION ERROR ", err)
                return res.status(401).json({
                    error: 'Expired link .Signup again'
                })
            }



            try {
                let { name, email, password } = jwt.decode(token)
                let user = new User({ name, email, password });
                user.save()
                res.status(200).json({
                    message: 'Signup success.Please signin',
                })

            } catch (error) {
                res.status(400).json({
                    error: 'Error saving user in database. Try signup again'
                })
            }

        })
        // If somebody is trying to somehow get to this point without having the token then we can also send the error message.
    } else {
        return res.json({
            message: 'Something went wrong !no token'
        })
    }
}

exports.signin = async (req, res) => {

    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email })
        if (user) {
            let isMatch = await bcrypt.compare(password, user.password)
            console.log(user)
            if (isMatch) {
                
                let token = jwt.sign({ _id: user._id }, process.env.SIGNIN_SECRET_KEY, { expiresIn: '7d' })
                const { _id, name, email, role } = user;
                res.status(200).json({
                    token,
                    message: 'Signin Sucess',
                    user: { _id, name, email, role }
                })
            }else{
                res.status(400).json({
                    error: 'Password or email doest not matach'
                })
            }

        } else {
            res.status(400).json({
                error: 'User not found'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
exports.requireSign = expressJwt({
    secret: process.env.SIGNIN_SECRET_KEY,
    algorithms: ['HS256']
})
// ===========itsss wrong ==============
exports.adminMiddleware = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if (user.role !== 'admin') {
            return res.status(400).json({
                error: ' Admin resource Access Denied'
            })
        }
        // if its admin 
        req.profile = user;
        next();

    } catch (error) {
        res.status(500).send(error)

    }
}

exports.forgetPassword = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            // we generated token with user I.D.and name and the secret key.
            let token = jwt.sign({ _id: user._id, name: user.name }, process.env.RESET_PASSWORD_SECRET_KEY, { expiresIn: '10m' });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rutujayadav17@gmail.com',
                    pass: 'mkihzotxehphikhk'
                }
            });
            var mailOptions = {
                from: 'rutujayadav17@gmail.com',
                to: email,
                subject: 'Password Reset link',
                html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                    <hr/>
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
            };

            //     transporter.sendMail(mailOptions, function (error, info) {
            //         if (error) {
            //             console.log(error);
            //         } else {
            //             res.status(200).json({
            //                 message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
            //                 token
            //             })
            //         }
            //     });
            // }

            // same accountActivation change - resetPsswordLink<=token

            let updatedData = await user.updateOne({ resetPasswordLink: token })
            if (updatedData) {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).json({
                            message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
                            token
                        })
                    }
                });
            }
            else {
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            }
        }
        else {
            res.status(400).json({
                error: 'User with that email does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong!!"
        })
    }
}




//same accountActivation change - resetPsswordLink

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.RESET_PASSWORD_SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: 'Expired link. Try again later'
                })
            }

            const { _id } = jwt.decode(resetPasswordLink);
      
            let saveUser = await User.findById(_id);
            if (!saveUser) {

                res.status(400).json({
                    error: "USER NOT FOUND"
                })


            }
            else {
                console.log(saveUser)
                let updatedUserData = {
                    password: newPassword,
                    resetPasswordLink: ""

                }

                saveUser = _.extend(saveUser, updatedUserData);
                saveUser.save()
                res.json({
                    message: `Great! Now you can login with your new password`
                });

            }

        })
    }
}