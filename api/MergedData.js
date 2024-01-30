import { getSinglePost, getPostsComments } from './PostData';

// DON'T USE JUST YET, STILL BEING WORKED ON
const viewPostDetails = (postId) => new Promise((resolve, reject) => {
  Promise.all([getSinglePost(postId), getPostsComments(postId)])
    .then(([postObject, postCommentsArray]) => {
      resolve({ ...postObject, comments: postCommentsArray });
    }).catch((error) => reject(error));
});

// filler data, possiblly Post'sComments api (authorsBooks), to make an array of comment objects. example below...

// getSingleBook(bookFirebaseKey)
// .then((bookObject) => {
//   getSingleAuthor(bookObject.author_id)
//     .then((authorObject) => {
//       resolve({ ...bookObject, authorObject });
//     });
// }).catch((error) => reject(error));

export default viewPostDetails;
