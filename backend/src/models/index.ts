import Post from "./post.js";
import Forum from "./forum.js";
import User from "./user.js";

Post.belongsTo(User);
Post.belongsTo(Forum);

export { Post, Forum, User };
