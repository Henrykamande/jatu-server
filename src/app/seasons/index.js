import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("seasons");
const CountryController = PropertyController("countries");
const ProjectController = PropertyController("projects");
const RegionController = PropertyController("regions");
const ZonesController = PropertyController("project-zones");


export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findProjectSeasons(req, res) {

  let country = await CountryController.findOne({url: req.params.country});
  let project = await ProjectController.findOne({url: req.params.project});
  
  try {

    let zonesGrown = [];
    const zonesRecord = await ZonesController.findOne({ country: country._id, project: project._id});
    if(zonesRecord) {
      zonesGrown = zonesRecord.zonesGrown;
    }
    

    const zonesData = [];
    if(zonesGrown.length > 0) {
      for(const zone of zonesGrown) {
        const region = await RegionController.findById(zone);
        const season = await Controller.findOne({ zone: zone, country: country._id, project: project._id});
        let start = "";
        let end = "";
        if(season) {
          start = season.start;
          end = season.end;
        }
  
        let details = {
          _id: zone,
          name: region.name,
          start: start,
          end: end 
        }
  
        zonesData.push(details);
      }
  
    }

    return res.send({  zones: zonesData, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function findWatches(req, res) {
  let country = await CountryController.findOne({url: req.params.country});
  let project = await ProjectController.findOne({url: req.params.project});
  
  try {
    const records = await Controller.find({ country: country._id, project: project._id});
    return res.send({ records, state: true });
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
    const zones = data.zonesGrown;

    for(const zone of zones) {
      const zoneRecord = await Controller.findOne({ country: data.country, project: data.project, zone: zone._id });
      const details = {
        country: data.country,
        project: data.project,
        zone: zone._id,
        start: zone.start,
        end: zone.end
      };

      const updateDetails = {
        start: zone.start,
        end: zone.end
      };

      if(zoneRecord) {
         const updatedRecord = await Controller.update(updateDetails, zoneRecord._id);
      } else {
         const record = await Controller.create(details);
      }
    }
  
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
