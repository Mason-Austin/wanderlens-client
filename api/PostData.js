import { clientCredentials } from '../utils/client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getMyPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    body: JSON.stringify(
      uid,
    ),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
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

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${payload.id}`, {
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
  getPosts,
  getMyPosts,
  getSinglePost,
  createPost,
  deleteSinglePost,
  updatePost,
};
