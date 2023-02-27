import express from 'express';
import bcrypt from 'bcryptjs';
import User from './User.js';

User.sync({force:false});

const Router = express.Router()

Router.get("/", (req, res) => {
    User.findAll().then((users)=> {
        res.render("admin/user/index", {
            users,
        })
    })
})

Router.get("/create", (req, res) => {
    res.render("admin/user/create")
})

Router.post("/", (req, res) => {
    const { name, email, password } = req.body
    const { salt } = bcrypt.genSalt(10)
    
    User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, salt)
    })
    .then(user=> {
        res.redirect("/user")
    })
})

Router.post("/delete/:id", (req, res) => {
    User.destroy({
        where: {id : req.params.id }
    })
    .then(user=> {
        res.redirect("/user")
    })
})

Router.get("/edit/:id", (req, res) => {
    User.findByPk(req.params.id )
    .then(user => {
        res.render("admin/user/edit", {
            user,
        })
    })
})

export default Router