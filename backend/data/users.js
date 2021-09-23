import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'ruhela@example.com',
    password: bcrypt.hashSync('123456', 10), //passing password and saltRounds
    isAdmin: true,
  },
  {
    name: 'Prince Ruhela',
    email: 'prince@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John Wick',
    email: 'jone@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sevel Ruhela',
    email: 'sevel@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users