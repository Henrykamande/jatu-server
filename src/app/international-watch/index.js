import { startOfDay, endOfDay, parseISO, format } from 'date-fns'
import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("international-watch");
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

export async function findByUrl(req, res) {
  try {
    const record = await Controller.findOne({ url: req.params.url });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByProject(req, res) {
  try {
    const _id = req.params.url;
    let project = await ProjectController.findById(_id);
    let records = await Controller.find({ project: project._id });
    return res.send({ records, state: true });
  } catch (err) {
    console.log(err);
    handleErr(res, err);
  }
}

export async function findByProjectUrl(req, res) {
  try {
    const url = req.params.url;
   // console.log(url, 'url');
    let project = await ProjectController.findOne({ url: url });
    let records = await Controller.find({ project: project._id });
    return res.send({ records, state: true });
  } catch (err) {
    console.log(err);
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

export async function findByDate(req, res) {
  const iso = parseISO(req.params.date);

  try {
    const records = await Controller.find({
      project: req.params.project, "date":
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

export async function findByDateUrl(req, res) {
  //const iso = parseISO(req.params.date);
  const date = format(new Date(req.params.date), 'yyyy-MM-dd');
  const iso = parseISO(date);
  console.log(iso, 'iso');
   const project = await ProjectController.findOne({ url: req.params.project});
  try {
    let queryData = [];
    const records = await Controller.find({
      project: project._id, "date":
      {
        "$gte": startOfDay(iso),
        "$lte": endOfDay(iso)
      }
    });

    if(records.length > 0) {
      queryData = records;
    } else {
      const latestRecord = await Controller.findLatest({project: project._id, "date":
      {
        "$lte": endOfDay(iso)
      }});
      if(latestRecord) {
        console.log(latestRecord, 'latest');
        let records = await Controller.find({
          project: project._id, "date":
          {
            "$gte": startOfDay(latestRecord.date),
            "$lte": endOfDay(latestRecord.date)
          }
        });
       queryData = records;
      }
      
    }

    return res.send({ records: queryData, state: true });
  } catch (err) {
    console.log(err, 'w error');
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let data = req.body;
  try {
    for(const record of data.rows) {
      const details = {
        project: data.project,
        date: data.date,
        watchregion: record.zone,
        unit: record.unit,
        price: record.price
      };
      const watchrecord = await Controller.create(details);
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
