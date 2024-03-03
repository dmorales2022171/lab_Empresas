import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';

export const userPost = async (req, res) => {
    const {name, mail, password} = req.body;
    const user = new User({name, mail, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        msg: "the user has been created",
        user
    })
}