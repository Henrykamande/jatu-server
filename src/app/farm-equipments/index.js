import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";

const Controller = PropertyController("farm-equipments");

export async function updateListedEquipment(req, res) {
  const id = req.params.id;
  let data = req.body;
  
  try {
    const updatedEquipment = await Controller.update(data, id);
    return res.send({ updatedEquipment,  state: true, ResultDesc: 1200 });
  } catch (err) {
  handleErr(res, err);
  }
}

export async function findAllListedEquipments(req, res) {
  try {
    const records = await Controller.find({});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteSelectedEquipment(req, res) {
  try {
    await Controller.remove(req.params.id);
    return res.send({ msg: "Deleted successfully", state: true });
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

export async function findEquipmentsBySerialNo(req, res) {
  try {
    const record = await Controller.find({ userSerialNo: req.params.userSerialNo });
    return res.send({ record, state: true });
  } catch (err) {
    console.log(err, " farm equipments fetch by user serialNo err ")
    handleErr(res, err);
  }
}


export async function findEquipmentsById(req, res) {
  try {
    const record = await Controller.findOne({ _id: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    console.log(err, " farm equipments fetch by user serialNo err ")
    handleErr(res, err);
  }
}

// export async function findUserContacts(req, res) {
//   try {
//     const record = await Controller.findOne({ _id: req.params.id });
//     return res.send({ record, state: true });
//   } catch (err) {
//     handleErr(res, err);
//   }
// }

