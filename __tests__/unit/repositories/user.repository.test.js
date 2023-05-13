const userRepository = require('../../../repositories/user.repository');
const User = require('../../../models/user.model');
const { userDB } = require('../mockDB');
const userRegisterDTO = require("../../../DTOs/userRegister.dto");
const { SequelizeValidationError } = require("../../../utils/errorHandler");

class createNewUser {
    constructor(newUser) {
        this.id = '89b4bca8-c564-45ea-a1a6-8662d4bb2fe2',
        this.fullName = newUser.fullName;
        this.username = newUser.username;
        this.password = newUser.password;
        this.createdAt = '2023-03-30T03:35:31.000Z',
        this.updatedAt = '2023-03-30T03:35:31.000Z';
    }
}

describe('Testing User Repository', () => {
    describe('Testing get all users', () => {
    it('should return array of all users', async () => {
 
        const limit = 3;
        const offset = 1;
        jest
            .spyOn(User, 'findAll')
            .mockImplementation(({limit, offset}) => {
                return userDB.slice(offset, offset + limit)
            });

        const response = await userRepository.getAllUsers(limit, offset);

        expect(User.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                limit, offset
            })
        );
        expect(response).toHaveLength(limit);
        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    fullName: expect.any(String),
                    username: expect.any(String),
                    email: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ])
        );
    }),

    it('should throw an error if database query fails', async () => {
        const limit = 3;
        const offset = 1;
        const error = new Error('Error in getting all users');
        jest
            .spyOn(User, 'findAll')
            .mockRejectedValueOnce(error);

        await expect(userRepository.getAllUsers(limit, offset)).rejects.toThrow(error);
    })
});

    describe('Testing get user by username', () => {
        it('should get a user by username', async () => {
            const username = 'tasmia';
            const expectedData = userDB[2];

            jest
                .spyOn(User, 'findOne').mockResolvedValueOnce(expectedData);
            
            const response = await userRepository.getUserByUsername(username);

            expect(User.findOne).toBeCalledTimes(1);
            expect(User.findOne).toBeCalledWith(
                { where : { username: username.toLowerCase() } }
            );
            expect(response).toEqual(expectedData);  
        });
        it('should return null when no user found', async () => {
            const username = 'noUser';

            jest
                .spyOn(User, 'findOne').mockReturnValue(null);
            
                const response = await userRepository.getUserByUsername(username);

            expect(User.findOne).toBeCalledTimes(1);
            expect(User.findOne).toBeCalledWith(
                { where : { username: username.toLowerCase() } }
            );
            expect(response).toEqual(null);  
        })
    });

    describe('Testing get user by email', () => {
        it('should get a user by email', async () => {
            const email = 'tasmia@gmail.com';
            const expectedData = userDB[2];

            jest
                .spyOn(User, 'findOne').mockResolvedValueOnce(expectedData);
            
            const response = await userRepository.getUserByEmail(email);

            expect(User.findOne).toBeCalledTimes(1);
            expect(User.findOne).toBeCalledWith(
                { where : { email: email } }
            );
            expect(response).toEqual(expectedData);  
        });
        it('should return null when no user found', async () => {
            const email = 'tasmia@gmail.com';
            jest
                .spyOn(User, 'findOne').mockReturnValue(null);
            
            const response = await userRepository.getUserByEmail(email);

            expect(User.findOne).toBeCalledTimes(1);
            expect(User.findOne).toBeCalledWith(
                { where : { email: email} }
            );
            expect(response).toEqual(null);  
        })
    });

    describe('Testing update user by username', () => {
        it('should update a user and return 1', async () => {
            const username = 'tasmia';
            const updatedPassword = 'newPassword';

            jest
                .spyOn(User, 'update').mockResolvedValue(1);

            const response = await userRepository.updateUser(username, updatedPassword);

            expect(User.update).toBeCalledWith(
                { password: updatedPassword },
                { where: { username: username.toLowerCase() },
                individualHooks: true
            });
            expect(response).toBe(1);
        });
        it('should return 0 if no user found', async () => {
            const username = 'noUser';
            const updatedPassword = 'newPassword';

            jest
                .spyOn(User, 'update').mockResolvedValue(0);

            const response = await userRepository.updateUser(username, updatedPassword);

            expect(User.update).toBeCalledWith(
                { password: updatedPassword },
                { where: { username: username.toLowerCase() },
                individualHooks: true
            });
            expect(response).toBe(0);
        })
    })

    describe('Testing delete a user', () => {
        it('should delete a user by username', async () => {
            const username = 'tasmia';
            jest
                .spyOn(User, 'destroy')
                .mockResolvedValueOnce(1);

            const response = await userRepository.deleteUser(username);

            expect(User.destroy).toHaveBeenCalledWith({
                where: { username: username.toLowerCase() },
            });
            expect(response).toBe(1);
        });
        it('should return 0 if user not found', async () => {
            const username = 'notListedUser';
            jest
                .spyOn(User, 'destroy')
                .mockResolvedValueOnce(0);

            const response = await userRepository.deleteUser(username);

            expect(User.destroy).toHaveBeenCalledWith({
                where: { username: username.toLowerCase() },
            });
            expect(response).toBe(0);
        });
    });

    describe('Testing create a user', () => {
        it('should create a user and return it', async () => {
            const user = { 
                fullName: 'new name',
                username: 'newUser',
                email: 'new@gmail.com', 
                password: '123456'
            };

            const userToRegister = new userRegisterDTO(user);
            const returnNewUser = new createNewUser(userToRegister);
            jest
                .spyOn(User, 'create')
                .mockResolvedValue(returnNewUser);
            
            const response = await userRepository.createUser(userToRegister);
            console.log(response);

            expect(User.create).toBeCalledTimes(1);
            expect(User.create).toBeCalledWith(userToRegister);
            expect(response).toBe(returnNewUser);
        });
        it('should throw sequelize validation error', async () => {
            const expectedError = new Error('Any sequelize validation error');
            expectedError.errors = [{ message: 'sequelize validation error' }]

            const user = { 
                fullName: 'new name',
                username: 'newUser',
                email: 'new', 
                password: '123456'
            };

            const userToRegister = new userRegisterDTO(user);

            jest
                .spyOn(User, 'create')
                .mockRejectedValueOnce(expectedError);
               
            await expect(
                userRepository.createUser(userToRegister)
            ).rejects.toThrow(new SequelizeValidationError(expectedError, 400));
        })
    })
});