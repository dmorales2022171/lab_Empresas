import User from '../users/user.model.js';

export const existsMail = async ( mail = '') =>{
    const existsMail = await User.findOne({mail});
    if(existsMail){
        throw new Error (`the mail ${mail} has already been registered`)
    }
}