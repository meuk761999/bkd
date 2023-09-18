const express = require('express');
const router = express.Router();
const {
    createBlog,
    availableBlog,
    updateBlog,
    deleteBlog
} = require("./controller/controller");

console.log("--------inside the index/blogs routes ---->")

router.post("/", createBlog)
router.get("/", availableBlog)
router.put("/", updateBlog)
router.delete("/", deleteBlog)


module.exports = router;