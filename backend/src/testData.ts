export const testData = {
  forums: [
    {
      title: "Test forum",
      description: "General discussion about testing, obviously!",
    },
  ],
  threads: [
    {
      title: "Test topic 1",
      content: "First test topic. Testing is fun!",
      forumId: 1,
      userId: 1,
    },
  ],
  users: [
    {
      username: "testUser1",
      password_hash: "testPass1",
    },
    {
      username: "testUser2",
      password_hash: "testPass2",
    }
  ],
  posts: [
    {
      content: "Hi there, I agree.",
      threadId: 1,
      userId: 2,
    },
  ],
};
