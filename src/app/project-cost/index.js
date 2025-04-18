import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";
import { beTarask } from "date-fns/locale";

const Controller = PropertyController("project-cost");
const ProjectController = PropertyController("projects");
const CostItemController = PropertyController("cost-items");
const UnitController = PropertyController("unit-setup");

export async function deleteRecord(req, res) {
  try {
    const record = await Controller.remove(req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findZoneCosts(req, res) {
  try {
    const countryId = req.params.country;
    const projectId = req.params.project;
    const zoneId = req.params.zone;
    const records = await Controller.find({ project: projectId, country: countryId, zone: zoneId });
    return res.send({ records, state: true });
  } catch (err) {
    console.log(err);
    handleErr(res, err);
  }
}

export async function findZoneCostsWeb(req, res) {
  try {
    const countryId = req.params.country;
    const projectId = req.params.project;
    const zoneId = req.params.zone;
    const acres = parseInt(req.params.acres);


    const costItems = await CostItemController.find({  project: projectId });
    let costs = [];
    for(const cost of costItems) {
      const unitItem = await UnitController.findOne({ project: projectId, country: countryId, zone: zoneId });
      let unit = "";
      if(unitItem) {
        unit = unitItem.unit;
      }
    

      // fetch cost per acre
      let query = { 
        project: projectId,
        country: countryId,
        zone: zoneId,
        costitem: cost._id
      };

      let acreCost = 0;
      const ranges = await Controller.find(query);

      let selectedRange = {};
      for(const rangeItem of ranges) {
        if(acres >= rangeItem.min && acres <= rangeItem.max) {
          selectedRange = rangeItem;
          acreCost = rangeItem.acreCost;
          break;
        }
      }

      let details = {
        _id: cost._id,
        name: cost.name,
        unit: unit,
        acreCost: acreCost,
      };

      costs.push(details);
    }

    return res.send({ records: costs, state: true });
  } catch (err) {
    console.log(err);
    handleErr(res, err);
  }
}


export async function findItemCosts(req, res) {
  try {
    const countryId = req.params.country;
    const projectId = req.params.project;
    const zoneId = req.params.zone;
    const itemId = req.params.costitem;
    const records = await Controller.find({ project: projectId, country: countryId, zone: zoneId, costitem: itemId });
    return res.send({ records, state: true });
  } catch (err) {
    console.log(err);
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
    return res.send({ records, meta, state: true });
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
  const recordData = req.body;
  try {
      let details = {
        project: recordData.project,
        country: recordData.country,
        zone: recordData.zone,
        costitem: recordData.costitem,
        acreCost: recordData.acreCost,
        min: recordData.min,
        max: recordData.max
      };

     const record = await Controller.create(details);
  
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
