import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable("forums", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    await queryInterface.createTable("posts", {
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
          references: { model: "users", key: "id" },
          allowNull: false,
        },
        forum_id: {
          type: DataTypes.INTEGER,
          references: { model: "forums", key: "id" },
        },
      });
},
  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable("forums");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("posts");
  },
};
