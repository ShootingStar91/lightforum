export const testData = {
  forums: [
    {
      title: "Test forum",
      description: "General discussion about testing, obviously!",
    },
  ],
  posts: [
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
  responses: [
    {
      title: "Test response 1",
      content: "Hi there, I agree.",
      forumId: 1,
      parentId: 1,
      userId: 2,
    },
  ],
};
