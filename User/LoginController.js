import express from 'express';
import bcrypt from 'bcryptjs';
import User from './User.js';


const Router = express.Router()

Router.get("/login", (req, res) => {
    res.render("login")
})


Router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({
        where: { email },
        raw: true    
    })
    .then(user=> {
        console.log(password, bcrypt.compare(password, user.password))
        if(user && bcrypt.compareSync(password, user.password)){
            
            req.session.user = {
                email,
                name: user.name,
                id: user.id,
            }
            res.redirect("/user")
        } else {
            res.redirect("/login")
        }   
    })
})



export default Router