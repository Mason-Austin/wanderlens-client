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

  const getPost = (postId) => {
    getSinglePost(postId).then(setPost);
  };
  // Fetch the post data when component mounts or id changes
  useEffect(() => {
    if (id) {
      getPost(id);
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
          background: 'bisque',
          boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
          border: 'antiquewhite 10px solid',
          borderRadius: '5px',
        }}
      >
        <Card.Title
          style={{
            alignSelf: 'center',
          }}
        >{viewPost.title}
        </Card.Title>
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
          {(user.id === viewPost.user?.id) ? (
            <Button
              variant="primary"
              style={{
                background: 'goldenrod', border: 'goldenrod', textShadow: '0 0 2px #000', marginLeft: '10px',
              }}
              onClick={toggleTagsModal}
            >Tags
            </Button>
          ) : (
            <Button variant="warning" size="sm" disabled style={{ marginLeft: '10px' }}>
              Tags
            </Button>
          )}
          <Card.Text>Posted by: <b>{viewPost.user?.name}</b></Card.Text>
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
        onClick={() => router.push({ pathname: '/comment/[id]', query: { id: viewPost.id } })}
        variant="primary"
        style={{
          background: 'goldenrod', border: 'goldenrod', marginTop: '10px', textShadow: '0 0 2px #000',
        }}
      >
        Add Comment
      </Button>

      {/* TagsModal for editing tags */}
      {showTagsModal && <TagsModal post={viewPost} show={showTagsModal} onHide={toggleTagsModal} onUpdate={getPost} />}
    </>
  );
}
