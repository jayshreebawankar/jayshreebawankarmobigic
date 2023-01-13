import './Auth.css';
import logoimg from '../img/logo.png';
// import Login from './login';
import SignUp from './SignUp.js';

const Auth = () => {
  return (
    <div className='auth'>
        <div className='auth-left'>
            <img src={logoimg} alt='logo'/>
            <div className='web-name'>
                <h1>SOCIAL Media</h1>
                <h6>Explore the ideas throught the world</h6>   
            </div>
        </div>

        <SignUp/>
        {/* <Login/> */}
    </div>
  )
}

export default Auth