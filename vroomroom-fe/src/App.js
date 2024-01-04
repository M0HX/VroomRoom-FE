import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import {Routes, Route, Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavBar from './components/home/NavBar';
import Footer from './components/home/Footer'

import PostList from './components/Post/PostList';
import PostCreate from './components/Post/PostCreate';
import PostEdit from './components/Post/PostEdit';
import PostDetail from './components/Post/PostDetail';

import CategoryList from './components/Category/CategoryList';
import CategoryCreate from './components/Category/CategoryCreate';
import CategoryEdit from './components/Category/CategoryEdit';

import WishList from './components/home/WishList';
import WishlistList from './components/wishlist/WishlistList';
import Profile from './components/user/Profile';
import MyPost from './components/user/MyPost';



import CategoryPosts from './components/Category/CategoryPosts';



function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ id: null });
  const [userType,setUserType] = useState();
const [userId, setUserId] = useState()
  useEffect(() => {
    const user = getUser();
console.log("dddd")
    if (user && user.user) {
      setIsAuth(true);
      setUser(user.user);
      setUserId(user.user.id)
    } else {
      console.log("nulling user",user)
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser({ id: null }); // Set to default object
    }
  }, [userId]);

  const registerHandle = (user) => {
    Axios.post("auth/signup", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUser = () => {
    const token = getToken();
    if (token) {
      try {
        return jwtDecode(token);  // Decode token
      } catch (error) {
        console.error("Error decoding token: ", error);
        return { id: null };
      }
    }
    return { id: null };  // Return default object if token is not valid
  };

  const usertype = async () =>{
    // if (!isAuth) return;
    await Axios.get(`/user/userType?id=${user.id}`)
    .then((res) => {
      console.log(res.data.user);
      setUserType(res.data.user.type);
    })
    .catch((err) => {
      console.log(err);
    });

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
         user ? setUserId(user.user.id) : setUserId(null)
       }
     })
     .catch(err => {
       console.log(err);
     })
   }
   const onLogoutHandle = (e) => {
     e.preventDefault();
     localStorage.removeItem("token");
     setIsAuth(false);
     setUser(null);
     navigate('/');
   }
   console.log(userType)
   return (
     <div>
      {/* <NavBar></NavBar> */}
      {isAuth ? <NavBar key={userId} isAuth={isAuth} onLogoutHandle={onLogoutHandle} userId={userId} />
      :
      <NavBar isAuth={isAuth} onLogoutHandle={onLogoutHandle}/>
}
       <div>
        {isAuth && (
        <Routes>
           <Route path='/profile' element={<Profile key={user.id} userId={user}/>}/>
           <Route path='/myPost' element={<MyPost key={user.id} userId={user}/>}/>
           <Route path='/post/add/:userId' element={<PostCreate/>}/>
           <Route path='/post/edit/:id' element={<PostEdit/>}/>
           <Route path='/category/add' element={<CategoryCreate/>}/>
           <Route path='/category/edit/:id' element={<CategoryEdit/>}/>
           <Route path='/whishlist' element={<WishlistList key={user.id} userId={user}/>}/>
          </Routes>
        )}
          <Routes>
           <Route path="/" element={ isAuth ? <Home></Home>: <Signin login={loginHandle}></Signin>}></Route>
           <Route path='/signup' element={<Signup register={registerHandle}></Signup>}></Route>
           <Route path='/signin' element ={ isAuth ? <Home/> : <Signin login={loginHandle}></Signin>}></Route>
           <Route path="/post" element={user ? <PostList key={user.id} userId={user} isAuth={isAuth} /> : <PostList />}/>           
           <Route path='/post/detail/:id' element={<PostDetail/>}/>
           <Route path='/category' element={user ? <CategoryList key={user.id} userId={user} isAuth={isAuth} /> :<CategoryList/>}/>
           <Route path='/category/posts/:categoryId' element={<CategoryPosts/>}/>
          </Routes>


           
       </div>
     </div>
   )
 }
export default App;

