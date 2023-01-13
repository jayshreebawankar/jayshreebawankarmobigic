import './Auth.css';

const Login = () =>{
    return(
        <div className='auth-right'>
            <form className='infoForm  authForm'>

                <h3>Login</h3>

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
                </div>

                <div>
                    <span style={{fontSize:'12px'}}>Don`t have an account?<a href='/login'>SignUp!</a> </span>
                </div>

                <button className='button signupBtn'>
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login;