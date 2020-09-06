  const User = require('../Models/User')
  const bcrypt = require('bcryptjs')
  const jsonToken = require('jsonwebtoken')

  const register = (req, res, next) => {
      bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
          if(err){
              res.json({
                  error: err
              })
          }
          let user = new User({
            name: req.body.name,
            surname:req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            accountNumber:req.body.accountNumber
        })
        user.save()
        .then(user => {
            res.json({
                message:'User added!'
            })
        })
        .catch(error => {
            res.json({
                message:"Error"
            })
        })
      })
  }

  const login = (req, res, next) =>{
      var username = req.body.username
      var password = req.body.password

      User.findOne({$or:[{email:username}, {phone:username}]})
      .then(user => {
          if(user){
              bcrypt.compare(password, user.password, function(err, result){
                  if(err){
                      res.json({
                          error: err
                      })
                  }
                  if(result){
                      let token = jsonToken.sign({name: user.name}, 'AzQ,PI)0(', {expiresIn: '1h'})
                      res.json({
                          message: 'login successful!',
                          token
                      })
                  }else{
                      res.json({
                          message: 'Password does not match!'
                      })
                  }
              })
          }else{
              res.json({
                  message: "User not found!"
              })
          }
      })
  }

  module.exports = {
      register, login
  }