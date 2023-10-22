import { DataTypes, QueryInterface } from "sequelize";

export default {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("posts", "title", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn("posts", "title", {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },
};
