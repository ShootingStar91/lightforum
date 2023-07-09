import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Forum extends Model {}

Forum.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "forum",
    timestamps: true,
  }
);

export default Forum;