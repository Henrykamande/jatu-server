export default function (modelName) {
  const Model = require(`./${modelName}/model.js`);

  return {
    getSome() { },
    search(query) {
      return Model.find(query)
        .populate("category")
        .populate("subcategory")
        .sort({ created: "desc" })
        .limit(8)
        .exec();
    },
    getAll() {
      return Model.find({}).exec();
    },
    findListings(query, num) {
      return Model.find(query)
        .populate("owner")
        .sort({ created: "desc" })
        .limit(num)
        .exec();
    },

    find(query) {
      return Model.find(query)
        .populate("farm")
        .populate("category")
        .populate("subcategory")
        .populate("project")
        .populate("country")
        .populate("zone")
        .populate("costitem")
        .populate("investor")
        .populate("owner")
        .sort({ _id: "desc" })
        .exec();
    },
    findLimited(query, num) {
      return Model.find(query)
        .populate("category")
        .populate("subcategory")
        .sort({ created: "desc" })
        .limit(num)
        .exec();
    },
    findOne(query) {
      return Model.findOne(query) 
      .populate("country")
      .populate("zone")
      .exec();
    },
    findLatest(query) {
      return Model.findOne(query).sort({$natural:1}).exec();
    },
    findById(id) {
      return Model.findById(id).exec();
    },

    create(_record) {
      let newRecord = new Model(_record);

      return new Promise((resolve, reject) => {
        newRecord.save(function (err, record) {
          if (err) {
            reject(err);
          }

          resolve(record);
        });
      });
    },

    update(record, id) {
      const query = { _id: id };
      const update = record;
      const options = { new: true };

      return Model.findOneAndUpdate(query, update, options).exec();
    },

    updateArray(query, id) {
      return Model.findByIdAndUpdate(id, query, {
        safe: true,
        upsert: true,
      }).exec();
    },

    remove(id) {
      return Model.findByIdAndRemove(id).exec();
    },

    removeMany(query) {
      return Model.deleteMany(query).exec();
    },

    findInArray(field, item, limit) {
      //  console.log(field, item, limit);
      /* find a record with $item in $field array */
      return Model.find({ [field]: { $in: [item] } })
        .limit(limit)
        .exec();
    },

    productAds(query, limit) {
      // fetch ads
      return Model.find(query).limit(limit).exec();
    },

    findProduct(query, num = 100) {
      return Model.find(query)
        .populate({
          path: "company",
          select: "name owner url location verified phone website",
        })
        .limit(num)
        .exec();
    },

    productById(query) {
      return Model.findOne(query)
        .populate({
          path: "company",
          select: "name owner url county location verified phone website",
        })
        .exec();
    },

    findPaginate(query, { page, limit }) {
      const sort = { category: -1, subcategory: 1 };

      const options = {
        populate: [
          {
            path: "company",
            select: "name url location county verified phone website owner",
          },
        ],
        page: page,
        limit: limit,
        sort,
      };
      return Model.paginate(query, options);
    },
  };
}
