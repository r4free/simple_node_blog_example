import express from 'express';
import bcrypt from 'bcryptjs';
import User from './User.js';
import session from 'express-session';


const Router = express.Router()

Router.get("/login", (req, res) => {
    res.render("auth/login")
})

Router.get("/register", (req, res) => {
    res.render("auth/register")
})

Router.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/")
})

Router.post("/register", (req, res) => {
    
    const { name, email, password } = req.body
    const { salt } = bcrypt.genSalt(10)
    
    User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, salt)
    })
    .then(user=> {
        req.session.user = {
            email,
            name: user.name,
            id: user.id,
        }
        res.redirect("/user")
    })
    res.redirect("/")
})


Router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({
        where: { email },
        raw: true    
    })
    .then(user=> {
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