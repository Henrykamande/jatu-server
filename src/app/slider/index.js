import SliderController from "../controller.js";
import {
  handleErr,
  resize_save,
  resize_slider_save,
} from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = SliderController("slider");

export async function findAll(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findQuery(req, res) {
  try {
    const records = await Controller.find({ url: req.params.url });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteRecord(req, res) {
  try {
    const record = await Controller.remove(req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByUrl(req, res) {
  try {
    const record = await Controller.findOne({ url: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let recordData = JSON.parse(req.body.slider);
  const images = req.files;
  try {
    const record = await Controller.create(recordData);
    // save cover image
    if (images && images.coverImage) {
      //  measurements 680 X 680
      const fileName = recordData.url + "-" + randomString();
      resize_slider_save(
        {
          file: images.coverImage,
          fileName: fileName,
          width: 1200,
          height: 450,
        },
        "uploads/slider"
      );
      const updated = await Controller.update(
        { coverImage: `${fileName}.webp` },
        record._id
      );
    }
    // end
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function updateRecord(req, res) {
  let recordData = JSON.parse(req.body.slider);
  delete recordData.url;
  const images = req.files;
  try {
    const record = await Controller.update(recordData, req.params.id);
    // save cover image
    if (images && images.coverImage) {
      //  measurements 680 X 680
      const fileName = recordData.url + "-" + randomString();
      resize_save(
        {
          file: images.coverImage,
          fileName: fileName,
          width: 1200,
          height: 450,
        },
        "uploads/slider"
      );
      const updated = await Controller.update(
        { coverImage: `${fileName}.webp` },
        record._id
      );
    }
    // end
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
