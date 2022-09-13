const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: objectId,
      ref: "Author",
      required: true,
      
    },
    tags: [String],
    category: {
      type: [String],
      required: true,
      trim: true,
    },
    subcategory: [{ type: String ,trim: true}],
    deletedAt: {
      type: Date,
      default: null,
      
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
