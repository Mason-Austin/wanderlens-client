/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getPosts } from '../../api/PostData';
import PostCard from '../../components/Postcard';

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
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button style={{ background: 'goldenrod', border: 'goldenrod', textShadow: '0 0 2px #000' }}>Make A Post</Button>
      </Link>
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObject={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
