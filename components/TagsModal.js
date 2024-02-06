/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addTagToPost, getTags, removeTagfromPost } from '../api/Tagdata';

function TagsModal({ post, onUpdate }) {
  // Simulating tags with a state
  const [tags, setTags] = useState([]); // Initial tags

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  // Function to handle deleting the last tag
  const deleteTag = (tagId, postId) => {
    console.warn('deleted tag', tagId);
    removeTagfromPost(postId, tagId).then(onUpdate(postId));
  };

  const addTag = (tagId, postId) => {
    console.warn('added tag ', tagId);
    addTagToPost(postId, tagId).then(onUpdate(postId));
  };

  const isTagInPost = (postTags, tag) => postTags.some((postTag) => postTag.id === tag.id);

  const tagsController = (postTags, tag) => {
    const tagExists = isTagInPost(postTags, tag);
    if (tagExists) {
      deleteTag(tag.id, post.id);
    } else {
      addTag(tag.id, post.id);
    }
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose} style={{ background: 'bisque' }}>
          <Modal.Title>
            Tags
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'antiquewhite' }}>
          <ul>
            {tags.map((tag) => (
              <li key={tag.id}>
                {tag.label}

                {/* Assuming addTag should be specific to each tag, you might need a function to handle the action per tag */}
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => tagsController(post.tags, tag)}
                  style={{ marginLeft: '10px' }}
                >
                  {isTagInPost(post.tags, tag) ? 'Delete' : 'Add'}
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}

TagsModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default TagsModal;
