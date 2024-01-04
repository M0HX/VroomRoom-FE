import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';


export default function NavBar({ isAuth, onLogoutHandle, userId }) {
  console.log("nav userID",userId)
  const [userImage,setUserImage] = useState();
console.log(userImage)
  useEffect(() =>{
      usertype()

  }, [])
  const usertype = async () =>{
      // if (!isAuth) return;
      await Axios.get(`/user/userType?id=${userId}`)
      .then((res) => {
        console.log(res.data.user);
        setUserImage(res.data.user.image);
      })
      .catch((err) => {
        console.log(err);
      });
  
    }


  return (
        <div className='navEdit'>
          <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">VroomRoom</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <Link to="/category" className="nav-link active">Category</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/post" className="nav-link active">Post</Link>
                    </li>
                    {isAuth &&                    
                    <li>
                      <Link to="/whishlist" className="nav-link active">Whishlist</Link>
                    </li>
}
                  </ul>
                  <form className="d-flex">
                  <nav>
                  <ul>
                    {isAuth ? (
                      <li>
                        {/* <Link onClick={onLogoutHandle} to="/">Logout</Link> */}
                        <div className="dropdown">
                          {console.log(userImage)}
                        <img src={userImage} className="rounded-circle btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" alt="logo" height="60"/>

                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/myPost">My Posts</Link></li>
                            <li><Link className="dropdown-item" onClick={onLogoutHandle} to="/">Logout</Link></li>
                          </ul>
                        </div>
                      </li>
                    ) : (
                      <>
                      <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li>
                          <Link className='signin btn btn-primary' to="/signin">Signin</Link>
                        </li>
                        <li>
                          <Link className='btn btn-primary' to="/signup">Signup</Link>
                        </li>
                        </ul>
                      </>
                    )}
                  </ul>
                </nav>


                  </form>

            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
