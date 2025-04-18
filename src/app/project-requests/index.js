import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = PropertyController("project-requests");
const ProjectController = PropertyController("projects");

export async function deleteRecord(req, res) {
  try {
    const record = await Controller.remove(req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findCosts(req, res) {
  try {
    const projectId = req.params.id;
    const records = await Controller.find({ project: projectId });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findCostsByUrl(req, res) {
  try {
    const url = req.params.url;
    const project = await ProjectController.findOne({ url: url });
    const records = await Controller.find({ project: project._id });
    return res.send({ records, state: true });
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

export async function findByUrl(req, res) {
  try {
    const record = await Controller.findOne({ url: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  try {
    const recordData = req.body;

    const record = await Controller.create(recordData);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function updateRecord(req, res) {
  let recordData = req.body;
  try {
    const record = await Controller.update(recordData, req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
