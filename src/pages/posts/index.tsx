import React from "react";
import Header from "components/Header";
import PostList from "components/PostList";
import Footer from "components/Footer";

const PostsPage = () => {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};
export default PostsPage;
