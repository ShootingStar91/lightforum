import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Post extends Model {}
/** parent_id: if null, this is a topic.
 * If defined, this is a response to that topic.
 */
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
      references: 'users',
    },
    forum_id: {
      type: DataTypes.INTEGER,
      references: 'forums',
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: 'posts',
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "posts",
    timestamps: true,
  },
);

export default Post;
