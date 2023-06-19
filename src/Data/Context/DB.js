import { Sequelize } from "sequelize";

const sequelize = new Sequelize('LaLigaStats', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
  });


  export {sequelize}