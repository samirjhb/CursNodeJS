const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementar modelo personalizado
 */

Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Tracks.findAll({ include: "audio" });
};

Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Tracks.findOne({ where: { id }, include: "audio" });
};
module.exports = Tracks;
