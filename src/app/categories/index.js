import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("categories");
const ProductController = PropertyController("products");
const BrandController = PropertyController("brands");
const SubCategoryController = PropertyController("subcategories");

export async function findAll(req, res) {
  try {
    const categories = await Controller.find({});
    let records = [];
    for (const category of categories) {
      let subCats = await SubCategoryController.find({
        category: category._id,
      });
      let details = {};
      if (subCats) {
        details = {
          name: category.name,
          url: category.url,
          _id: category._id,
          subs: subCats,
        };
      } else {
        details = {
          name: category.name,
          url: category.url,
          _id: category._id,
          subs: [],
        };
      }

      records.push(details);
    }

    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await Controller.findOne({ url: req.params.url });
    Controller.remove(category._id);
    ProductController.removeMany({ category_url: category.url });
    SubCategoryController.removeMany({ categoryUrl: category.url });
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function autofillRecords(req, res) {
  try {
    const subcategories = await SubCategoryController.find({
      categoryUrl: req.params.url,
    });
    const brands = await BrandController.find({ categoryUrl: req.params.url });
    return res.send({ subcategories, brands, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function filterBrands(req, res) {
  try {
    const brands = await BrandController.find({
      subcategoryUrl: req.params.url,
    });
    return res.send({ brands, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByUrl(req, res) {
  try {
    const record = await Controller.findOne({ url: req.params.url });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let data = req.body;
  try {
    const record = await Controller.create(data);
    console.log(data)
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function editRecord(req, res) {
  const id = req.params.id;
  let data = req.body;
  delete data.url;
  console.log(data, "category data");
  try {
    const record = await Controller.update(data, id);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}
