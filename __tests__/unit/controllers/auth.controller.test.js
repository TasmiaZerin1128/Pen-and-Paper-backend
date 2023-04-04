const authController = require('../../../controllers/auth.controller');
const authService = require('../../../services/auth.service');
const { sendToken, removeToken } = require('../../../utils/jwtToken');
const { sendResponse } = require('../../../utils/contentNegotiation');
const { AppError } = require("../../../utils/errorHandler");
const { userValidator } = require('../../../utils/userValidation');

jest.mock('../../../utils/jwtToken');
jest.mock('../../../utils/contentNegotiation');
jest.mock('../../../services/auth.service');
jest.mock('../../../utils/userValidation');

describe('Testing Auth Controller functionalities', () => {
    describe('Testing register function', () => {
        it('should call authService.register then return a new user', async () => {
            const req = {
                body : {
                    fullName : 'New User',
                    username : 'newUser',
                    email : 'new@gmail.com',
                    password : 'thisisnew',
                }
            }

            const newUser = {
                id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
                fullName: "New User",
                username: "newUser",
                email: "new@gmail.com",
                password: "newpassword",
                updatedAt: "2023-00-00T00:00:00.000Z",
                createdAt: "2023-00-00T00:00:00.000Z"
            }
            
            const accesstoken = 'testaccess';
            const res = { cookie : jest.fn() };
            const next = jest.fn();

            const contentNegotiateResponse = {
                success: true,
                user: newUser,
                accesstoken
            }

            userValidator.mockReturnValueOnce({valid:true, message:'Credentials are valid'});
            authService.register.mockResolvedValueOnce(newUser);

            sendToken.mockReturnValueOnce(accesstoken);

            sendResponse.mockReturnValueOnce(contentNegotiateResponse);

            const response = await authController.register(req, res, next);
            console.log(response);

            expect(authService.register).toHaveBeenCalledTimes(1);
            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(res.cookie).toHaveBeenCalledTimes(1);
            expect(res.cookie).toHaveBeenCalledWith('jwt', accesstoken, { httpOnly: true });
            expect(response).toEqual(contentNegotiateResponse);
        });

        it('should throw appError if any user input is invalid', async () => {
            const req = { body : { } };
            const res = { };
            const next = jest.fn();

            errorMessage = 'Please enter all the fields';

            userValidator.mockReturnValueOnce({valid:false, message:errorMessage});
            
            await authController.register(req, res, next);
            expect(next).toHaveBeenCalledWith(
                new AppError(errorMessage, 400, false)
                );
        });

        it('should send the error to next if authService.register throws an error', async () => {
            const req = {
                body : {
                    fullName : 'New User',
                    username : 'newUser',
                    email : 'new@gmail.com',
                    password : 'thisisnew',
                }
            }
            const res = { };
            const next = jest.fn();

            const expectedError = new Error('Something went wrong');

            userValidator.mockReturnValueOnce({valid:true, message:'Credentials are valid'});
            authService.register.mockRejectedValueOnce(expectedError);

            await authController.register(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
    });

    describe('Testing login function', () => {
        it('should call authService.login and return response with token', async () => {
            const req = {
                body : {
                    username : 'oldUser',
                    password : 'thisisold',
                }
            }

            const accesstoken = 'testaccess';
            const res = { cookie : jest.fn() };
            const next = jest.fn();

            const expectedUser = {
                id: '005',
                fullName: 'Old User',
                username: 'oldUser',
                email: 'old@gmail.com',
                createdAt: '2023-03-30T04:28:25.984Z',
                updatedAt: '2023-03-30T04:28:25.984Z',
            }

            const contentNegotiateResponse =  {
                success: true,
                message: 'User logged in successfully',
                accesstoken
            }

            authService.login.mockResolvedValueOnce(expectedUser);

            sendToken.mockReturnValueOnce(accesstoken);

            sendResponse.mockReturnValueOnce(contentNegotiateResponse);

            const response = await authController.login(req, res, next);

            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(authService.login).toHaveBeenCalledWith(req.body);
            expect(res.cookie).toHaveBeenCalledTimes(1);
            expect(res.cookie).toHaveBeenCalledWith('jwt', accesstoken, { httpOnly: true });
            expect(response).toBe(contentNegotiateResponse);
        });

        it('should throw appError if any user input is invalid', async () => {
            const req = { body : { } };
            const res = { };
            const next = jest.fn();

            errorMessage = 'All fields are required!';

            await authController.login(req, res, next);
            expect(next).toHaveBeenCalledWith(
                new AppError(errorMessage, 400, false)
            );
        });

        it('should send the error to next if authService.login throws an error', async () => {
            const req = {
                body : {
                    username : 'oldUser',
                    password : 'thisisold',
                }
            }
            const res = { };
            const next = jest.fn();

            const expectedError = new Error('Something went wrong');
            authService.login.mockRejectedValueOnce(expectedError);

            await authController.login(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
    });

    describe('Testing logout', () => {
        it('should log out a user and remove token', async () => {
            const req = {};
            const res = { cookie: 'logincookie' };
            const contentNegotiateResponse = {
                success: true,
                message: "Logged Out"
            }

            removeToken.mockResolvedValueOnce(res);

            sendResponse.mockReturnValueOnce(contentNegotiateResponse);
            
            const response = await authController.logout(req, res);

            expect(sendResponse).toBeCalledTimes(1);
            expect(removeToken).toBeCalledWith(res);
            expect(response).toBe(contentNegotiateResponse);
        });
    })
})