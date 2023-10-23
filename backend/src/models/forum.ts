import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../util/db.js";

class Forum extends Model<
  InferAttributes<Forum>,
  InferCreationAttributes<Forum>
> {
  id!: CreationOptional<number>;
  title!: string;
  description!: string | null;
  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;
}

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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "forum",
    timestamps: true,
  }
);

export default Forum;
