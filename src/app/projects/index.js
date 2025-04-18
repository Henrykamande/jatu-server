import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = PropertyController("projects");
const CountryController = PropertyController("countries");

export async function deleteRecord(req, res) {
  try {
    const record = await Controller.remove(req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findAll(req, res) {
  try {
    const meta = {
      url: "Shambani Connect",
      metaTitle: "Shambani Connect",
      h1: "Shambani Connect",
      h2: "Shambani Connect",
      pageDescription: "Shambani Connect",
      metaDescription: "Shambani Connect",
      pageTitle: "Shambani Connect",
      pageContent: "Shambani Connect",
      footerContent: "Shambani Connect",
      carouselImages: [],
      image: "",
      keywords: [],
    };
    const records = await Controller.find({});
    return res.send({ records, meta, state: true }); 
  } catch (err) {
    handleErr(res, err);
  }
}

export async function activeProjects(req, res) {
  try {
    const meta = {
      url: "Shambani Connect",
      metaTitle: "Shambani Connect",
      h1: "Shambani Connect",
      h2: "Shambani Connect",
      pageDescription: "Shambani Connect",
      metaDescription: "Shambani Connect",
      pageTitle: "Shambani Connect",
      pageContent: "Shambani Connect",
      footerContent: "Shambani Connect",
      carouselImages: [],
      image: "",
      keywords: [],
    };
    const records = await Controller.find({ active: true});
    return res.send({ records, meta, state: true }); 
  } catch (err) {
    handleErr(res, err);
  }
}

export async function findByUrl(req, res) {
  try {

    const meta = {
      url: "Shambani Connect",
      metaTitle: "Shambani Connect",
      h1: "Shambani Connect",
      h2: "Shambani Connect",
      pageDescription: "Shambani Connect",
      metaDescription: "Shambani Connect",
      pageTitle: "Shambani Connect",
      pageContent: "Shambani Connect",
      footerContent: "Shambani Connect",
      carouselImages: [],
      image: "",
      keywords: [],
    };
    let record = await Controller.findOne({ url: req.params.id });

    let projectRecord = record;

    let countries = record.countries;
    let projectCountries = [];
    if(countries.length >= 1) {
      for(const countryId of countries) {
        const country = await CountryController.findById(countryId);
        projectCountries.push(country);
      }
    }

    let projects = record.relatedProjects;
    let relatedProjects = [];
    if(projects.length >= 1) {
      for(const projectId of projects) {
        const project = await Controller.findById(projectId);
        if(project && project.active == true) {
          relatedProjects.push(project);
        }
      }
    }

    return res.send({ record, projectCountries, relatedProjects, meta, state: true });
  } catch (err) {
    console.log(err, 'p error');
    handleErr(res, err);
  }
}

export async function findById(req, res) {
  try {
    const record = await Controller.findById(req.params.id);
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}
export async function fetchbyCategory(req, res) {
  try {
    let record = await Controller.findOne({ url: req.params.id });
    return res.send({ record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  console.log(req.files)
  let recordData = JSON.parse(req.body.product);
  recordData.content = req.body.content;
  recordData.sec_one = req.body.sec_one;
  recordData.sec_two = req.body.sec_two;
  recordData.insurance = req.body.insurance;
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
        "uploads/projects"
      );
      const updated = await Controller.update(
        { coverImage: `${fileName}.webp` },
        record._id
      );
    }
    // end
// 
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
          "uploads/projects"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/projects"
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

export async function updateStatus(req, res) {
  let recordData = JSON.parse(req.body.product);
  try {
    const record = await Controller.update(recordData, req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function updateRecord(req, res) {
  let recordData = JSON.parse(req.body.product);
  recordData.content = req.body.content;
  recordData.sec_one = req.body.sec_one;
  recordData.sec_two = req.body.sec_two;
  recordData.insurance = req.body.insurance;
  
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
        "uploads/projects"
      );
      const updated = await Controller.update(
        { coverImage: `${fileName}.webp` },
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
          "uploads/projects"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/projects"
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
