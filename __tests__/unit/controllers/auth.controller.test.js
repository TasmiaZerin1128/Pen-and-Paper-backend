const authController = require('../../../controllers/auth.controller');
const authService = require('../../../services/auth.service');

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

            const expectedResponse = {
                data : {
                    success : true,
                    user : {
                    id: "2d805d2b-c234-4c3b-b574-291e82f48c5a",
                    fullName: "New User",
                    username: "newUser",
                    email: "new@gmail.com",
                    password: "$2b$10$iOFi1uxiKqlpHoZolOiPJ.tMnrHXB/qYblBkFKxlo/KkNXxl6Jte2",
                    updatedAt: "2023-00-00T00:00:00.000Z",
                    createdAt: "2023-00-00T00:00:00.000Z"
                    }
                }
            }

            const accesstoken = 'testaccess';
            const res = { cookie : jest.fn() };
            const next = jest.fn();


            jest
                .spyOn(authService, 'register')
                .mockResolvedValueOnce(expectedResponse);

            const response = await authService.register(req);

            expect(authService.register).toHaveBeenCalledTimes(1);
            expect(authService.register).toBeCalledWith(req);
            expect(response).toBe(expectedResponse);
        })
    })
})