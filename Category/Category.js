import sequelize from "sequelize";
import Article from "../Article/Article.js";
import connection from "../database/database.js";

const Category = connection.define("categories", {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize.STRING
    }
})

Category.hasMany(Article,{
    foreignKey: 'categoryId'
  })
Article.belongsTo(Category)
export default Category