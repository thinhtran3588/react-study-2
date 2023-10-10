import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env);

export const Student = sequelize.define(
  "Student",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

(async () => {
  await sequelize.sync({ force: true });
})();
