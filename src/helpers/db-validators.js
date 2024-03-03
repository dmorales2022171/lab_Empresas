import User from '../users/user.model.js';
import Company from '../companies/company.model.js'

export const existsMail = async ( mail = '') =>{
    const existsMail = await User.findOne({mail});
    if(existsMail){
        throw new Error (`the mail ${mail} has already been registered`)
    }
}

export const existsCompany = async (id = '') => {
    const existsCompany = await Company.findById(id);
    if(!existsCompany){
        throw new Error(`the ID: ${id} not exists`);
    }
}