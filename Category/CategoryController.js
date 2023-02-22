import express from 'express';
import slugify from 'slugify';
import Category from './Category.js';

const Router = express.Router()

Router.get("/", (req, res) => {
    Category.findAll().then((categories)=> {
        res.render("admin/category/index", {
            categories,
        })
    })
})

Router.get("/create", (req, res) => {
    res.render("admin/category/create")
})

Router.get("/edit/:id", (req, res) => {
    Category.findByPk(req.params.id)
    .then(category => {
        res.render("admin/category/edit", {
            category
        })
    })
})

Router.post("/edit/:id", (req, res) => {
    const { body : { title }} = req
    Category.update({
        title,
        slug : slugify(title),
    }, {
        where: { id:req.params.id }
    })
    .then(category => {
        res.redirect("/category")
    })
})

Router.post("/", (req, res) => {
    const { body : { title }} = req
    Category.create({
        title,
        slug : slugify(title),
    }).then((category)=> {
        res.redirect("/category")
    })
})

Router.get("/delete/:id", (req, res) => {
    const { params : { id }} = req
    Category.destroy({
        where : { id  },
    }).then(()=> {
        res.redirect("/category")
    })
})

export default Router

