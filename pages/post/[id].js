/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Comment from '../../components/Comment';
import { getSinglePost } from '../../api/PostData';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleComment } from '../../api/CommentData';
import TagsModal from '../../components/TagsModal';

export default function ViewPost() {
  const [viewPost, setPost] = useState(null);
  const [showTagsModal, setShowTagsModal] = useState(false); // State to control TagsModal visibility
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  // Fetch the post data when component mounts or id changes
  useEffect(() => {
    if (id) {
      getSinglePost(id).then(setPost);
    }
  }, [id]);

  // If the post hasn't been loaded yet
  if (!viewPost) {
    return <div>Loading...</div>;
  }

  // Function to toggle the visibility of the TagsModal
  const toggleTagsModal = () => setShowTagsModal(!showTagsModal);

  // Handlers for editing and deleting comments
  const handleEdit = (commentId) => {
    router.push(`/comment/edit/${commentId}`);
  };

  const handleDelete = (commentId, commentContent) => {
    if (window.confirm(`Do you want to Delete this comment: ${commentContent}?`)) {
      deleteSingleComment(commentId).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Card
        style={{
          width: '18rem',
          margin: '10px',
          background: 'grey',
          boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
        }}
      >
        <Card.Title>{viewPost.title}</Card.Title>
        <Card.Img
          variant="top"
          src={viewPost.image_url}
          alt={viewPost.title}
          style={{
            boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)',
            objectFit: 'contain',
          }}
        />
        <Card.Body>
          <Card.Text>Tags: {viewPost.tags.map((tag) => tag.label).join(', ')}</Card.Text>
          <Button variant="primary" onClick={toggleTagsModal}>Tags</Button>
          <Card.Text>Posted by: {user.name}</Card.Text>
        </Card.Body>
      </Card>

      {/* Comments list */}
      {viewPost.comments && viewPost.comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          isUserComment={comment.user.id === user.id}
          onEdit={() => handleEdit(comment.id)}
          onDelete={() => handleDelete(comment.id, comment.content)}
          commentUser={comment.user}
        />
      ))}

      <Button
        onClick={() => router.push('/comment/[id]', { query: { id: viewPost.id } })}
        variant="primary"
        style={{ marginTop: '10px' }}
      >
        Add Comment
      </Button>

      {/* TagsModal for editing tags */}
      {showTagsModal && <TagsModal post={viewPost} show={showTagsModal} onHide={toggleTagsModal} />}
    </>
  );
}
