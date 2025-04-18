import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("agri-investors");
const FarmController = PropertyController("requested-farms");
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
    let investorData = req.body.investor;
    let selectedCountry = investorData.country;
    investorData.selectedCountry = selectedCountry;

    let selectedZone = investorData.zone;
    investorData.selectedZone = selectedZone;

    const numberRecord = await NumberingController.findOne({ status: "active"});
    investorData.serialNo = numberRecord.investorNumber;

    const investor = await Controller.create(investorData);
    const updatedNumber = await NumberingController.update({ investorNumber: numberRecord.investorNumber + 1}, numberRecord._id);

    let farmDetails = req.body.farm;
    farmDetails.investor = investor._id;
    farmDetails.selectedCountry = selectedCountry;
    farmDetails.selectedZone = farmDetails.zone;
    farmDetails.selectedProject = farmDetails.project;

    const farm = await FarmController.create(farmDetails);

    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    console.log(err);
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
