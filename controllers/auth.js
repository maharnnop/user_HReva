const User = require("../models").User;
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const mysql = require('mysql2')
// const saltRounds = process.env.saltRounds
// const password = process.env.password

const signup = (req, res) => {
  const password = req.body.password
  // res.json({msg:req.body.password})
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, function(err, hash) {
          req.body.password = hash
          // res.json(req.body)
          User.create(req.body)
          .then((newUser) => {
      const token = jwt.sign(
        {
          user: newUser.user,
          id: newUser.id
        },
        "test_jwt",
        {
          expiresIn: "1 days",
        }
        );
        
        // res.cookie("jwt", token);
        res.json({ jwt: token });
        // res.redirect(`/users/profile/${newUser.id}`);
      })
      .catch((err) => {
        res.sendStatus(409);
      });
    });
    })

    
    
};

const login = (req, res) => {
//   const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// connection.end()
let password = req.body.password
// res.json({msg:req.body.password})
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, function(err, hash) {
         password = hash
        // res.json(req.body)
      User.findOne({
          where: {
              user: req.body.user
          }
      })
      .then(foundUser => {
        if(foundUser === null){
          return res.sendStatus(404)
        }else{
  
          if (foundUser) {
            let isMatch =  bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }
            else {
              const token = jwt.sign(
                {
                  user: foundUser.user,
                  id: foundUser.id,
                  role:foundUser.role
                },
                "test_jwt",
                {
                  expiresIn: "1 days",
                }
                )
                
                // res.cookie("jwt", token)
                res.json({"jwt": isMatch})
              }
            }
          }
          })  
  });
  })


}

// const logout = (req, res) => {
//     res.json({"jwt": null})
// }

const test = (req,res)=>{
  User.findAll().then((users) => {
    res.json(users);
  });

}

const validate  = (req,res)=>{
  res.json({
    password:password,
    saltRounds:saltRounds
    })

}
module.exports = {
  signup,
  login,
  test,
  validate
  // logout
};
