import express from 'express';
import slugify from 'slugify';
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
    res.render("admin/article/create")
})

Router.get("/edit/:id", (req, res) => {
    Article.findByPk(req.params.id)
    .then(article => {
        res.render("admin/article/edit", {
            article
        })
    })
})

Router.post("/edit/:id", (req, res) => {
    const { body : { title, body }} = req
    Article.update({
        title,
        slug : slugify(title),
        body: body 
    }, {
        where: { id:req.params.id }
    })
    .then(article => {
        res.redirect("/article")
    })
})

Router.post("/", (req, res) => {
    const { body : { title, content }} = req
    Article.create({
        title,
        slug : slugify(title),
        body: content,
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