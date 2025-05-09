const Model = require("../models/featureModel");
const QueryModel = require("../models/queryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const db = require("../config/mysql_database");
const Joi = require("joi");

const table_name = Model.table_name;
const module_title = Model.module_title;
const module_single_title = Model.module_single_title;
const module_add_text = Model.module_add_text;
const module_edit_text = Model.module_edit_text;
const module_slug = Model.module_slug;
const module_layout = Model.module_layout;

exports.addFrom = catchAsyncErrors(async (req, res, next) => {
  res.render(module_slug + "/add", {
    layout: module_layout,
    title: module_single_title + " " + module_add_text,
    module_slug,
  });
});

//create a new blog
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  try {
    await Model.insertSchema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
  } catch (error) {
    // Joi validation failed, send 400 Bad Request with error details
    return next(
      new ErrorHandler(
        error.details.map((d) => d.message),
        400
      )
    );
  }

  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  //const updatedSlug = req.body.slug || generateSlug(req.body.title);

  if (req.file) {
    req.body.image = req.file.filename;
  }

  const insertData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    image: req.body.image,
     created_at: created_at,
    updated_at: created_at,
    
  };
  //console.log(insertData); return false;
  const blog = await QueryModel.saveData(table_name, insertData, next);

  req.flash("msg_response", {
    status: 200,
    message: "Successfully added " + module_single_title,
  });
 
  res.redirect(`/${process.env.ADMIN_PREFIX}/${module_slug}`);
});

exports.editForm = catchAsyncErrors(async (req, res, next) => {
  const blog = await QueryModel.findById(table_name, req.params.id, next);

  if (!blog) {
    return;
  }
  res.render(module_slug + "/edit", {
    layout: module_layout,
    title: module_single_title + " " + module_edit_text,
    blog,
    module_slug,
  });
});

exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  const updatedSlug = req.body.slug || generateSlug(req.body.title);

  req.body.image = req.body.old_image;
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const updateData = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status,
    // created_at: created_at,
    updated_at: created_at,
  };

  const blog = await QueryModel.findByIdAndUpdateData(
    table_name,
    req.params.id,
    updateData,
    next
  );

  req.flash("msg_response", {
    status: 200,
    message: "Successfully updated " + module_single_title,
  });

  res.redirect(`/${process.env.ADMIN_PREFIX}/${module_slug}`);
});

exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  await QueryModel.findByIdAndDelete(table_name, req.params.id, next);

  req.flash("msg_response", {
    status: 200,
    message: "Successfully deleted " + module_single_title,
  });

  res.redirect(`/${process.env.ADMIN_PREFIX}/${module_slug}`);
});

exports.getAllRecords = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 1;
  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.search || "";
  const filterQuery = req.query.filter || "";
  // Calculate offset for pagination
  const offset = (page - 1) * resultPerPage;

  try {
    // Count total blogs
    const totalBlogsResult = await db.query(
      "SELECT COUNT(*) as count FROM " + table_name
    );
    const totalBlogs = totalBlogsResult[0][0].count;

    // Fetch blogs with pagination and filtering
    // const blogs = await db.query('SELECT * FROM blogs  LIMIT ? OFFSET ?', [resultPerPage, offset]);
    const blogs = await db.query(
      "SELECT * FROM " + table_name + " order by id desc"
    );

    /*res.status(200).json({
            success: true,
            totalBlogs,
            resultPerPage,
            page,
            blogs
        });*/
    const message = req.flash("msg_response");

    res.render(module_slug + "/index", {
      layout: module_layout,
      title: module_title,
      blogs,
      message,
      module_slug,
    });
  } catch (error) {
    return next(new ErrorHandler("Database query failed", 500));
  }
});

exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const blog = await QueryModel.findById(table_name, req.params.id, next);

  if (!blog) {
    return;
  }
  res.render(module_slug + "/detail", {
    layout: module_layout,
    title: module_single_title,
    blog,
  });
});

exports.deleteImage = catchAsyncErrors(async (req, res, next) => {
  const updateData = {
    image: "",
  };

  const blog = await QueryModel.findByIdAndUpdateData(
    table_name,
    req.params.id,
    updateData,
    next
  );

  req.flash("msg_response", {
    status: 200,
    message: "Successfully updated " + module_single_title,
  });

  res.redirect(
    `/${process.env.ADMIN_PREFIX}/${module_slug}/edit/${req.params.id}`
  );
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+$/g, ""); // Remove trailing hyphens
}

exports.apiGetAllRecords = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 1;
  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.search || "";
  const filterQuery = req.query.filter || "";
  // Calculate offset for pagination
  const offset = (page - 1) * resultPerPage;

  try {
    // Count total blogs
    const totalBlogsResult = await db.query(
      "SELECT COUNT(*) as count FROM " + table_name
    );
    const totalBlogs = totalBlogsResult[0][0].count;

    // Fetch blogs with pagination and filtering
    const [blog_records] = await db.query(
      "SELECT * FROM " + table_name + " order by id desc"
    );

    // Filter or process rows if needed
    const blogs = blog_records.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      image:
        process.env.BACKEND_URL + "/backend/uploads/" + module_slug + "/" + row.image,
    }));

    res.status(200).json({
      success: true,
      totalBlogs,
      resultPerPage,
      page,
      blogs,
    });
  } catch (error) {
    return next(new ErrorHandler("Database query failed", 500));
  }
});

exports.apiGetSingleRecord = catchAsyncErrors(async (req, res, next) => {
  let blog = await QueryModel.findBySpecific(
    table_name,
    "slug",
    req.params.slug,
    next
  );

  if (!blog) {
    return next(new ErrorHandler("Record not found", 500));
  }
  blog.image =
    process.env.BACKEND_URL + "/backend/uploads/" + module_slug + "/" + blog.image;

  res.status(200).json({
    success: true,
    blog,
  });
});
