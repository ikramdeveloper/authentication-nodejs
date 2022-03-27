const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users === data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, resp) => {
  const { username, pwd } = req.body;
  if (!username || !pwd)
    return resp
      .status(400)
      .json({ message: "Username and password are required" });

  const findUser = usersDB.users.find((user) => user.username === username);
  if (!findUser) return resp.sendStatus(401);

  const matchPwd = await bcrypt.compare(pwd, findUser.password);
  if (matchPwd) {
    resp.status(200).json({ message: "User successfully logged in" });
  } else {
    resp.sendStatus(401);
  }
};

module.exports = { handleLogin };
