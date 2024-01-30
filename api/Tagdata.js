import { clientCredentials } from '../utils/client';

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`, {
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

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  getTags,
  getSingleTag,
  createTag,
  deleteSingleTag,
  updateTag,
};
