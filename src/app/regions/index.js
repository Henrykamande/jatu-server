import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("regions");
const CountryController = PropertyController("countries");
const ProjectController = PropertyController("projects");
const ProjectCostController = PropertyController("project-cost");

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
    const record = await Controller.findOne({ url: req.params.url });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByCountry(req, res) {
  try {
    const records = await Controller.find({ country: req.params.id });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function zonalDefinition(req, res) {
  try {
    const country = await CountryController.findOne({ url: req.params.country});
    const project = await ProjectController.findOne({ url: req.params.project});
    const records = await Controller.find({ country: country._id });

    let zonesArray = [];
   for(const zone of records) {
    let costs = await ProjectCostController.find({ country: country._id, project: project._id, zone: zone._id});

    let details = {
      _id: zone._id,
      name: zone.name,
      costs: costs
    };

    zonesArray.push(details);
   } 
    return res.send({ records, zonesArray, state: true });
  } catch (err) {
    console.log(err);
    handleErr(res, err);
  }
}



export async function createRecord(req, res) {
  let data = req.body;

  try {
    const record = await Controller.create(data);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function editRecord(req, res) {
  const id = req.params.id;
  let data = req.body;
  delete data.url;
  try {
    const record = await Controller.update(data, id);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}
