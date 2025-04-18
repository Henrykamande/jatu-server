import PropertyController from "../controller.js";
import { handleErr } from "../../helpers/index";
const Controller = PropertyController("project-categories");

export async function createRecord(req, res) {
  // console.log("create project caegory called -----------------")
  let data = req.body;
  try {
    const record = await Controller.create(data);
    return res.send({ state: true, ResultDesc: 1200 });
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
export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
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

export async function deleteCategory(req, res) {
  try {
    const category = await Controller.findOne({ url: req.params.url });
    Controller.remove(category._id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
