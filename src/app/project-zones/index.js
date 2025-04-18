import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("project-zones");
const CountryController = PropertyController("countries");
const ProjectController = PropertyController("projects");
const RegionController = PropertyController("regions");

export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findZones(req, res) {
  try {
    const record = await Controller.findOne({ country: req.params.country, project: req.params.project});
    return res.send({ record, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function projectsZones(req, res) {
  try {
    const record = await Controller.findOne({ country: req.params.country, project: req.params.project});

    let zones = [];
    if(record) {
      const zonesGrown = record.zonesGrown;
      for(const zone of zonesGrown) {
        const region = await RegionController.findById(zone);
        zones.push(region);
      }
    }
    
    return res.send({ record, zones, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function projectsZonesByUrl(req, res) {
  try {
    const country = await CountryController.findOne({ url: req.params.country});
    const project = await ProjectController.findOne({ url: req.params.project});
    const record = await Controller.findOne({ country: country._id, project: project._id});

    let zones = [];
    if(record) {
      const zonesGrown = record.zonesGrown;
      for(const zone of zonesGrown) {
        const region = await RegionController.findById(zone);
        zones.push(region);
      }
    }
    
    return res.send({ record, zones, state: true });
  } catch (err) {
    console.log(err, 'w error');
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


export async function createRecord(req, res) {
  let data = req.body;

  try {
    const record = await Controller.create(data);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function editZones(req, res) {
  const country = req.body.country;
  const project = req.body.project;
  let zonesGrown = req.body.zonesGrown;
  let details = { zonesGrown: zonesGrown };
  try {
    const zoneRecord = await Controller.findOne({ country: country, project: project });
    const record = await Controller.update(details, zoneRecord._id);
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

export async function deleteRecord(req, res) {
  try {
    const records = await Controller.remove(req.params.id);
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
