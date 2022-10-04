const User = require('./models/User');
const Role = require('./models/Role');
const Column = require('./models/Column');
const Task = require('./models/Task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require('./config')

const {MongoClient} = require('mongodb');


const generateAcessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class authController {
  async createColumn(req, res) {
    const {login, board, columnName, columnId} = req.body;
    const column = new Column({login: login, board: board, columnName: columnName, tasks: [], columnId: columnId})
    await column.save();
    return res.json({message: 'Доска успешно зарегистрирована'});
  }

  async getColumns(req, res) {
    try {
      const columns = await Column.find();
      res.json(columns);
    } catch(e) {
      console.log(e);
    }
   
  }

  async getColumn(req, res) {
    try {
      const columns = await Column.find();
      res.json(columns);
    } catch(e) {
      console.log(e);
    }
  }

  async changeColumn(req, res) {
    const columnNewData = req.body;
    const columnData = await Column.find({login: columnNewData.login, board: columnNewData.board, columnId: columnNewData.columnId});
    await Column.findOneAndUpdate({columnId: columnNewData.columnId}, 
      { tasks: [...columnData[0].tasks, columnNewData.tasks]}, 
      {new: true});
    return res.json({message: 'Данные успешно обновлены'});
  }

  async delTask(req, res) {
    const columnNewData = req.body; 
    const columnData = await Column.find({login: columnNewData.login, board: columnNewData.board, columnId: columnNewData.columnId});
    const newArr = columnData[0].tasks.filter(task => task !== columnNewData.task);
    await Column.findOneAndUpdate({columnId: columnNewData.columnId}, 
      { tasks: newArr}, 
      {new: true});
    return res.json({message: 'Данные успешно обновлены'});
  }

  async changeUser(req, res) {
  const userNewData = req.body;
  const userInfo = await User.find({username: userNewData.login});
  
  await User.findOneAndUpdate({username: userNewData.login}, { boards: [...userInfo[0].boards,
    {name: userNewData.name, description: userNewData.description, id: userNewData.id, columns: userNewData.columns }]}, 
    {new: true});
  return res.json({message: 'Данные успешно обновлены'});
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors});
      }
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: 'USER'});
      const user = new User({username, password: hashPassword,boards: [], id: '', roles:[userRole.value]})
      await user.save();
      return res.json({message: 'Пользователь успешно зарегистрирован'});
    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`});
      }
      const token = generateAcessToken(user._id, user.roles);
      return res.json({token, username})

    } catch(e) {
      console.log(e);
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch(e) {

    }
  }

  async deleteColumn(req, res) {
    try {
      const delInfo = req.body;
      await Column.findOneAndDelete({login: delInfo.login, board: delInfo.board, columnId: delInfo.columnId});
      return res.json({message: 'Список успешно удален'});
    } catch(e) {
      console.log(e);
    }
  }

  async deleteBoard(req, res) {
    const infoUser = req.body; 
    
    const arrFields = await User.find({username: infoUser.username});
    const columns = await Column.remove({username: infoUser.username, board: infoUser.boardsId});
    const newArrFields = arrFields[0].boards.filter(board => infoUser.boardsId !== board.id);
    console.log(columns)
    await User.findOneAndUpdate({username: infoUser.username}, 
      { boards: newArrFields}, 
      {new: true});
    return res.json({message: 'Данные успешно обновлены'});
  }
}

module.exports = new authController();