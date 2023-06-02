const userDB = [
    {
        id: '001',
        fullName: 'Arif Hasan',
        username: 'arif',
        email: 'arif@gmail.com',
        createdAt: '2023-03-30T03:35:31.000Z',
        updatedAt: '2023-03-30T03:35:31.000Z',
    },
    {
        id: '002',
        fullName: 'Rakib Trofder',
        username: 'rakib',
        email: 'rakib@gmail.com',
        createdAt: '2023-03-29T03:12:53.000Z',
        updatedAt: '2023-03-29T07:31:37.000Z',
    },
    {
        id: '003',
        fullName: 'Tasmia Zerin',
        username: 'tasmia',
        email: 'tasmia@gmail.com',
        createdAt: '2023-03-29T09:56:57.000Z',
        updatedAt: '2023-03-29T09:56:57.000Z',
    },
    {
        id: '004',
        fullName: 'Ahmed Adnan',
        username: 'adnan',
        email: 'adnan@gmail.com',
        createdAt: '2023-03-30T04:28:25.984Z',
        updatedAt: '2023-03-30T04:28:25.984Z',
    },
    {
        id: '005',
        fullName: 'Tahmeed Mahbub',
        username: 'tahmeed',
        email: 'tahmeed@gmail.com',
        createdAt: '2023-03-30T04:28:25.984Z',
        updatedAt: '2023-03-30T04:28:25.984Z',
    },
    {
        id: '006',
        fullName: 'Ibrahim Khalil',
        username: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-30T04:28:25.984Z',
        updatedAt: '2023-03-30T04:28:25.984Z',
    },
];


const blogDB = {
    count: 4,
    rows: [
    {
        id: '100',
        title: 'Hello there',
        description: 'I am Tasmia',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        authorId: '003',
        authorFullName: 'Tasmia Zerin',
        authorUsername: 'tasmia',
        authorEmail: 'tasmia@gmail.com'
    },
    {
        id: '200',
        title: 'Hello there',
        description: 'New post from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        authorId: '002',
        authorFullName: 'rakib',
        authorUsername: 'rakib',
        authorEmail: 'rakib@gmail.com'
    },
    {
        id: '300',
        title: 'Hello there',
        description: 'New post 2 from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        authorId: '002',
        authorFullName: 'rakib',
        authorUsername: 'rakib',
        authorEmail: 'rakib@gmail.com'
    },
    {
        id: '400',
        title: 'Hello there',
        description: 'This is my new post',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        authorId: '003',
        authorFullName: 'Tasmia Zerin',
        authorUsername: 'tasmia',
        authorEmail: 'tasmia@gmail.com'
    }
]};

const blogWithAuthorDB = {
    count: 4,
    rows: [
    {
        id: '100',
        title: 'Hello there',
        description: 'I am Tasmia',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        author: {
            id: '003',
            fullName: 'Tasmia Zerin',
            username: 'tasmia',
            email: 'tasmia@gmail.com',
            createdAt: '2023-03-29T09:56:57.000Z',
            updatedAt: '2023-03-29T09:56:57.000Z',
        },
    },
    {
        id: '200',
        title: 'Hello there',
        description: 'New post from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        author: {
            id: '002',
            fullName: 'Rakib Trofder',
            username: 'rakib',
            email: 'rakib@gmail.com',
            createdAt: '2023-03-29T03:12:53.000Z',
            updatedAt: '2023-03-29T07:31:37.000Z',
        }
    },
    {
        id: '300',
        title: 'Hello there',
        description: 'New post 2 from rakib',
        createdAt: '2023-03-30T03:59:52.000Z',
        updatedAt: '2023-03-30T04:00:09.000Z',
        author: {
            id: '002',
            fullName: 'Rakib Trofder',
            username: 'rakib',
            email: 'rakib@gmail.com',
            createdAt: '2023-03-29T03:12:53.000Z',
            updatedAt: '2023-03-29T07:31:37.000Z',
        }
    },
    {
        id: '400',
        title: 'Hello there',
        description: 'This is my new post',
        createdAt: '2023-03-30T04:45:00.000Z',
        updatedAt: '2023-03-30T04:45:00.000Z',
        author: {
            id: '003',
            fullName: 'Tasmia Zerin',
            username: 'tasmia',
            email: 'tasmia@gmail.com',
            createdAt: '2023-03-29T09:56:57.000Z',
            updatedAt: '2023-03-29T09:56:57.000Z',
        },
    }
]};

test("Db connected.", ()=>{
    expect();
})

module.exports = { userDB, blogDB, blogWithAuthorDB };