
import './Header.css';
import { Link } from'react-router-dom';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import { auth } from '../../firebase';

const Header = () => {
  const shoppingContext = useContext(ShoppingContext);
  const {basket = [], user, setUser} = shoppingContext;

  const handleAuthentication = () => {
    if (user) {
      auth.signOut().then(() => {
        setUser(null);
      })
    }
  }

  return (
      <header className='header'>
      <Link to='/'>
        <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon-logo' />
      </Link>

      <div className='header_option'>
        <div className='delivery_option'>
          <div className='location_icon'>
            <FmdGoodOutlinedIcon className='location_icon' />
          </div>
          <div className='location_text'>
            <span className='header_option1'>Delivering to Cape Town 7925</span>
            <span className='header_option2'>Update location</span>
          </div>
        </div>
      </div>
      
      <div className='header_search'>
        <button className='header_search_all'>All</button>
        <input type='text' className='header_input' placeholder='Search Amazon.co.za' />
        <SearchOutlinedIcon style={{ fontSize: '30px' }} className='search_icon' />
      </div>

      <div className='header_nav'>

          <Link to={!user && '/login'} className='header_optionLink'>
          <div className='header_option' onClick={handleAuthentication}>
            <span className='header_option1'>Hello {!user ? 'Guest' : user.email}</span>
            <span className='header_option2'>{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        
        <div className='header_option'>
          <span className='header_option1'>Returns</span>
          <span className='header_option2'>& Orders</span>
        </div>

        <div className='header_option'>
          <span className='header_option1'>Your</span>
          <span className='header_option2'>Prime</span>
        </div>

        <Link to='/checkout' className='header_optionBasket'>
          <ShoppingBasketOutlinedIcon className='basket_icon' />
          <span className='header_option2 header_basketCount'>{basket.length}</span>
        </Link>
      </div>
    </header>
  )
}


export default Header
