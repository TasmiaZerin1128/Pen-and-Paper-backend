const userService = require('../../../services/user.service');
const userRepository = require('../../../repositories/user.repository');
const { AppError } = require("../../../utils/errorHandler");
const { userDB } = require('../mockDB');
const UserDTO = require("../../../DTOs/user.dto");
const userUtils = require('../../../utils/userValidation');
const { comparePassword } = require("../../../utils/hashPassword");
const { setLimitAndOffset } = require("../../../utils/pagination");

jest.mock('../../../utils/pagination');
jest.mock('../../../utils/hashPassword');
// jest.mock('../../../utils/userValidation');

describe('Testing User Service', () => {
    describe('Testing createUser', () => {
        it('should return the created user', async () => {
            const newUser = {
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'thisisnew',
            }

            const expectedResult = {
                id: '006',
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'herwroskpoksfofsfssfswd3',
                createdAt: '2023-03-29T03:12:53.000Z',
                updatedAt: '2023-03-29T07:31:37.000Z',
            }

            jest
                .spyOn(userRepository, 'createUser')
                .mockReturnValueOnce(expectedResult);
            
            const response = await userService.createUser(newUser);

            expect(userRepository.createUser).toBeCalledTimes(1);
            expect(userRepository.createUser).toBeCalledWith(newUser);
            expect(response).toBe(expectedResult);
        });
        it('should throw error if userRepository fails', async () => {
            const newUser = {
                fullName : 'New User',
                username : 'newUser',
                email : 'new@gmail.com',
                password : 'thisisnew',
            }
            const expectedError = new Error('Something went wrong!');

            jest
                .spyOn(userRepository, 'createUser')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.createUser(newUser)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing get all users', () => {
        it('should return a users list', async () => {
            const pageSize = 5;
            const pageNumber = 1;
            const limit = pageSize;
            const offset = (pageNumber - 1)*pageSize;

            setLimitAndOffset.mockReturnValueOnce({limit, offset});

            jest
                .spyOn(userRepository, 'getAllUsers')
                .mockImplementation((limit, offset) => {
                    return userDB.slice(offset, offset + limit);
                });
            
            const expectedUserList = [];
            userDB.forEach((element) => {
                expectedUserList.push(new UserDTO(element));
            });    
            
            const response = await userService.getAllUsers(pageSize, pageNumber);

            expect(userRepository.getAllUsers).toBeCalledTimes(1);
            expect(userRepository.getAllUsers).toBeCalledWith(limit, offset);
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
        });
        it('should return a users list using default limit offset if invalid page size and number are given', async () => {
            const pageSize = null;
            const pageNumber = null;
            const limit = 3;
            const offset = (1 - 1)*3;

            setLimitAndOffset.mockReturnValueOnce({limit, offset});

            jest
                .spyOn(userRepository, 'getAllUsers')
                .mockImplementation((limit, offset) => {
                    return userDB.slice(offset, offset + limit);
                });
            
            const expectedUserList = [];
            userDB.forEach((element) => {
                expectedUserList.push(new UserDTO(element));
            });    
            
            const response = await userService.getAllUsers(pageSize, pageNumber);

            expect(userRepository.getAllUsers).toBeCalledTimes(1);
            expect(userRepository.getAllUsers).toBeCalledWith(limit, offset);
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
        });
        it('should throw error if userRepository fails', async () => {
            const pageSize = 5;
            const pageNumber = 1;
            const limit = pageSize;
            const offset = (pageNumber - 1)*pageSize;
            const expectedError = new Error('Something went wrong!');

            setLimitAndOffset.mockReturnValueOnce({limit, offset});
            
            jest   
                .spyOn(userRepository, 'getAllUsers')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.getAllUsers(limit, offset)).rejects.toThrow(expectedError);
        })
    });;

    describe('Testing get User by username', () => {
        it('should return the user if exists', async () => {
            const username = 'tasmia';
            const expectedResult = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                email: 'tasmia@gmail.com',
                password: '123456',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }

            jest   
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValueOnce(expectedResult);
            const response = await userService.getUserByUsername(username);

            expect(userRepository.getUserByUsername).toBeCalledTimes(1);
            expect(userRepository.getUserByUsername).toBeCalledWith(username);
            expect(response).toBe(expectedResult);
        });
        it('should throw error if userRepository fails', async () => {
            const username = 'tasmia';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(userRepository, 'getUserByUsername')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.getUserByUsername(username)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing get UserDTO by username', () => {
        it('should return the user using DTO if exists', async () => {
            const username = 'tasmia';
            const expectedResult = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                email: 'tasmia@gmail.com',
                password: '123456',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }
            const expectedResultDTO = userDB[2];

            jest   
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValueOnce(expectedResult);
            
            const response = await userService.getUserDTOByUsername(username);

            expect(userRepository.getUserByUsername).toBeCalledTimes(1);
            expect(userRepository.getUserByUsername).toBeCalledWith(username);
            expect(response).toEqual(expectedResultDTO);
        });
        it('should throw error if userRepository fails', async () => {
            const username = 'tasmia';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(userRepository, 'getUserByUsername')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.getUserDTOByUsername(username)).rejects.toThrow(expectedError);
        });
        it('should throw error if no user is found', async () => {
            const username = 'noUser';
            const expectedError = new AppError('User not found');

            jest   
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValueOnce(null);
            
            await expect(userService.getUserDTOByUsername(username)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing get User by Email', () => {
        it('should return the user if exists', async () => {
            const email = 'tasmia@gmail.com';
            const expectedResult = userDB[2];

            jest   
                .spyOn(userRepository, 'getUserByEmail')
                .mockReturnValueOnce(expectedResult);
            
            const response = await userService.getUserByEmail(email);

            expect(userRepository.getUserByEmail).toBeCalledTimes(1);
            expect(userRepository.getUserByEmail).toBeCalledWith(email);
            expect(response).toBe(expectedResult);
        });
        it('should throw error if userRepository fails', async () => {
            const email = 'tasmia@gmail.com';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(userRepository, 'getUserByEmail')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.getUserByEmail(email)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing update user', () => {
        it('should update the user and return success', async () => {
        const username = 'tasmia';
        const userToUpdate = { oldPassword : '123456', newPassword: '123123' };

        const expectedResult = {
            id: '003',
            fullName: 'Tasmia Zerin',
            username: 'tasmia',
            email: 'tasmia@gmail.com',
            password: '123456',
            createdAt: '2023-03-29T09:56:57.000Z',
            updatedAt: '2023-03-29T09:56:57.000Z',
        }

        jest
            .spyOn(userUtils, 'checkPasswordValid')
            .mockReturnValueOnce(true);

        jest
            .spyOn(userRepository, 'getUserByUsername')
            .mockResolvedValueOnce(expectedResult);

        comparePassword.mockReturnValueOnce(true);
        
        jest
            .spyOn(userRepository, 'updateUser')
            .mockReturnValueOnce([1]);

        const response = await userService.updateUser(username, userToUpdate);
        expect(userRepository.updateUser).toBeCalledTimes(1);
        expect(userRepository.updateUser).toHaveBeenCalledWith(username, userToUpdate.newPassword);
        expect(response).toEqual([1]);

        });
        it('should throw an error if password is invalid', async () => {
            const username = 'tasmia';
            const userToUpdate = { oldPassword : '123456', newPassword: '123' };

            const expectedError = new AppError('Password must contain atleast 6 characters');

            jest
            .spyOn(userUtils, 'checkPasswordValid')
            .mockReturnValueOnce(false);

            await expect(userService.updateUser(username, userToUpdate)).rejects.toThrow(expectedError);
        });
        it('should throw an error if user does not exist', async () => {
            const username = 'noUser';
            const userToUpdate = { oldPassword : '123456', newPassword: '123' };

            const expectedError = new AppError('User does not exist');

            jest
                .spyOn(userUtils, 'checkPasswordValid')
                .mockReturnValueOnce(true);

            jest
                .spyOn(userRepository, 'getUserByUsername')
                .mockResolvedValueOnce(null);

            await expect(userService.updateUser(username, userToUpdate)).rejects.toThrow(expectedError);
        });
        it('should throw an error if user update fails', async () => {
            const username = 'tasmia';
            const userToUpdate = { oldPassword : '123456', newPassword: '123123' };

            const expectedResult = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                email: 'tasmia@gmail.com',
                password: '123456',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }

            const expectedError = new AppError('User could not be updated');

            jest
                .spyOn(userUtils, 'checkPasswordValid')
                .mockReturnValueOnce(true);

            jest
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValueOnce(expectedResult);

            comparePassword.mockReturnValueOnce(true);
            
            jest
                .spyOn(userRepository, 'updateUser')
                .mockReturnValueOnce([0]);

            await expect(userService.updateUser(username, userToUpdate)).rejects.toThrow(expectedError);
        })
    });

    describe('Testing delete user', () => {
        it('should delete the user and return success', async () => {
            const username = 'tasmia';

            jest   
                .spyOn(userRepository, 'deleteUser')
                .mockReturnValueOnce(true);

            const response = await userService.deleteUser(username);

            expect(userRepository.deleteUser).toBeCalledTimes(1);
            expect(userRepository.deleteUser).toBeCalledWith(username);
            expect(response).toEqual(true);
        });
        it('should throw error if userRepository fails', async () => {
            const username = 'tasmia';
            const expectedError = new Error('Something went wrong!');

            jest   
                .spyOn(userRepository, 'deleteUser')
                .mockRejectedValueOnce(expectedError);
            
            await expect(userService.deleteUser(username)).rejects.toThrow(expectedError);
        });
        it('should throw error if no user is found', async () => {
            const username = 'noUser';
            const expectedError = new AppError('User not found');

            jest   
                .spyOn(userRepository, 'deleteUser')
                .mockReturnValueOnce(false);
            
            await expect(userService.deleteUser(username)).rejects.toThrow(expectedError);
        });
    });
})