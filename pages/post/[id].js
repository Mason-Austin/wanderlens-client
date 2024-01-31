/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Comment from '../../components/Comment';
import { getSinglePost } from '../../api/PostData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPost() {
  const [viewPost, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getSinglePost(id).then((data) => setPost(data));
    }
  }, [id]);

  if (!viewPost) {
    return <div>Loading...</div>;
  }
  console.warn(viewPost);
  // Handlers for edit and delete actions
  const handleEdit = (commentId) => {
    // Logic to handle editing a comment
    console.warn('Edit comment with id:', commentId);
  };

  const handleDelete = (commentId) => {
    // warnic to handle deleting a comment
    console.warn('Delete comment with id:', commentId);
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

          <Card.Text>
            Tags: {viewPost.tags.map((tag) => tag.label).join(', ')}
          </Card.Text>
          <Card.Text>Posted by: {user.name}</Card.Text>
        </Card.Body>
      </Card>

      {/* Comments list */}
      {viewPost.comments && viewPost.comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          isUserComment={comment.user === id}
          onEdit={() => handleEdit(comment.id)}
          onDelete={() => handleDelete(comment.id)}
        />
      ))}

      {/* Add Comment Button */}
      <Button variant="primary" style={{ marginTop: '10px' }}>
        Add Comment
      </Button>
    </>
  );
}
