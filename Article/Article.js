import sequelize from "sequelize";
import connection from "../database/database.js";

const Article = connection.define("articles", {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false,
    },
})

export default Article