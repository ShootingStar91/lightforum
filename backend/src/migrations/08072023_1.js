const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("posts", "parent_id", {
      type: DataTypes.INTEGER,
      references: { model: "posts", key: "id" },
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("posts", "parent_id");
  },
};
