import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../util/db.js";

class Thread extends Model<InferAttributes<Thread>, InferCreationAttributes<Thread>> {
  id!: CreationOptional<number>;
  title!: string;
  content!: string;
  userId!: number;
  forumId!: number;
  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;
}

Thread.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "users",
    },
    forumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "forums",    
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "threads",
    timestamps: true,
  }
);

export default Thread;
