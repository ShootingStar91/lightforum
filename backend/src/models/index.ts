import Post from "./post";
import Forum from "./forum";
import User from "./user";

Post.belongsTo(User);
Post.belongsTo(Forum);
