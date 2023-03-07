const userRepository = require('../repositories/user.repository')

exports.createUser = async (req,res) => {
    if(req.Password.length < 6){
        console.log('Password must be of atleast 6 characters');
    }
    const newUser = await userRepository.createUser(req);
    console.log(newUser);
}