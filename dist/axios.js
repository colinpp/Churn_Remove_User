"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getToken = exports.getUserJid = void 0;
const axios_1 = require("axios");
const instance = axios_1.default.create({
    baseURL: process.env.BASE_URL,
});
const getUserJid = async (access_token, msisdn) => {
    let userId = null;
    instance.defaults.headers.common = {
        Authorization: `Bearer ${access_token}`,
    };
    await instance({
        method: 'get',
        url: `/v1/users/${msisdn}`,
    }).then((res) => {
        console.log('User ID IS');
        userId = res.data.jid;
        console.log(res);
    });
    return userId;
};
exports.getUserJid = getUserJid;
const getToken = async () => {
    let accessToken = null;
    await instance({
        method: 'post',
        url: '/v2/login',
        data: {
            userName: process.env.USERNAME,
            passWord: process.env.PASSWORD,
        },
    })
        .then((res) => {
        accessToken = res.data.acccess_token;
    })
        .catch((err) => {
        console.log('Error getting token for user' + err);
    });
    return accessToken;
};
exports.getToken = getToken;
const deleteUser = async (access_token, userID) => {
    instance.defaults.headers.common = {
        Authorization: `Bearer ${access_token}`,
    };
    await instance({
        method: 'delete',
        url: `/qa/users/${userID}`,
    })
        .then((res) => {
        console.log(res);
        console.log('Succesfully Deleted');
    })
        .catch((err) => {
        console.log('Error deleting number' + err);
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=axios.js.map