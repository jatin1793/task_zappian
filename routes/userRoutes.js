const express = require("express");
const app = express.Router();
const {
  SearchUser,
  UserRegister,
  UserLogin,
  UserLogout,
  GetAllUsers,
  GetCurrentUser,
  GetUser,
  DeleteUser,
  UpdateUser,
  AddUser
} = require("../controllers/auth_controllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

app.post("/register", UserRegister);
app.post("/login", UserLogin);
app.get("/logout", isAuthenticated, UserLogout);
app.get("/get-all-users", isAuthenticated, GetAllUsers);
app.get("/get-current-user", isAuthenticated, GetCurrentUser);
app.get("/search", isAuthenticated, SearchUser);
app.get("/get-user/:userid", isAuthenticated, GetUser);
app.post("/delete-user", DeleteUser);
app.post("/update-user", UpdateUser);
app.post("/add-user", AddUser);


module.exports = app;
