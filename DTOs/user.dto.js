class UserDTO{
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;

        console.log(this.username);
    }
  }

  module.exports = UserDTO;