import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createComment } from '../api/CommentData';
import { getSinglePost } from '../api/PostData';

const initialState = {
  content: '',
};

function CommentForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [post, setPost] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  console.warn('this is my user', user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSinglePost(id).then((data) => setPost(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, userId: user.id, postId: post.id };
    createComment(payload).then(() => router.push('/'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">Create Post</h2>
      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Info" className="mb-3">
        <Form.Control as="textarea" placeholder="Enter Info" style={{ height: '100px' }} name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">Create Comment</Button>
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
