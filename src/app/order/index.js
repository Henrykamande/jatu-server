import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
const { SendEmail } = require("../../helpers/sendmail.js");
var moment = require("moment");

const Controller = PropertyController("order");

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
  let data = JSON.parse(req.body.order);
  let orderDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  data.orderDate = orderDate;

  try {
    const record = await Controller.create(data);

    const subject = `New order - From Website: #${orderDate} `;
    const title = subject;

    SendEmail({
      content: data,
      products: data.products,
      subject: subject,
      title: title,
    });
    // end of mail

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
