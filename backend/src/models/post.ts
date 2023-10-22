import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../util/db.js";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  id!: number;
  title!: string | null;
  content!: string;
  userId!: number;
  forumId!: number;
  parentId!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      // No title in response posts
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "users",
    },
    forumId: {
      type: DataTypes.INTEGER,
      references: "forums",
    },
    parentId: {
      /** if null, this is a topic.
       * If defined, this is a response to that topic.
       */
      type: DataTypes.INTEGER,
      references: "posts",
      allowNull: true,
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
