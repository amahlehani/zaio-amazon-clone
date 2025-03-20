import React, {  useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import ShoppingContext from '../../context/shopping/shoppingContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const shoppingContext = useContext(ShoppingContext);
  const {user} = shoppingContext; 

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <Link to='/home'>
        <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' />
      </Link>
      <div className='login_container'>
        <h1>Sign In</h1>

        <form>
          <h5>Email</h5>
          <input 
            type='text' 
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input 
            type='password' 
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            type='submit' 
            className='login_btn'
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to the AMAZON CLONE Conditions of Use & Sale. 
          Please see our Privacy Notice, our Cookies Notice, and our Internet-Based Ads Notice.
        </p>
        <button 
          type='submit' 
          className='register_btn'
          onClick={register}
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
