import express from 'express';
import slugify from 'slugify';
import Category from '../Category/Category.js';
import Article from './Article.js';

const Router = express.Router()

Router.get("/", (req, res) => {
    Article.findAll().then((articles)=> {
        res.render("admin/article/index", {
            articles,
        })
    })
})

Router.get("/create", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/article/create",
        {
            categories
        })
    })
})

Router.get("/edit/:id", (req, res) => {
    Article.findByPk(req.params.id)
    .then(article => {
        Category.findAll().then(categories => {
            res.render("admin/article/edit", {
                article,
                categories
            })
        })
        
    })
})

Router.post("/edit/:id", (req, res) => {
    const { body : { title, body, categoryId }} = req
    Article.update({
        title,
        slug : slugify(title),
        body: body ,
        categoryId
    }, {
        where: { id:req.params.id }
    })
    .then(article => {
        res.redirect("/article")
    })
})

Router.post("/", (req, res) => {
    const { body : { title, content, categoryId }} = req
    Article.create({
        title,
        slug : slugify(title),
        body: content,
        categoryId
    }).then((article)=> {
        res.redirect("/article")
    })
})

Router.get("/delete/:id", (req, res) => {
    const { params : { id }} = req
    Article.destroy({
        where : { id  },
    }).then(()=> {
        res.redirect("/article")
    })
})

export default Router