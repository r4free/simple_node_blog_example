'use strict';

import express from "express"
import bodyParser from "body-parser";
import connection from "./database/database.js";
import methodOverride from "method-override";
import CategoryController from "./Category/CategoryController.js";
import ArticleController from "./Article/ArticleController.js";
import Article from "./Article/Article.js";

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

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  Article.findAll().then(articles => res.render("index", { articles }));
});
app.use("/category", CategoryController)
app.use("/article", ArticleController)

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

console.log("ok")