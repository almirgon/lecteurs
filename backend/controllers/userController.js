let users = [
  {
    id: 1,
    username: "@almirgon",
    firstName: "Almir",
    lastName: "Crispiniano",
    email: "almir.crispiniano@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    username: "@luabdn",
    firstName: "Luana",
    lastName: "Barbosa",
    email: "lua@gmail.com",
    password: "123456",
  },
];

const getUsers = (req,res) => {
  return res.status(200).json(users);
};

const getUserById = (req, res) => {
  const {id} = req.params;
  const user = users.findIndex(item => item.id == id);
  console.log(user);
  return res.status(200).json(users[user]);
};

const createUser = (req, res) => {
  let user = req.body;
  user = { id: users.length + 1, ...user};
  users.push(user);
  return res.status(201).json(user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
