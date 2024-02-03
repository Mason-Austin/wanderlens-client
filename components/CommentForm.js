import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment } from '../api/CommentData';

const initialState = {
  content: '',
};

function CommentForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  console.warn('this is the obj content id =>', obj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.content) {
      setFormInput({ content: obj.content });
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.content) {
      // Corrected to pass the necessary data for updating a comment
      const payload = { ...formInput, id: obj.id };
      updateComment(payload).then(() => router.push('/post/1'));
    } else {
      // Corrected to ensure the correct payload is sent when creating a comment
      const payload = { ...formInput, userId: user.id, postId: id }; // Using the post ID from the URL
      createComment(payload).then(() => router.push(`/post/${id}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.content ? 'Update ' : 'Create '}Comment</h2>
      <FloatingLabel controlId="floatingTextarea" label="Info" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter Info"
          style={{ height: '100px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.content ? 'Update ' : 'Create '}Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
