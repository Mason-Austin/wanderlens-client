import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../../../components/CommentForm';
import { getSingleComment } from '../../../api/CommentData';

export default function EditComment() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleComment(id).then(setEditItem);
  }, [id]);
  return <CommentForm obj={editItem} />;
}
