var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

import UserController from '../controller.js';
import { handleErr, resize_save } from '../../helpers/index';
const User = UserController('users');

var isValidPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
};

var createHash = function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

export async function findAll (req, res) {
    try {
        const records = await User.find({});
        return res.send({ records, ResultCode: 1200, state: true });
    }
    catch (err) {
        handleErr(res, err);
    }
}

async function createUser(user) {

	try {
		const exits = await User.findOne({ phone: user.phone });
		const _emailCheck = await User.findOne({ email: user.email });
		if (_emailCheck) {
			return { msg: 'Email already used', state: false, err: 'Email taken' };
		}
		if (exits) {
			return { msg: 'Phone already used', state: false, err: 'Phone number taken' };
		}

        const pass = user.password;
        
        user.password = createHash(user.password);
		const _user = await User.create(user);
		return { state: true, err: null, user: _user, msg: 'success' };
	} catch (err) {
		console.log(err);
		return { state: false, err, msg: `Server error` };
	}
}

export async function register(req, res, next) {
	const userData = req.body;

	try {
		const { user, err, state, msg } = await createUser(userData);
		if (state) {
			const { data, token } = await rawLogin(user);
			return res.send({ state: true, ResultCode: 1200, token, user: data, msg: 'Success' });
		}
		return res.send({ msg, state: false });
	}
	catch (err) {
        return handleErr(res, err);
	}
}

export async function login(req, res) {
    const { email, password } = req.body;
    
	// find the user
	try {
		const user = await User.findOne({ email: email })
		if (!user) {
			//user not found
			return res.send({ state: false, msg: 'Authentication failed. User not found.' });
		} else {
			// check if password matches
			if (!isValidPassword(user, password)) {
				// password not valid
				return res.send({ state: false, msg: 'Invalid Credentials. ***' });
			} else {
				const data = {
					first_name: user.first_name,
					last_name: user.last_name,
					_id: user._id,
                    email: user.email,
                    phone: user.phone,
					role: user.role
                }

                const secret = 'sdgjfskdfskdfskfy7wywfsdukjfhks6aDFGHJ6j234';
				const token = jwt.sign(data, secret);
				// return the information including token as JSON
				return res.send({
                    state: true,
                    ResultCode: 1200,
					msg: 'success',
					token: token,
					user: data
				});
			}
		}
	} catch (err) {
		console.log(err);
		return res.send({ state: false, err: err })
	}
};

async function rawLogin(user) {
	try {
		const data = {
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			location: user.location,
			house: user.house,
			role: user.role
        }
        
        const secret = 'sdgjfskdfskdfskfy7wywfsdukjfhks6aDFGHJ6j234';
		const token = jwt.sign(data, secret);
		return { token, data };
	} catch (err) {
		throw (err);
	}
};