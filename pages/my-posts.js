import { useEffect, useState } from 'react';
import { getMyPosts } from '../api/PostData';
import PostCard from '../components/Postcard';
import { useAuth } from '../utils/context/authContext';

function MyPosts(id) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const getAllMyPosts = () => {
    getMyPosts(user.id).then(setPosts);
  };

  useEffect(() => {
    getAllMyPosts();
    console.warn(posts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.warn(getMyPosts);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>{user.fbUser.displayName}&apos;s Posts! </h1>
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObject={post} onUpdate={getAllMyPosts} />
        ))}
      </div>

    </div>

  );
}

export default MyPosts;
