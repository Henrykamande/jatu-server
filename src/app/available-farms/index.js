import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { v4 as uuidv4 } from 'uuid';

const Controller = PropertyController("available-farms");
const SubCategoryController = PropertyController("subcategories");
const CountryController = PropertyController("countries");
const NumberingController = PropertyController("numbering-series");

export async function findByCountry(req, res) {
  try {
    const country = await CountryController.findOne({ name: req.body.country});
    const records = await Controller.find({ country: country._id});
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

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
    const record = await Controller.findOne({ farmRandomId: req.params.id });
    return res.send({ record, state: true });
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

export async function findFarmById(req, res) {
  try {
    const record = await Controller.findOne({ _id: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
};

// Find farm by serial no.
export async function findFarmBySerialNo(req, res) {
  try {
    const record = await Controller.findOne({ serialNo: req.params.serialNo });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findSubs(req, res) {
  try {
    const records = await Controller.find({ categoryUrl: req.params.url });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  const uuid = uuidv4();
  let data = req.body;
  data.farmRandomId = uuid;
  const existingFarm = await Controller.findOne({ country: data.country, zone: data.zone});

  try {
      const numberRecord  = await NumberingController.findOne({ status: "active"});

      var nextNumber = 0;
      if(numberRecord == null) {
        var numberData = {
          farmNumber: 1,
          status: "active"
        };
        var numberingDetails = await NumberingController.create(numberData);
        nextNumber = 1;
      }

      nextNumber = numberRecord.farmNumber;
      var farmNumber = "FC-" + nextNumber;
      console.log(farmNumber, "Next farm Number")
      data.serialNo = farmNumber;
      
      const record = await Controller.create(data);
      const updatedNumber = await NumberingController.update({ farmNumber: numberRecord.farmNumber + 1}, numberRecord._id);
      return res.send({ state: true, ResultDesc: 1200 });
    
  } catch (err) {
    console.log(err, " farms err ")
    handleErr(res, err);
  }
}

export async function addLand(req, res) {
  const id = req.params.id;
  let data = req.body;
  const acres = data.acres;

  const land = await Controller.findById(id);

  let newQty = land.acres + parseInt(acres);

  const details = { acres: newQty };

  try {
    const record = await Controller.update(details, id);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function reduceLand(req, res) {
  const id = req.params.id;
  let data = req.body;
  const acres = data.acres;
  
  const land = await Controller.findById(id);

  let newQty = land.acres - parseInt(acres);

  const details = { acres: newQty };

  try {
    const record = await Controller.update(details, id);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}


export async function editRecord(req, res) {
  const id = req.params.id;
  let data = req.body;
  if(data.country.name) {
    const countryId = data.country._id;
    delete data.country;
    data.country = countryId;
  }

  if(data.zone.name) {
    const zoneId = data.zone._id;
    delete data.zone;
    data.zone = zoneId;
  }

  try {
    const record = await Controller.update(data, id);
    return res.send({ state: true, ResultDesc: 1200 });
  } catch (err) {
    handleErr(res, err);
  }
}
