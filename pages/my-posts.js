import { getPosts } from '../api/PostData';
import { useAuth } from '../utils/context/authContext';

function MyPosts() {
  const { user } = useAuth();
  console.warn(getPosts);
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

    </div>

  );
}

export default MyPosts;
