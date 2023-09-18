const {
    createBlogSer,
    availableBlogSer,
    updateBlogSer,
    deleteBlogSer
} = require("../services/services");

const createBlog = async (req, res) => {
    try {
        const data = await createBlogSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the createBlog Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};
const availableBlog = async (req, res) => {
    try {
        const data = await availableBlogSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the availableBlog Error--->", err.message, err.status);
        return res.status(err.status).json({ error: err.message });
    }
};
const updateBlog = async (req, res) => {
    try {
        const data = await updateBlogSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the updateBlog Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};
const deleteBlog = async (req, res) => {
    try {
        const data = await deleteBlogSer(req);
        return res.status(data.status).json(data);
    } catch (err) {
        console.log("inside the deleteBlog Error--->", err.message);
        return res.status(err.status).json({ error: err.message });
    }
};


module.exports = {
    createBlog,
    availableBlog,
    updateBlog,
    deleteBlog
};
