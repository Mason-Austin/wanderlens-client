import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePost } from '../api/PostData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObject, onUpdate }) {
  const { user } = useAuth();
  const [likes, setlikes] = useState(false);
  const deleteThisPost = () => {
    if (window.confirm(`Do you want to Delete the Post ${postObject.title}?`)) {
      deleteSinglePost(postObject.id).then(() => onUpdate());
    }
  };

  const editMyPost = () => (user.id === postObject.user?.id ? (
    <Button variant="outline-info" style={{ boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }}>
      EDIT
    </Button>
  ) : (''));

  return (
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
      <Card.Img
        variant="top"
        onDoubleClick={() => setlikes(!likes)}
        src={postObject.image_url}
        alt={postObject.name}
        style={{
          height: '100%',
          width: '100%',
          boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)',
          objectFit: 'fill',
        }}
      />
      <Card.Body>
        <Card.Title>{postObject.title}</Card.Title>
        <i className="fa-regular fa-heart" />
        {/* DYNAMIC LINK TO VIEW THE POST DETAILS  */}
        <Link href={`/post/${postObject.id}`} passHref>
          <Button variant="warning" className="m-2" style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}>
            VIEW
          </Button>
        </Link>

        {/* DYNAMIC LINK TO EDIT THE POST DETAILS  */}
        <Link href={`/post/edit/${postObject.id}`} passHref>
          {editMyPost()}
        </Link>
        {(user.id === postObject.user?.id) ? (
          <Button variant="outline-danger" style={{ boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }} onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
        ) : ('')}
        <h5>
          {likes ? '💛' : ' 🤍'}
        </h5>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObject: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
