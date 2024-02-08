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

    <>
      <h1 className="text-center">{user.name}&apos;s posts</h1>

      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObject={post} onUpdate={getAllMyPosts} />
        ))}
      </div>
    </>

  );
}
// "text-center d-flex flex-column justify-content-center align-content-center"

export default MyPosts;
