import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = PropertyController("products");
const CategoryController = PropertyController("categories");
const SubCategoryController = PropertyController("subcategories");
const BrandController = PropertyController("brands");
// define model
const Model = require("./model.js");
// end of model
import { findMeta } from "../seo/index";
import { Query } from "mongoose";

export async function findAll(req, res) {
  try {
    const meta = {
      url: "Jatu Market",
      metaTitle: "Jatu Market",
      h1: "Jatu Market",
      h2: "Jatu Market",
      pageDescription: "Jatu Market",
      metaDescription: "Jatu Market",
      pageTitle: "Jatu Market",
      pageContent: "Jatu Market",
      footerContent: "Jatu Market",
      carouselImages: [],
      image: "",
      keywords: [],
    };
    const records = await Controller.find({  });

    return res.send({ records, meta, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

// filters
export async function filterByCategory(req, res) {
  try {
    let query = {};

    let categoryQuery = {};
    if (req.body.category) {
      categoryQuery = {
        subcategory_url: req.body.category,
      };
      query = { ...query, ...categoryQuery };
    }

    // sort queries
    let sortQueries = {};
    if (req.body.alcoholFilter) {
      let alcFl = {};
      const alcoholFilter = req.body.alcoholFilter;
      if (alcoholFilter == "lh") {
        alcFl = { alcohol: 1 };
        sortQueries = { ...sortQueries, ...alcFl };
      }

      if (alcoholFilter == "hl") {
        alcFl = { alcohol: -1 };
        sortQueries = { ...sortQueries, ...alcFl };
      }
    }

    // price filter
    if (req.body.priceFilter) {
      let priceFl = {};
      const priceFilter = req.body.priceFilter;
      if (priceFilter == "lh") {
        priceFl = { "prices.price": 1 };
        sortQueries = { ...sortQueries, ...priceFl };
      }

      if (priceFilter == "hl") {
        priceFl = { "prices.price": -1 };
        sortQueries = { ...sortQueries, ...priceFl };
      }
    }

    if (req.body.sizeFilter != null) {
      let sizeQuery = { "prices.volume": req.body.sizeFilter };
      query = { ...query, ...sizeQuery };
    }

    let records = [];

    // end of sort queries
    if (Object.entries(sortQueries).length === 0) {
      records = await Model.aggregate([
        {
          $match: query,
        },
      ])
        .collation({ locale: "en_US", numericOrdering: true })
        .exec();
    } else {
      records = await Model.aggregate([
        {
          $sort: sortQueries,
        },
        {
          $match: query,
        },
      ])
        .collation({ locale: "en_US", numericOrdering: true })
        .exec();
    }

    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteProduct(req, res) {
  try {
    const records = await Controller.remove(req.params.id);
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function search(req, res) {
  const keyword = req.params.keyword;
  const query = { name: new RegExp(keyword, "i") };
  try {
    const searchResults = await Controller.search({ ...query });
    return res.send({ state: true, searchResults });
  } catch (err) {
    console.log(err);
    res.send({ state: false, err: "Server error" });
  }
}

export async function offerProducts(req, res) {
  try {
    const records = await Controller.find({ offer: true });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function clearanceProducts(req, res) {
  try {
    const records = await Controller.find({ clearance: true });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function trendingProducts(req, res) {
  try {
    const records = await Controller.find({ trending: true });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findGiftPacks(req, res) {
  try {
    const records = await Controller.find({ giftpack: true });
    return res.send({ records, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByUrl(req, res) {
  try {
    const record = await Controller.findOne({ url: req.params.id });
    let query = {};
    if (record.subcategory_url == undefined) {
      query = { category_url: record.category_url, url: { $ne: record.url } };
    } else {
      query = {
        subcategory_url: record.subcategory_url,
        url: { $ne: record.url },
      };
    }

    const related = await Controller.findLimited(query, 4);
    const relatedProducts = related.filter((item) => {
      return item.name !== record.name;
    });
    return res.send({ record, relatedProducts, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByCategory(req, res) {
  try {
    const records = await Controller.find({
      category_url: req.params.url,
    });

    // get brands
    const brands = await BrandController.find({ categoryUrl: req.params.url });
    // get seo data
    const meta = {
      url: "Jatu Market",
      metaTitle: "Jatu Market",
      h1: "Jatu Market",
      h2: "Jatu Market",
      pageDescription: "Jatu Market",
      metaDescription: "Jatu Market",
      pageTitle: "Jatu Market",
      pageContent: "Jatu Market",
      footerContent: "Jatu Market",
      carouselImages: [],
      image: "",
      keywords: [],
    };
    return res.send({ records, meta, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByBrand(req, res) {
  try {
    const records = await Controller.find({
      brand_url: req.params.url,
      giftpack: false,
    });

    const brand = await BrandController.findOne({ url: req.params.url });

    const meta = await findMeta(`/${req.params.url}`);
    return res.send({ records, brand, meta, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function subcategoryProducts(req, res) {
  const category = req.params.category;
  try {
    let productQuery = {};
    productQuery = { category_url: category };

    const records = await Controller.find(productQuery);
    // get seo data

    //get seo data
    const meta = {
      url: "Jatu Market",
      metaTitle: "Jatu Market",
      h1: "Jatu Market",
      h2: "Jatu Market",
      pageDescription: "Jatu Market",
      metaDescription: "Jatu Market",
      pageTitle: "Jatu Market",
      pageContent: "Jatu Market",
      footerContent: "Jatu Market",
      carouselImages: [],
      image: "",
      keywords: [],
    };

    return res.send({ state: true, brands, records, meta });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function updateSection(req, res) {
  let data = req.body;
  try {
    const record = await Controller.update(data, req.params.id);
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function updateStatus(req, res) {
  let data = req.body;
  try {
    const record = await Controller.update(data, req.params.id);
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let recordData = JSON.parse(req.body.product);

  // cet category
  if (recordData.category_url) {
    let category = await CategoryController.findOne({
      url: recordData.category_url,
    });
    recordData.category = category._id;
  }

  if (recordData.subcategory_url) {
    let subcategory = await SubCategoryController.findOne({
      url: recordData.subcategory_url,
    });

    recordData.subcategory = subcategory._id;
  }

  if (recordData.brand_url) {
    let brand = await BrandController.findOne({ url: recordData.brand_url });
    recordData.brand = brand._id;
  }

  recordData.content = req.body.content;
  recordData.giftpack = req.body.giftpack;
  const images = req.files;
  try {
    const record = await Controller.create(recordData);
    // save cover image
    if (images && images.coverImage) {
      //  measurements 680 X 680
      const fileName = recordData.url;
      resize_save(
        {
          file: images.coverImage,
          fileName: fileName,
          width: null,
          height: null,
        },
        "uploads/products"
      );
      const updated = await Controller.update(
        { cover_image: `${fileName}.webp` },
        record._id
      );
    }
    // end

    // other images
    if (req.files && req.files["otherImages"]) {
      const otherImages = req.files.otherImages;
      const file_paths = [];
      if (typeof otherImages.name !== "undefined") {
        const fileName = recordData.url + "-" + randomString();
        const filepath = `${fileName}.webp`;
        file_paths.push(filepath);
        resize_save(
          {
            file: images.otherImages,
            fileName: fileName,
            width: null,
            height: null,
          },
          "uploads/products"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/products"
          );
        }
      }
      // update database
      const updated_property = await Controller.update(
        { otherImages: file_paths },
        record._id
      );
      // end of database
    }
    // end of other images

    return res.send({ state: true });
  } catch (err) {
    console.log(err, 'product error');
    handleErr(res, err);
  }
}

export async function updateRecord(req, res) {
  let recordData = JSON.parse(req.body.product);
  recordData.content = req.body.content;
  recordData.giftpack = req.body.giftpack;
  let imageUrl = recordData.url;
  delete recordData.url;
  // cet category
  if (recordData.category_url) {
    let category = await CategoryController.findOne({
      url: recordData.category_url,
    });
    recordData.category = category._id;
  }

  if (recordData.subcategory_url) {
    let subcategory = await SubCategoryController.findOne({
      url: recordData.subcategory_url,
    });

    recordData.subcategory = subcategory._id;
  }

  if (recordData.brand_url) {
    let brand = await BrandController.findOne({ url: recordData.brand_url });
    recordData.brand = brand._id;
  }
  // end
  const images = req.files;
  try {
    const record = await Controller.update(recordData, req.params.id);
    // save cover image
    if (images && images.coverImage) {
      //  measurements 680 X 680
      const fileName = imageUrl;
      resize_save(
        {
          file: images.coverImage,
          fileName: fileName,
          width: null,
          height: null,
        },
        "uploads/products"
      );
      const updated = await Controller.update(
        { cover_image: `${fileName}.webp` },
        record._id
      );
    }
    // end

    // other images
    if (req.files && req.files["otherImages"]) {
      const otherImages = req.files.otherImages;
      const file_paths = [];
      if (typeof otherImages.name !== "undefined") {
        const fileName = imageUrl;
        const filepath = `${fileName}.webp`;
        file_paths.push(filepath);
        resize_save(
          {
            file: images.otherImages,
            fileName: fileName,
            width: null,
            height: null,
          },
          "uploads/products"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/products"
          );
        }
      }
      // update database
      const updated_property = await Controller.update(
        { otherImages: file_paths },
        record._id
      );
      // end of database
    }
    // end of other images

    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
