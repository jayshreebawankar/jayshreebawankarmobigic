import Auth from '../auth/Auth.js';
import Login from '../auth/Login.js';
import SignUp from '../auth/SignUp.js';
import Home from '../Components/Home.js'
import Details from '../Components/Details.js'
import Logout from '../Components/Logout.js'
import {Routes, Route} from 'react-router-dom';

const router = ()=> {
    return(
        <>
        <Routes>
            <Route index element={<SignUp/>}></Route>
            <Route path='/auth' element={<Auth/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/details' element={<Details/>}></Route>
            <Route path='/auth/login' element={<Login/>}></Route>
            <Route path='/auth/logout' element={<Logout/>}></Route>
        </Routes>
        </>
    )
}
export default router;