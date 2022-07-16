const { UserRepo } = require("../repositories");
const { Response, Hash, JWT } = require("../utils");
const  { User, Transaction, Referral }  = require('../models');

module.exports = {
    register:  async (req, res) => {
        try {
            // check if the email exist
            const { firstname, lastname, email, password, refCode } = req.body;

            const userExist = await UserRepo.findByEmail(email);
            if(userExist) return Response.error(res, 409, 'Email already exist')
            // hash password
            const hashPassword = await Hash.create(password)
            // create user
            const userToCreate = {
                firstname,
                lastname,
                email,
                password: hashPassword
            };

            const newUser = await UserRepo.create(userToCreate);
            if(refCode) {
                let temp = 0;
                const referral = await User.findOne({refCode})
                if(!referral) {temp = null;}
                temp = referral?._id
                const buildRef = {
                    refCode,
                    referredBy: temp,
                    referred: newUser._id
                }
                await Referral.create(buildRef)
            }
            return Response.success(res, 201, 'Successfully created user', newUser);
        } catch (err) {
            console.log(err);
        }
    },

    login:  async (req, res) => {
        try {
            const  { email, password } = req.body;

            const userExist = await UserRepo.findByEmail(email);
            if(!userExist) return Response.error(res, 401, 'Invalid email or password');
            const isPasswordCorrect = await Hash.verify(password, userExist.password);
            if(!isPasswordCorrect) return Response.error(res, 401, 'Invalid email or password');

            const token = await JWT.sign({
                _id: userExist._id,
                email: userExist.email,
                firstname: userExist.firstname,
                lastname: userExist.lastname,
                address: userExist.trxAddress,
                isAdmin: userExist.isAdmin,
                refCode: userExist.refCode
            });
            return Response.session(res, 200, 'Successfully logged in user', token, userExist);
        } catch(err) { 
            console.log(err)
        }
    },
    me: (req, res)=> {
        console.log(req.user)
        return Response.success(res, 200, "Data Successfully fetched", req.user)
    }
}