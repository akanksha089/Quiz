const Joi = require("joi");

const table_name = "courses";

const module_title = "Courses";
const module_single_title = "Course";
const module_add_text = "Add";
const module_edit_text = "Edit";
const module_slug = "courses";
const module_layout = "layouts/main";

const insertSchema = Joi.object({
  title: Joi.string().required().max(255),
  description: Joi.string().required(),
});

module.exports = {
  table_name,
  insertSchema,
  module_title,
  module_single_title,
  module_add_text,
  module_edit_text,
  module_slug,
  module_layout,
};
