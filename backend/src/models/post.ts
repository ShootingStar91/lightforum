import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Post extends Model {}

Post.init(
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
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: 'user',
    },
    forum_id: {
      type: DataTypes.INTEGER,
      references: 'forum',
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "post",
  }
);

Post.sync()

export default Post;
