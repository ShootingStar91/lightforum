const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("posts", "forum_id");
    await queryInterface.removeColumn("posts", "title");
    await queryInterface.createTable("threads", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
    await queryInterface.removeColumn("posts", "parent_id");
    await queryInterface.addColumn("posts", "thread_id", {
      type: DataTypes.INTEGER,
      references: { model: "threads", key: "id" },
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("posts", "thread_id");
    await queryInterface.addColumn("posts", "title", {
      type: DataTypes.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("posts", "forum_id", {
      type: DataTypes.INTEGER,
      references: { model: "forums", key: "id" },
  });
    await queryInterface.addColumn("posts", "parent_id", {
      type: DataTypes.INTEGER,
      references: { model: "posts", key: "id" },
      allowNull: true,
    });
    
    await queryInterface.dropTable("threads");
  },
};
