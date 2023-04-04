const userController = require('../../../controllers/user.controller');
const userService = require('../../../services/user.service');
const { sendResponse } = require('../../../utils/contentNegotiation');
const { AppError } = require("../../../utils/errorHandler");
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

        
    })
})