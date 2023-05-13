const authService = require('../../../services/auth.service');
const userService = require('../../../services/user.service');
const { comparePassword } = require("../../../utils/hashPassword");
const { AppError } = require("../../../utils/errorHandler");
const { userDB } = require('../mockDB');
const userDTO = require("../../../DTOs/user.dto");

jest.mock('../../../utils/hashPassword');
jest.mock('../../../DTOs/user.dto');

describe('Testing Auth Service', () => {
    describe('Testing register user', () => {
        it('should send user to repository and return the result to controller', async () => {
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
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(null);
            
            jest
                .spyOn(userService, 'createUser')
                .mockReturnValueOnce(expectedResult);

            const response = await authService.register(newUser);

            expect(userService.getUserByUsername).toBeCalledTimes(1);
            expect(userService.getUserByUsername).toBeCalledWith(newUser.username);
            expect(userService.createUser).toBeCalledTimes(1);
            expect(userService.createUser).toBeCalledWith(newUser);
            expect(response).toBe(expectedResult);

        });

        it('should throw an error if any method of userService fails', async () => {
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

            const expectedError = new AppError('Something went wrong!');

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(null);
            
            jest
                .spyOn(userService, 'createUser')
                .mockRejectedValueOnce(expectedError);
            
            await expect(authService.register(newUser)).rejects.toThrow(expectedError);
        });

        it('should throw an error if duplicate username is given', async () => {
            const newUser = userDB[0];
            const oldUser = userDB[0];

            const expectedError = new AppError('Username already exists!');

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(oldUser);
            
            await expect(authService.register(newUser)).rejects.toThrow(expectedError);
        });
    });

    describe('Testing login user', () => {
        it('should return the body of user if exists', async () => {
            const loginUser = {
                username: 'tasmia',
                password: '123456'
            }
            const foundUser = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                email: 'tasmia@gmail.com',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }
            const expectedResponse = userDB[2];

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(foundUser);
            
            comparePassword.mockReturnValueOnce(true);
            userDTO.mockResolvedValueOnce(foundUser);

            const response = await authService.login(loginUser);

            expect(userService.getUserByUsername).toBeCalledTimes(1);
            expect(userService.getUserByUsername).toBeCalledWith(loginUser.username);
            expect(response).toEqual(expectedResponse);
        });
        it('should throw error if user does not exist', async () => {
            const loginUser = {
                username: 'new',
                password: '123456'
            }

            const expectedError = new AppError('Incorrect username or password');

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(null);
                
            await expect(authService.login(loginUser)).rejects.toThrow(expectedError)
        });
        it('should throw error if password not matched', async () => {
            const loginUser = {
                username: 'tasmia',
                password: '1235463'
            }

            const foundUser = {
                id: '003',
                fullName: 'Tasmia Zerin',
                username: 'tasmia',
                password: '123456',
                email: 'tasmia@gmail.com',
                createdAt: '2023-03-29T09:56:57.000Z',
                updatedAt: '2023-03-29T09:56:57.000Z',
            }

            const expectedError = new AppError('Incorrect username or password');

            jest
                .spyOn(userService, 'getUserByUsername')
                .mockReturnValueOnce(foundUser);
            
            comparePassword.mockReturnValueOnce(false);
            await expect(authService.login(loginUser)).rejects.toThrow(expectedError);
        });
    })
})

