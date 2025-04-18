import PropertyController from '../controller.js';
import { handleErr, resize_save } from '../../helpers/index';

const Controller = PropertyController('newsletter');

export async function findAll(req, res) {
    try {
        const records = await Controller.find({});
        return res.send({ records, state: true });
    }
    catch (err) {
        handleErr(res, err);
    }
}

export async function findByUrl(req, res) {
    try {
        const record = await Controller.findOne({ url: req.params.url});
        return res.send({ record, state: true });
    }
    catch (err) {
        handleErr(res, err);
    }
}

export async function findById(req, res) {
    try {
        const record = await Controller.findById(req.params.id);
        return res.send({ record, state: true });
    }
    catch (err) {
        handleErr(res, err);
    }
}

export async function createRecord(req, res) {
    let data = req.body;
    try {
        const record = await Controller.create(data);
        return res.send({ state: true, ResultDesc: 1200 });
    }
    catch (err) {
        handleErr(res, err);
    }
}

export async function editRecord(req, res) {
    const id = req.params.id;
    let data = req.body;
    delete data.url;
    try {
        const record = await Controller.update(data, id);
        return res.send({ state: true, ResultDesc: 1200 });
    }
    catch (err) {
        handleErr(res, err);
    }
}