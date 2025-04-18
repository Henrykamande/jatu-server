import { v4 as uuidv4 } from 'uuid';
import PropertyController from "../controller.js";
const NumberingController = PropertyController("numbering-series");
import { handleErr, resize_save } from "../../helpers/index";
const { SendEmail } = require("../../helpers/generalmail.js");
var moment = require("moment");


const Controller = PropertyController("upcoming-events");

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

export async function fetchByUuid(req, res) {
  try {
    const record = await Controller.findOne({ eventRandomId: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function joinEvent(req, res) {
  let data = req.body;
  try {
    const content = `
        From: ${data.fullName} 
        
        Phone Number: ${data.phone}

        Email: ${data.email || "Not Filled"} 

        Age: ${data.age}
      
        Nationality: ${data.nationality}

        Gender: ${data.gender}
        
        Meeting No: ${data.serialNo}

        Date ${new Date()}`;

    const subject = `Meeting Joining Request From: ${data.fullName} - (${data.phone})`;
    const title = subject;

    SendEmail({ content: content, subject: subject, title: title });
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}



export async function createRecord(req, res) {
  let data = req.body;
  data.eventRandomId = uuidv4();
  // let orderDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  // data.orderDate = orderDate;

  try {
    const numberRecord = await NumberingController.findOne({ status: "active"});
    data.serialNo = numberRecord.eventNumber;

   const record = await Controller.create(data);

   const updatedNumber = await NumberingController.update({ eventNumber: numberRecord.eventNumber + 1}, numberRecord._id);

    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    console.log(err, "err");
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
