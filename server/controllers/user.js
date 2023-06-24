const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.read = async (req, res) => {
    try {

        const userId = req.user._id;
        console.log(req.user)
        const user = await User.findById(userId).select('-password');
        if (user) {
            res.status(200).json({
                user
            })
        }
        else {
            res.status(400).json({
                error: 'User not found'
            })
        }
    } catch (error) {
        res.status(404).json({ error })
    }
}
exports.update = async (req, res) => {
    // console.log('update user',req.user,'update data', req.body)
    try {
        const { name, password } = req.body
        const userId = req.user._id;
        console.log(req.user)
        const user = await User.findById(userId)
        // .select('-password');

        if (!user) {
            return res.status(400).json({
                error: "User not Found"
            })
        }
        if (!name) {
            return res.status(400).json({
                error: "Name is requird"
            })
        } else {
            user.name = name
        }
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }

        }
        const updateUser = await user.save()
        res.status(200).json(updateUser);
        //     user.save((err, updateUser) => {
        //         if (err) {
        //             console.log('USER UPDATE ERROR', err);
        //             return res.status(400).json({
        //                 error: 'User update failed'
        //             });
        //         }
        //         // updateUser.select('-password') = undefined;
        //         res.json(updatedUser);
        //     })

        } catch (error) {
            res.status(404).json({ error })
        }

    }