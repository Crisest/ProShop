import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: ' admin@ex.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Jhon Dow',
        email: ' jhon@ex.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Sally Dow',
        email: ' sally@ex.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users