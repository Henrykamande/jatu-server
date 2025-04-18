import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = PropertyController("seo");

const DefaultMeta = {
  url: "Ruaka Drinks Delivery",
  metaTitle: "Ruaka Drinks Delivery",
  h1: "Ruaka Drinks Delivery",
  h2: "Ruaka Drinks Delivery",
  pageDescription: "Ruaka Drinks Delivery",
  metaDescription: "Ruaka Drinks Delivery",
  pageTitle: "Ruaka Drinks Delivery",
  pageContent: "Ruaka Drinks Delivery",
  footerContent: "Ruaka Drinks Delivery",
  carouselImages: [],
  image: "",
  keywords: [],
};

// const DefaultMeta = {
//   url: "",
//   metaTitle: "Hotmax online shop",
//   h1: "Hotmax online shop",
//   h2: "Hotmax online shop",
//   pageDescription: "Hotmax online shop",
//   metaDescription: "Hotmax online shop",
//   pageTitle: "Hotmax online shop",
//   pageContent: "Hotmax online shop",
//   footerContent: "Hotmax online shop",
//   carouselImages: [],
//   image: "",
//   keywords: [],
// };

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
    const record = await Controller.findOne({ _id: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findMeta(url) {
  try {
    const meta = await Controller.findOne({ url: url });
    if (meta) {
      return meta;
    }
    return DefaultMeta;
  } catch (err) {
    return DefaultMeta;
  }
}

export async function findByCategory(req, res) {
  try {
    const records = await Controller.find({ category_url: req.params.url });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let recordData = JSON.parse(req.body.product);
  recordData.footerContent = req.body.content;
  const images = req.files;
  try {
    const record = await Controller.create(recordData);
    // save cover image
    if (images && images.coverImage) {
      //  measurements 680 X 680
      const fileName = recordData.url + "-" + randomString();
      resize_save(
        {
          file: images.coverImage,
          fileName: fileName,
          width: null,
          height: null,
        },
        "uploads/banners"
      );
      const updated = await Controller.update(
        { banner: `${fileName}.webp` },
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
  let recordData = JSON.parse(req.body.product);
  recordData.footerContent = req.body.content;
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
          width: null,
          height: null,
        },
        "uploads/banners"
      );
      const updated = await Controller.update(
        { cover_image: `${fileName}.webp` },
        record._id
      );
    }
    // end

    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
