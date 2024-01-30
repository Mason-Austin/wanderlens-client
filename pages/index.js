/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getPosts } from '../api/PostData';
import PostCard from '../components/Postcard';

function Home() {
  const [posts, setPosts] = useState([]);
  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
    console.warn(posts);
  }, []);

  return (
    <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
      {posts.map((post) => (
        <PostCard key={post.id} postObject={post} onUpdate={getAllPosts} />
      ))}
    </div>
  );
}

export default Home;
