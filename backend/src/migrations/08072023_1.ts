import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.addColumn("posts", "parent_id", {
      type: DataTypes.INTEGER,
      references: { model: "posts", key: "id" },
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.removeColumn("posts", "parent_id");
  },
};
