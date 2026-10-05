import bycrypt from 'bcryptjs';


export const hashPassword = async(password) => {

    try{
        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        return hashPassword
    }catch(e){
        console.log(e.message);
    }
}

export const comparePassword = async(password, hashPassword) => {
    try{
        return await bycrypt.compare(password, hashPassword);
    }catch(err){
        console.log(err.message);
    }
}