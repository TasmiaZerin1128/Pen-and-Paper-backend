class UserDTO{
    constructor(user) {
        this.users = [];
        user.forEach(element => {
            let newUser = {
                id : element.id,
                username : element.username,
                email : element.email,
                createdAt : element.createdAt,
                updatedAt : element.updatedAt
            }
            this.users.push(newUser);
        });

    }
  }

  module.exports = UserDTO;