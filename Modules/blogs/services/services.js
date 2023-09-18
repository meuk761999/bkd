const mongoose = require("mongoose");
const blogsDB = require("../../../Models/blogs/BlogSchema");

const createBlogSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-7, createBlog Service--------------->", req.body);
      const { heading, paragraph, createdBy, description } = req.body;

      if (req.body) {
        let newDoubt = {
          heading: heading,
          paragraph: paragraph,
          createdBy: createdBy,
          description: description,
        };
        const savedBlog = await blogsDB.create(newDoubt);
        if (!savedBlog) {
          return reject({
            status: 500,
            message: "something went wrong",
            data: {},
          });
        }
        if (savedBlog) {
          console.log("L-26, createdBlog---->");
          return resolve({
            status: 201,
            message: "Successfully plan created",
            data: { doubt: savedBlog },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      return reject({
        status: 500,
        message: "Something went wrong",
        data: {},
      });
    }
  });
};
const availableBlogSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-48, available blogs plan-------->");
      const pageNumber = req.query.pageNumber || 1; // Current page, default to 1 if not provided
      const perPage = 5; // Number of documents to display per page
      const totalDocs = await blogsDB.countDocuments({}); // Get the total number of documents
      console.log("L-51, totalDocs----->", totalDocs);
      const totalPages = Math.ceil(totalDocs / perPage);
      const availablePlan = await blogsDB
        .find({})
        // .select({ planName: 1, planPrice: 1, askDoubtPurchasedNumber: 1, askDoubtPurchasedValidity: 1, _id: 1 })
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * perPage) // Skip documents on previous pages
        .limit(perPage); // Limit the number of documents per page
      return resolve({
        status: 200,
        count: availablePlan.length,
        message: "successfully fetched available Blog",
        totalDocuments: totalDocs,
        totalPages: totalPages,
        data: {
          availablePlan: availablePlan,
        },
      });
    } catch (error) {
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};
const updateBlogSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("L-81, updateBlogSer", req.body);
      const { _id, heading, paragraph, createdBy, description } = req.body;
      const existPlan = await blogsDB.findOne({ _id: _id });
      if (!existPlan) {
        return reject({
          status: 404,
          message: "blog don't exist",
          data: {},
        });
      } else {
        const updatedObj = {
          heading: heading || existPlan.heading,
          paragraph: paragraph || existPlan.paragraph,
          createdBy: createdBy || existPlan.createdBy,
          description: description || existPlan.description,
        };
        const updatedDoubt = await blogsDB.findOneAndUpdate(
          { _id: _id },
          { $set: updatedObj },
          { new: true }
        );
        if (!updatedDoubt) {
          return reject({
            status: 400,
            message: "something went wrong",
            data: {},
          });
        } else {
          return resolve({
            status: 200,
            message: "successfully updated Blog",
            data: {
              updatedDoubt: updatedDoubt,
            },
          });
        }
      }

    } catch (error) {
      console.log("error : updated Doubt Blog---------------->", error.message)
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};

const deleteBlogSer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { _id } = req.body;
      const deletedBlog = await blogsDB.findOneAndDelete({ _id: _id });
      console.log("L-136, deleted blog", deletedBlog);
      if (!deletedBlog) {
        return reject({
          status: 404,
          message: "blog don't exist",
          data: {},
        });
      } else {
        return resolve({
          status: 200,
          message: "successfully blog deleted",
          data: {
            plan: deletedBlog,
          },
        });
      }
    } catch (error) {
      console.log("error : deletedBlog---------------->", error.message)
      return reject({
        status: 500,
        message: "internal server error",
        data: {},
      });
    }
  });
};

module.exports = {
  createBlogSer,
  availableBlogSer,
  updateBlogSer,
  deleteBlogSer
};
