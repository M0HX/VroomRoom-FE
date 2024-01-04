import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyPost(props) {
  console.log(props.userId.id);
  const [isAdded, setIsAdded] = useState(false);
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id) => {
    Axios.get(`post/delete?id=${id}`)
      .then((res) => {
        console.log("Post Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = () => {
    if (!props.userId.id) return;
    Axios.get(`/post/myPost?user=${props.userId.id}`)
      .then((res) => {
        console.log(res.data);
        setMyPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h1>My Posts</h1>

      <div className='row'>
        {myPost.length > 0 ? (
          myPost.map((post) => (
            <div key={post._id} className='col-md-4 mb-4'>
              <div className='card shadow-sm'>
                <img src={post.image[0]} className='card-img-top' alt='carImage' style={{ height: '250px', objectFit: 'cover' }} />
                <div className='card-body'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='card-title'>{post.title}</h5>
                    {/* <button
                      className={`btn btn-primary ${isAdded && 'btn-success'}`}
                      onClick={() => {
                        setIsAdded(true);
                        post.addWish(post._id);
                      }}
                    >
                      Whishlist {isAdded && 'added'}
                    </button> */}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='card-text'>
                      <b>Price: </b>
                      {post.price}
                    </p>
                    <p>
                      <b>Category: </b>
                      {post.category ? post.category.name : 'No Category'}
                    </p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Link className='btn btn-outline-warning' to={`/post/edit/${post._id}`}>Edit</Link>
                    <button className='btn btn-outline-danger' onClick={() => deletePost(post._id)}>Delete</button>
                  </div>
                  <Link to={`/post/detail/${post._id}`}>
                    <button type='button' className='btn btn-outline-secondary mt-2 w-100'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No posts available</p>
        )}
      </div>
    </div>
  );
}
