const userController = require('../../../controllers/user.controller');
const userService = require('../../../services/user.service');
const { sendResponse } = require('../../../utils/contentNegotiation');
const { userDB } = require('../mockDB');


jest.mock('../../../utils/contentNegotiation');

describe('Testing userController module', () => {
    describe('Testing get all users', () => {
        it('should return all users in response', async () => {
            const req = {
                query: {
                    pageSize: 3,
                    pageNumber: 1
                }
            };

            const res = {};
            const next = jest.fn();

            jest
                .spyOn(userService, 'getAllUsers')
                .mockReturnValueOnce(userDB);

            sendResponse.mockReturnValueOnce(userDB);

            response = await userController.getAllUsers(req, res, next);

            expect(userService.getAllUsers).toBeCalledTimes(1);
            expect(response).toBe(userDB);
            expect(userService.getAllUsers).toHaveBeenCalledWith(req.query.pageSize, req.query.pageNumber);
        });

        it('should throw an error if userService call fails', async () => {

            const req = {
                query: {
                    pageSize: 3,
                    pageNumber: 1
                }
            };

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(userService, 'getAllUsers')
                .mockRejectedValueOnce(expectedError);

            await userController.getAllUsers(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
    });

    describe('Testing get User by Username', () => {
        it('should return the user if username exists', async () => {
            const req = {
                params: {
                    username: 'tasmia'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedUser = userDB[2];

            jest
                .spyOn(userService, 'getUserDTOByUsername')
                .mockReturnValueOnce(expectedUser);

            sendResponse.mockReturnValueOnce(expectedUser);

            response = await userController.getUserByUsername(req, res, next);

            expect(userService.getUserDTOByUsername).toBeCalledTimes(1);
            expect(response).toBe(expectedUser);
            expect(userService.getUserDTOByUsername).toHaveBeenCalledWith(req.params.username);
        });
        it('should throw an error if userService call fails', async () => {

            const req = {
                params: {
                    username: 'tasmia'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(userService, 'getUserDTOByUsername')
                .mockRejectedValueOnce(expectedError);

            await userController.getUserByUsername(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    });

    describe('Testing update User by Username', () => {
        it('should update the user if exists and return 1', async () => {
            const req = {
                body: {
                    password: '123456'
                },
                params: {
                    username: 'tasmia'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedResponse = { data : 'User updated' };

            jest
                .spyOn(userService, 'updateUser')
                .mockReturnValueOnce(expectedResponse);

            sendResponse.mockReturnValueOnce(expectedResponse);

            response = await userController.updateUserByUsername(req, res, next);

            expect(userService.updateUser).toBeCalledTimes(1);
            expect(response).toBe(expectedResponse);
            expect(userService.updateUser).toHaveBeenCalledWith(req.params.username, req.body);
        });
        it('should throw an error if userService call fails', async () => {

            const req = {
                body: {
                    password: '123456'
                },
                params: {
                    username: 'tasmia'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(userService, 'updateUser')
                .mockRejectedValueOnce(expectedError);

            await userController.updateUserByUsername(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    });

    describe('Testing delete User by Username', () => {
        it('should delete the user if exists and return 1', async () => {
            const req = {
                params: {
                    username: 'tasmia'
                }
            }
            const res = {};
            const next = jest.fn();
            const expectedResponse = { data : 'User deleted' };

            jest
                .spyOn(userService, 'deleteUser')
                .mockReturnValueOnce(expectedResponse);

            sendResponse.mockReturnValueOnce(expectedResponse);

            response = await userController.deleteUserByUsername(req, res, next);

            expect(userService.deleteUser).toBeCalledTimes(1);
            expect(response).toBe(expectedResponse);
            expect(userService.deleteUser).toHaveBeenCalledWith(req.params.username);
        });
        it('should throw an error if userService call fails', async () => {

            const req = {
                params: {
                    username: 'tasmia'
                }
            }

            const res = {};
            const next = jest.fn();

            const expectedError = new Error('Internal Server Error');

            jest
                .spyOn(userService, 'deleteUser')
                .mockRejectedValueOnce(expectedError);

            await userController.deleteUserByUsername(req, res, next);
            expect(next).toHaveBeenCalledWith(expectedError);
        });
        
    })
})