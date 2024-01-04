import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
export default function CategoryPosts() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();
    useEffect(() => {
        // Fetch posts
        Axios.get(`http://localhost:3050/category/posts?id=${categoryId}`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load posts.");
            });
        // Fetch category details
        Axios.get(`http://localhost:3050/category/detail?id=${categoryId}`)
            .then(response => {
                setCategory(response.data.category);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load category details.");
            });
    }, [categoryId]);
    const addToWishlist = (postId) => {
        // Add to wishlist logic here
        console.log("Added to Wishlist", postId);
        // Implement wishlist addition logic
    };
    return (
        <div className="container mt-4">
            <h2>Posts in {category ? category.name : 'Category'}</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {posts.map(post => (
                    <div key={post._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {post.image && <img src={post.image[0]} className="card-img-top" alt="Post" style={{ height: '250px' }} />}
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                {/* Additional post details */}
                                <Link to={`/post/detail/${post._id}`} className="btn btn-outline-secondary">View</Link>
                                {/* <button className="btn btn-outline-primary" onClick={() => addToWishlist(post._id)}>Wishlist</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}