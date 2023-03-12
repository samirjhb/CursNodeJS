const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/**
 * Implementar metodo propio con relacion a storage
 */

TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //desde tracks --> storages
        localField: "mediaId", // Tracks.mediaId
        foreignField: "_id", // Storages.id
        as: "audio", //alias
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //desde tracks --> storages
        localField: "mediaId", // Tracks.mediaId
        foreignField: "_id", // Storages.id
        as: "audio", //alias
      },
    },
    {
      $unwind: "$audio",
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
  ]);
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme);
