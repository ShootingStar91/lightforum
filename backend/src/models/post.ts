import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../util/db.js";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  id!: CreationOptional<number>;
  content!: string;
  userId!: number;
  threadId!: number;
  createdAt!: CreationOptional<Date>;
  updatedAt!: CreationOptional<Date>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "users",
    },
    threadId: {
      type: DataTypes.INTEGER,
      references: "threads",
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "posts",
    timestamps: true,
  }
);

export default Post;
