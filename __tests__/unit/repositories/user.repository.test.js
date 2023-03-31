const userRepository = require('../../../repositories/user.repository');
const User = require('../../../models/user.model');
const { userDB } = require('../mockDB');

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
        expect(response.length).toBe(limit);
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

    describe('Testing get a user', () => {
        it('should get a user by username', async () => {
            const username = 'tasmia';
            jest
                .spyOn(User, 'findOne')
                
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
    })
});