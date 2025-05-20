import PropertyController from "../controller.js";
import { handleErr } from "../../helpers/index";

const Controller = PropertyController("farm-application");

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
    handleErr(res, err);
  }
}

export async function findFarmApplicantsRecord(req, res) {
  try {
    const record = await Controller.find({ userSerialNo: req.params.userSerialNo });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function editFarmApplicantsRecord(req, res) {
  const data = req.body;
  const id = req.params.userSerialNo;
  try {
    const record = await Controller.update(data, id);
    return res.send({ state: true, record, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteFarmApplicantsRecord(req, res) {
  try {
      await Controller.remove(req.params.userSerialNo);
      return res.send({ msg: "Applicants details deleted successfuly", state: true });
    } catch (err) {
      handleErr(res, err);
    }
}

