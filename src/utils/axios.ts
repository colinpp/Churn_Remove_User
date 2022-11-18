import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

export const getUserJid = async (access_token, msisdn) => {
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

export const getToken = async () => {
  let accessToken = null;
  await instance({
    method: 'post',
    url: '/v2/login',
    data: {
      userName: 'AAKCPSSMSPE3HZEV3ODUBCLI5IZG3M',
      passWord: '#$Sou$9EB7}QC,ix*3z~6W/[0(!PA,',
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

export const deleteUser = async (access_token, userID) => {
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
