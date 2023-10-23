import Post from "./post.js";
import Forum from "./forum.js";
import User from "./user.js";
import Thread from "./thread.js";

Post.belongsTo(User);
Post.belongsTo(Thread);
Thread.belongsTo(Forum);

export { Post, Forum, User, Thread };
