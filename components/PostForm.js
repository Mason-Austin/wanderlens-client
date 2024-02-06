import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updatePost, createPost } from '../api/PostData';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
};
function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        title: obj.title,
        content: obj.content,
        imageUrl: obj.imageUrl,
      });
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, id: obj.id };
      updatePost(payload).then(() => router.push(`/post/${obj.id}`));
    } else {
      const payload = { ...formInput, userId: user.id };
      createPost(payload).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-warning mt-5" style={{ textShadow: '0 0 2px #000' }}>{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          style={{ backgroundColor: 'antiquewhite' }}
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an Image-Url"
          style={{ backgroundColor: 'antiquewhite' }}
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Info" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter Info"
          style={{ height: '100px', background: 'antiquewhite' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button style={{ background: 'goldenrod', border: 'goldenrod', textShadow: '0 0 2px #000' }} type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
