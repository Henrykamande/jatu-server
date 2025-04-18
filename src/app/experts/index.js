import { v4 as uuidv4 } from 'uuid';
import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("experts");
const CountryController = PropertyController("countries");
const NumberingController = PropertyController("numbering-series");

const { SendEmail } = require("../../helpers/contactmail.js");
const { SendInsuranceEmail } = require("../../helpers/insurancemail.js");

export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function fetchByUuid(req, res) {
  try {
    const record = await Controller.findOne({ expertRandomId: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByCountry(req, res) {
  try {
    const records = await Controller.find({ selectedCountry: req.body.country});
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

export async function createRecord(req, res) {
  try {
    // const content = `
    //     From: ${data.name} 
        
    //     Phone Number: ${data.phone}

    //     Email: ${data.email || "Not Filled"} 
        
    //     Message: ${data.message}

    //     Date ${new Date()}`;

    // const subject = `Website Enquiry From: ${data.name} - (${data.phone})`;
    // const title = subject;

    // SendEmail({ content: data, subject: subject, title: title });

    let expertData = req.body;
    let selectedCountry = expertData.country;
    expertData.selectedCountry = selectedCountry;
    expertData.expertRandomId = uuidv4();

    let selectedZone = expertData.zone;
    expertData.selectedZone = selectedZone;

    const numberRecord = await NumberingController.findOne({ status: "active"});
    expertData.serialNo = numberRecord.expertNumber;
    const expert = await Controller.create(expertData);
    const updatedNumber = await NumberingController.update({ expertNumber: numberRecord.expertNumber + 1}, numberRecord._id);

    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function insuranceEmail(req, res) {
  let data = req.body;
  
  try {
    const subject = `Partnership Enquiry From: ${data.firstName} - (${data.phone})`;
    const title = subject;

    SendInsuranceEmail({ content: data, subject: subject, title: title });
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}
