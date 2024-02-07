import { useEffect, useState } from 'react';
import { getMyPosts } from '../api/PostData';
import PostCard from '../components/Postcard';
import { useAuth } from '../utils/context/authContext';

function MyPosts() {
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
      className="text-center d-flex"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
      }}
    >
      <div
        className="text-center d-flex flex-row"
        style={{
          textAlign: 'left', color: 'goldenrod', textShadow: '0 0 2px #000',
        }}
      >
        <h1><b>{user.name}&apos;s Posts!</b></h1>
      </div>
      <div className="d-flex align-content-start flex-row" style={{ justifyContent: 'space-evenly' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObject={post} onUpdate={getAllMyPosts} />
        ))}
      </div>

    </div>

  );
}
// "text-center d-flex flex-column justify-content-center align-content-center"

export default MyPosts;
