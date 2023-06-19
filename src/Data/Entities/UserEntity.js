import {sequelize} from '../Context/DB.js'
import { DataTypes } from 'sequelize'

export const UserEntity = sequelize.define('Usuario', {
    
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
      },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Team:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  
  