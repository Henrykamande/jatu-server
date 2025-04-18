import PropertyController from "../controller.js";
import { handleErr } from "../../helpers/index";

const Controller = PropertyController("equipment-application");

export async function findAllApplications(req, res) {
  try {
    const records = await Controller.find({});
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
    console.log(err, " farms err ")
    handleErr(res, err);
  }
}

// export async function findByUrl(req, res) {
//   try {
//     const record = await Controller.findOne({ url: req.params.url });
//     return res.send({ record, state: true });
//   } catch (err) {
//     handleErr(res, err);
//   }
// }

// export async function findUserContacts(req, res) {
//   try {
//     const record = await Controller.findOne({ _id: req.params.id });
//     return res.send({ record, state: true });
//   } catch (err) {
//     handleErr(res, err);
//   }
// }

