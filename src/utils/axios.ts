import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://devapi.ayoba.me',
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

export const getToken = async (msisdn) => {
  await instance({
    method: 'post',
    url: '/v2/login',
    data: {
      username: 'AAKCPSSMSPE3HZEV3ODUBCLI5IZG3M',
      password: '#$Sou$9EB7}QC,ix*3z~6W/[0(!PA,',
    },
  })
    .then((res) => {
      getUserJid(res.data.access_token, msisdn).then((JID) => {
        console.log(JID);
        console.log(JID);
        deleteUser(res.data.access_token, JID).then((res) => {
          console.log(res);
          console.log('deleting user ');
          return;
        });
      });
    })
    .catch((x) => {
      console.log(x);
      return 'failed';
    });
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
