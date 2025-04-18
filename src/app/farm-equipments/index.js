import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("farm-equipments");

export async function findAllListedEquipments(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createListedEquiment(req, res) {
  const data = req.body;
  const images = req.files;
  try {
    if (images) {
      resize_save(
        {
          file: images.otherImages,
          fileName: data.imageUrls,
          width: null,
          height: null,
        },
        "uploads/projects"
      );
    };
    const record = await Controller.create(data);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    console.log(err, " farms equipments err ")
    handleErr(res, err);
  };
};

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

