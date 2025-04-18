const sharp = require("sharp");

export const handleErr = function (res, err, msg = "Server error: Failed") {
  return res.send({ err, state: false, msg });
};

export function resize_save(
  data = { file: null, fileName: "", width: null, height: null },
  location = "uploads"
) {
  return new Promise(function (resolve, reject) {
    //  console.log(data, 'is image data');
    const name = `./public/${location}/${data.fileName}.webp`;
    //console.log(data.file);

    return sharp(data.file.data)
      .rotate()
      .resize(data.width, data.height)
      .webp()
      .toFile(name)
      .then(function (info) {
        return resolve(info);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}

export function resize_slider_save(
  data = { file: null, fileName: "", width: null, height: null },
  location = "uploads"
) {
  return new Promise(function (resolve, reject) {
    //  console.log(data, 'is image data');
    const name = `./public/${location}/${data.fileName}.webp`;
    //console.log(data.file);

    return sharp(data.file.data)
      .rotate()
      .webp()
      .toFile(name)
      .then(function (info) {
        return resolve(info);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}
