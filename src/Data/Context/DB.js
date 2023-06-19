import { Sequelize } from "sequelize";

const sequelize = new Sequelize('laligastatsdb', 'laligastatsdb_user', 'eCpfV0Ef1poZD8l0hsi8yzvRcarZQLLi', {
    host: 'dpg-ci824lunqql0ldf5t0q0-a.frankfurt-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      native: true
    }
  });


  export {sequelize}