import { startOfDay, endOfDay, parseISO, format } from 'date-fns';
import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { query } from 'express';

const Controller = PropertyController("market-watch");
const UnitController = PropertyController("unit-setup");
const CountryController = PropertyController("countries");
const ProjectController = PropertyController("projects");

export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findWatches(req, res) {
  let country = await CountryController.findOne({ url: req.params.country });
  let project = await ProjectController.findOne({ url: req.params.project });

  try {
    const records = await Controller.find({ country: country._id, project: project._id });
    return res.send({ records, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function findByDateWeb(req, res) {
  
  const date = format(new Date(req.body.date), 'yyyy-MM-dd');
  const iso = parseISO(date);
  console.log(iso, 'm iso');
  try {
    let queryData = [];
    let records = await Controller.find({
      country: req.body.country, project: req.body.project, "date":
      {
        "$gte": startOfDay(iso),
        "$lte": endOfDay(iso)
      }
    });

    if(records.length > 0) {
      queryData = records;
    } else {
      const latestRecord = await Controller.findLatest({country: req.body.country, project: req.body.project, "date":
      {
        "$lte": endOfDay(iso)
      }});
      if(latestRecord) {
        let records = await Controller.find({
          country: req.body.country, project: req.body.project, "date":
          {
            "$gte": startOfDay(latestRecord.date),
            "$lte": endOfDay(latestRecord.date)
          }
        });
       queryData = records;
      }
      
    }

    let watchData = [];
    for(const zoneRecord of queryData) {
      const unitRecord = await UnitController.findOne({country: req.body.country, project: req.body.project, zone: zoneRecord.zone._id});
      let unit = "";
      if(unitRecord) {
        unit = unitRecord.unit;
      }

      let details = {
        name: zoneRecord.zone.name,
        unit: unit,
        price: zoneRecord.price
      }

      watchData.push(details);
    }

    return res.send({ records: watchData, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function findZonePrice(req, res) {
  
  const date = format(new Date(req.body.date), 'yyyy-MM-dd');
  const iso = parseISO(date);

  try {
    let queryData = {};
    let record = await Controller.findOne({
      country: req.body.country, project: req.body.project, zone: req.body.zone, "date":
      {
        "$gte": startOfDay(iso),
        "$lte": endOfDay(iso)
      }
    });

    if(record) {
      queryData = record;
    } else {
      const latestRecord = await Controller.findLatest({country: req.body.country, project: req.body.project, zone: req.body.zone, "date":
      {
        "$lte": endOfDay(iso)
      }});
      if(latestRecord) {
        let record = await Controller.findOne({
          country: req.body.country, project: req.body.project, zone: req.body.zone, "date":
          {
            "$gte": startOfDay(latestRecord.date),
            "$lte": endOfDay(latestRecord.date)
          }
        });
       queryData = record;
      }
    }

    return res.send({ record: queryData, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function findByDate(req, res) {

  let country = await CountryController.findOne({ url: req.body.country });
  let project = await ProjectController.findOne({ url: req.body.project });

  const iso = parseISO(req.body.date);

  try {
    const records = await Controller.find({
      country: country._id, project: project._id, "date":
      {
        "$gte": startOfDay(iso),
        "$lte": endOfDay(iso)
      }
    });

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


export async function findByZoneProject(req, res) {
  try {
    const record = await Controller.findOne({ zone: req.params.zone, project: req.params.project });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let data = req.body;

  try {
    // const iso = parseISO(req.body.date);

    // const existing = await Controller.findOne({
    //   country: country._id, project: project._id, "date":
    //   {
    //     "$gte": startOfDay(iso),
    //     "$lte": endOfDay(iso)
    //   }
    // });

    const zones = data.zones;
    for (const zoneRecord of zones) {
      let details = {
        project: data.project,
        country: data.country,
        zone: zoneRecord._id,
        price: zoneRecord.price,
        date: data.date
      };

      const record = await Controller.create(details);
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
