import sequelize from "sequelize";
import connection from "../database/database.js";

const User = connection.define("users", {
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    
})

export default User