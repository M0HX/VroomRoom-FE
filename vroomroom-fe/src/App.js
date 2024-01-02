import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route, Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import Axios from 'axios';
import WishList from './components/home/WishList';
import CategoryList from './components/Category/CategoryList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './components/Post/PostList';

function App() {
   const [isAuth, setIsAuth] = useState(false);
   const [user, setUser] = useState({});
   

   useEffect(() => {
  const user = getUser();
  console.log(user);
  if(user){
   setIsAuth(true);
   setUser(user);
  }else{
   localStorage.removeItem("token");
   setIsAuth(false);
   setUser(null);
  }
 },[])
   const registerHandle = (user) => {
     Axios.post("auth/signup", user)
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     })
   }
   const loginHandle = (cred) => {
     Axios.post("auth/signin", cred)
     .then( res => {
       console.log(res.data.token);
       let token = res.data.token;
       if(token != null)
       {
         localStorage.setItem("token", token);
         const user = getUser();
         console.log(user);
         user ? setIsAuth(true) : setIsAuth(false)
         user ? setUser(user) : setUser(null)
       }
     })
     .catch(err => {
       console.log(err);
     })
   }
   const getUser =() => {
 const token = getToken();
 return token ? jwtDecode(token).user : null
   }
   const getToken = () => {
     const token = localStorage.getItem("token");
     return token;
   }
   const onLogoutHandle = (e) => {
     e.preventDefault();
     localStorage.removeItem("token");
     setIsAuth(false);
     setUser(null);
   }
   
   return (
    
      <div>
        <nav>
          {isAuth ? (
            <div>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/logout" onClick={onLogoutHandle}>Logout</Link>
            </div>
          ) : (
            <div>
              <Link to="/">Home</Link> &nbsp;   
            </div>
          )}
        </nav>
        <div>
          <Routes>
            <Route
              path="/"
              element={ <Home isAuth={isAuth} />}
            ></Route>
            {!isAuth && (
              <>
                <Route
                  path="/signup"
                  element={<Signup register={registerHandle} />}
                ></Route>
                <Route
                  path="/signin"
                  element={<Signin login={loginHandle} />}
                ></Route>
              </>
            )}
            {/* if you want to add Other Routes */}
          </Routes>
        </div>
        <footer></footer>
      </div>
    );
  }
  
  export default App;
