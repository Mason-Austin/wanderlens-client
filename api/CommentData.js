import { clientCredentials } from '../utils/client';

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comment`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getMyComments = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'GET',
    body: JSON.stringify(uid),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

export {
  getComments, getMyComments, getSingleComment, createComment, deleteSingleComment, updateComment,
};
