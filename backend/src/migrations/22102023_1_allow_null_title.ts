import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.changeColumn("posts", "title", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.changeColumn("posts", "title", {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },
};
