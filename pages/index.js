import { useState, useEffect } from 'react';
import { getPosts } from '../api/PostData';
import PostCard from '../components/Postcard';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
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
      {/* TODO: map over posts here using PostCard component */}
      {posts.map((post) => (
        <PostCard key={post.id} postObject={post} onUpdate={getAllPosts} />
      ))}
    </div>
  );
}

export default Home;
