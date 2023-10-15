import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "dpg-cji6rjfjbvhs73aaf09g-a.singapore-postgres.render.com",
  username: "tqt",
  password: "OYSj9d6h7QASiRHIW08re8607bZ6l9G8",
  database: "tqtauthdev",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const Student = sequelize.define(
  "student",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
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

// (async () => {
//   console.log("sync");
//   await sequelize.sync({ force: true });
// })();
