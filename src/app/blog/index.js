import PropertyController from "../controller.js";
import { handleErr, resize_save } from "../../helpers/index";
import { randomString } from "../../helpers/common.js";

const Controller = PropertyController("blog");

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

export async function deleteRecord(req, res) {
  try {
    const record = await Controller.remove(req.params.id);
    return res.send({ state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function deleteAttachment(req, res) {
  try {
    const record = await Controller.findById(req.body._id);
    let currentArray = record.attachments;
    let updatedArray = currentArray.filter(
      (item) => item.fileName !== req.body.fileName
    );

    // unlink image
    // let path = `./public/uploads/attachments/${req.body.fileName}`;
    // fs.unlinkSync(path);
    // end

    // update attachments array
    const updated = await Controller.update(
      { attachments: updatedArray },
      req.body._id
    );
    // end
    return res.send({ state: true, record: updated });
  } catch (err) {
    console.log(err, "error shit");
    handleErr(res, err);
  }
}

function getFileExtension(filename) {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

export async function createAttachment(req, res) {
  let title = req.body.title;
  let _id = req.body._id;
  let imageName = req.body.imageName;
  console.log(_id, "blog id");
  const images = req.files;

  try {
    const record = await Controller.findById(_id);
    // save  image

    if (images && images.attachmentImage) {
      //  measurements 680 X 680
      let carDoc = images.attachmentImage;
      const ext = getFileExtension(carDoc.name);
      const fileName = `${title}.${ext}`;

      if (
        ext == "png" ||
        ext == "jpg" ||
        ext == "jpeg" ||
        ext == "gif" ||
        ext == "webp"
      ) {
        resize_save(
          {
            file: images.attachmentImage,
            fileName: fileName,
          },
          "uploads/attachments"
        );
      } else {
        carDoc.mv("./public/uploads/attachments/" + fileName);
      }

      // push image to array

      let details = { title: imageName, fileName: fileName };
      let currentArray = record.attachments;
      let newArray = [];
      newArray.push(details);
      let updatedArray = [...currentArray, ...newArray];
      // end
      const updated = await Controller.update(
        { attachments: updatedArray },
        _id
      );
    }
    return res.send({ state: true });
  } catch (err) {
    console.log(err);
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

export async function createComment(req, res) {
  try {
    const data = req.body;
    const blog = await Controller.findById(data.blogId);
    const comments = blog.comments;

    const LineNum = new Date().getTime();

    const details = {
      name: data.name,
      email: data.email,
      website: data.website,
      message: data.message,
      LineNum: LineNum,
    };

    comments.push(details);

    const record = await Controller.update({ comments: comments }, data.blogId);
    return res.send({ record: record, state: true });
  } catch (err) {
    handleErr(res, err);
  }
}

export async function createRecord(req, res) {
  let recordData = JSON.parse(req.body.product);
  recordData.content = req.body.content;
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
        "uploads/blog"
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
          "uploads/blog"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/blog"
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

export async function updateRecord(req, res) {
  let recordData = JSON.parse(req.body.product);
  recordData.content = req.body.content;
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
        "uploads/blog"
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
          "uploads/blog"
        );
      } else {
        for (const file of otherImages) {
          const fileName = recordData.url + "-" + randomString();
          const filepath = `${fileName}.webp`;
          file_paths.push(filepath);
          resize_save(
            { file: file, fileName: fileName, width: null, height: null },
            "uploads/blog"
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
    console.log(err, "err");
    handleErr(res, err);
  }
}
