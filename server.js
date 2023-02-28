'use strict';

import express from "express"
import session, { Cookie } from "express-session"
import bodyParser from "body-parser";
import connection from "./database/database.js";
import methodOverride from "method-override";
import CategoryController from "./Category/CategoryController.js";
import UserController from "./User/UserController.js";
import LoginController from "./User/AuthController.js";
import ArticleController from "./Article/ArticleController.js";
import Article from "./Article/Article.js";
import Category from "./Category/Category.js";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


connection.authenticate().then(()=>{
  console.log("Autenticado com sucesso")
})

// App
const app = express();

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(session({
  secret: "123123", // from env in the future,
  cookie: {
    maxAge: 300000
  }
}))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'));

app.use(function(req,res,next){
  res.locals.user = req.session.user ? req.session.user : null
  next()
})

app.get('/', (req, res) => {
  const per_page = Number(req.query.per_page ?? 10);
  const page = Number(req.query.page ?? 1)
  const offset = (page-1) * per_page;
  Article.findAndCountAll({
    limit: per_page,
    offset,
    raw:true,
  }).then(({rows: articles, count: total }) => {
    res.render("blog/article/index", { 
      articles, 
      total, 
      current_page: page, 
      next_page: page+1, 
      per_page, 
      prev_page: page > 1 ? page-1:1 
    })
  });
});

app.get('/artigo/:slug', (req, res) => {
  Article.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(article => res.render("blog/article/show", { article }));
});

app.get('/category/:slug', (req, res) => {
  Category.findOne({
    where: {slug: req.params.slug }
  })
  .then(category=> {
    if(category) {
      category.getArticles().then(articles => {
        res.render("blog/article/index", { articles })
      })
    }else {
      res.redirect("/")
    }
  })
  
});

app.use("/", LoginController)
app.use("/user", UserController)
app.use("/category", CategoryController)
app.use("/article", ArticleController)

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

console.log("ok")