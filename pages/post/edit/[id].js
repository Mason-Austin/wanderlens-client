import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/PostData';
import PostForm from '../../../components/PostForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { id } = router.query;

  // make a call to the API to get the post data
  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  // pass object to form
  return (<PostForm obj={editItem} />);
}
