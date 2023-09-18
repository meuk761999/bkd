const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        heading: String,
        paragraph: String,
        createdBy: String,
        description: String,
    },
    { timestamps: true }
);

const BlogSchema = mongoose.model("BlogSchema", blogSchema);
module.exports = BlogSchema;
