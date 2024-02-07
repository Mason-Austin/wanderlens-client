/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api/PostData';
import PostCard from '../../components/Postcard';

const SearchPage = () => {
  const router = useRouter();
  const { searchTerm } = router.query; // Make sure the query param name is correct
  const [posts, setPosts] = useState([]); // State for all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts

  useEffect(() => {
    // Assuming getposts and user.uid are defined and imported
    getPosts()
      .then((postsArray) => {
        setPosts(postsArray);
        setFilteredPosts(postsArray); // Initialize with all posts
      });
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Show all posts if no search term
    }
  }, [searchTerm, posts]);

  return (
    <div>
      {/* Render your filtered results */}
      {filteredPosts.map((post) => (
        <PostCard key={post.id} postObject={post} onUpdate={posts} />
      ))}
    </div>
  );
};

export default SearchPage;
