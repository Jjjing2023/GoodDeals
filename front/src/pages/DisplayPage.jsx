import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../asset/style/DisplayPage.css";
import PropTypes from "prop-types";

export function DisplayPage({ category }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [jumpToPageInput, setJumpToPageInput] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/deals${category}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch data from the backend");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    fetchPosts();
  }, []);

  const sortedPosts = posts.sort((a, b) => b.like - a.like);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const jumpToPage = () => {
    const pageNumber = parseInt(jumpToPageInput, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>

      <div className="display-page">
        <h2>Deals - {category.replace("/category/", "")} </h2>
        {currentPosts.map((post, index) => (
          <div className="container-fluid" key={index}>
            <div className="post-card" key={post._id}>
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <img
                    src={post.imagelink}
                    alt={post.title}
                    className="post-card-img"
                  />
                </div>
                <div className="col-md-9 text-center">
                  <h3>{post.title}</h3>
                  <p className="post-content">{post.description}</p>

                  <div className="post-meta">
                    <p className="fa fa-heart likechecked">{post.like}</p>
                    <p className="post-category"># {post.category}</p>
                  </div>
                  <Link
                    to={`/deals/id/${post._id}`}
                    className="btn btn-primary btn-lg"
                  >
                    Detail Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pagination">
        <div className="prev">
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="prev"
          >
            Previous Page
          </button>
        )}
        </div>
        <div className="pagejump">
        <p>1-{Math.ceil(posts.length / postsPerPage)} pages, now in {currentPage} page</p>
            <input
              type="number"
              min="1"
              max={Math.ceil(posts.length / postsPerPage)}
              placeholder="1"
              value={jumpToPageInput}
              onChange={(e) => setJumpToPageInput(e.target.value)}
            />
            <button onClick={jumpToPage}>Jump</button>
            
          </div>
        <div className="next">
        {currentPage !== Math.ceil(posts.length / postsPerPage) && (
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
            className="next"
          >
            Next Page
          </button>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}

DisplayPage.propTypes = {
  category: PropTypes.string.isRequired,
};
