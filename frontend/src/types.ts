export type ThreadType = {
  title: string;
  content: string;
  forumId: number;
  userId: number;
  posts: [{ content: string; userId: number; threadId: number }];
};

export type UserType = { id: number; username: string };

export type ForumType = { title: string; description: string; id: number };

export type PostType = {
  content: string;
  userId: number;
  threadId: number;
};
