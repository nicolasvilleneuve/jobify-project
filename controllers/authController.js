import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";

const register = async (req, res) => {

    const user = await User.create(req.body);
    res.status(StatusCodes.OK).json({user});

};
const login = async (req, res) => {
  res.send('logged in user')
};
const updateUser = async (req, res) => {
  res.send('Updated user')
};

export {register, login, updateUser};