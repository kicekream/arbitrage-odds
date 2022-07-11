const  { User }  = require('../models');

class UserRepo {
    static async create (newUser) {
        const user = await User.create(newUser);
        return user
    }

    static async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }
}

module.exports = { UserRepo } 
