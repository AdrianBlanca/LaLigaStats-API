import {sequelize} from '../Context/DB.js'
import { DataTypes } from 'sequelize'

export const TeamEntity = sequelize.define('Team', {

        Team: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey:true
        },
        ResultsName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);