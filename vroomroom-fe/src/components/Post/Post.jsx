import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Post(props) {
    const [isAdded, setIsAdded] = useState(false);

    return (
        <div className="col mb-4">
            <div className="card shadow-sm" style={{ width: '18rem' }}>
                <img src={props.image[0]} className="card-img-top" alt="carImage" style={{ height: '250px' }}/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text"><b>Price: </b>{props.price} BD</p>
                    <p className="card-text"><b>Category: </b>{props.category ? props.category.name : 'No Category'}</p>
                    {props.admin === "admin" && <>
                        <Link to={`/post/edit/${props._id}`} className="btn btn-outline-primary">Edit</Link>
                        <button onClick={() => props.deletePost(props._id)} className="btn btn-outline-danger">Delete</button>
                        </>
                    }
                    <Link to={`/post/detail/${props._id}`} className="btn btn-outline-secondary">View</Link>
                    {props.userId &&
                    <button className={`btn ${isAdded ? 'btn-success' : 'btn-outline-primary'}`} onClick={() => {setIsAdded(true); props.addWish(props._id)}}>
                    
                        Wishlist {isAdded && "Added"}
                    </button>
                    }
                </div>
            </div>
        </div>
    );
}
