const userDB = [
    {
        id: '89b4bca8-c564-45ea-a1a6-8662d4bb2fe2',
        fullName: 'Arif Hasan',
        username: 'arif',
        email: 'arif@gmail.com',
        createdAt: '2023-03-30T03:35:31.000Z',
        updatedAt: '2023-03-30T03:35:31.000Z',
    },
    {
        id: 'd49432fb-ed08-4a64-a96e-46e16253dd28',
        fullName: 'rakib',
        username: 'rakib',
        email: 'rakib@gmail.com',
        createdAt: '2023-03-29T03:12:53.000Z',
        updatedAt: '2023-03-29T07:31:37.000Z',
    },
    {
        id: 'd4add3fa-3a29-4c41-9f74-a6fe88448370',
        fullName: 'Tasmia Zerin',
        username: 'tasmia',
        email: 'tasmia@gmail.com',
        createdAt: '2023-03-29T09:56:57.000Z',
        updatedAt: '2023-03-29T09:56:57.000Z',
    },
    {
        id: '2102a756-d773-4877-af19-cebbaf5f6978',
        fullName: 'Ahmed Adnan',
        username: 'adnan',
        email: 'adnan@gmail.com',
        createdAt: '2023-03-30T04:28:25.984Z',
        updatedAt: '2023-03-30T04:28:25.984Z',
    },
];


const blogDB = [
    {
        id: '73a7f303-cbad-4ea8-a5fd-f51f4bae1aa2',
        title: 'Hello there',
        description: 'I am Tasmia',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        authorId: 'd44add3fa-3a29-4c41-9f74-a6fe88448370',
        authorFullName: 'Tasmia Zerin',
        authorUsername: 'tasmia',
        authorEmail: 'tasmia@gmail.com'
    },
    {
        id: '0eebcbb7-5272-40aa-bbb6-79fbbdda49bb',
        title: 'Hello there',
        description: 'New post from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        authorId: 'd49432fb-ed08-4a64-a96e-46e16253dd28',
        authorFullName: 'rakib',
        authorUsername: 'rakib',
        authorEmail: 'rakib@gmail.com'
    },
    {
        id: '32cd7049-6f08-48bf-a09b-f69ebce4973a',
        title: 'Hello there',
        description: 'New post 2 from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        authorId: 'd49432fb-ed08-4a64-a96e-46e16253dd28',
        authorFullName: 'rakib',
        authorUsername: 'rakib',
        authorEmail: 'rakib@gmail.com'
    },
    {
        id: 'd309b3b8-63d6-47d2-84e7-bed2ae0d10f0',
        title: 'Hello there',
        description: 'This is my new post',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        authorId: 'd44add3fa-3a29-4c41-9f74-a6fe88448370',
        authorFullName: 'Tasmia Zerin',
        authorUsername: 'tasmia',
        authorEmail: 'tasmia@gmail.com'
    }
];

test("Db connected.", ()=>{
    expect();
})

module.exports = { userDB, blogDB };