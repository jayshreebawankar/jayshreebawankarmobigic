import './Auth.css';
import logoimg from '../img/logo.png';

function SignUp(){
    return(
        <div className='auth-right'>
            <form className='infoForm  authForm'>

                <h3>Sign Up</h3>2

                <div>
                    <input 
                        type='text' 
                        name='firstName'
                        className='infoInput' 
                        placeholder="First Name"
                    />
                    <input 
                        type='text' 
                        name='lastName'
                        className='infoInput' 
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <input 
                        type='text' 
                        name='Username'
                        className='infoInput' 
                        placeholder='Username'
                    />
                </div>
                <div>
                    <input 
                        type='password' 
                        name='password'
                        className='infoInput' 
                        placeholder="Password"
                    />
                    <input 
                        type='password' 
                        name='confirmPassword'
                        className='infoInput' 
                        placeholder="Confirm Password"
                    />
                </div>

                <div>
                    <span style={{fontSize:'12px'}}>Already have an account? <a href='/signup'>Sign Up!</a></span>
                </div>

                <button className='button signupBtn'>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp;
