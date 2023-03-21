class UserDTO{
    constructor(user) {
        this.id = user.id;
        this.fullName = user.fullName,
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
  }

  module.exports = UserDTO;