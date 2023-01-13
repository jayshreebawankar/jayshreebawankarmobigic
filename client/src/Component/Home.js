import './Home.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {getAllUser}  from '../service/api ' 

// import createIcon from '@mui/icons-material/RemoveRedEye';

const Home = () => { 
    const [empdata, setEmpData] = useState([]);

    useEffect(() => {
        allUser();
    },[]);

    const allUser = async ()=>{
        const x = 911234567890
        console.log("output", x.toString().substring(0,2));
        
        console.log("out" , x.toString().substring(2,12));

        const receive = await getAllUser()
        console.log("receive", receive);
        setEmpData(receive.data);
        console.log('todolist  data : ',receive.data);
    }

  return (
    <div className='mt-5'>
        <div className='container'>
            <div className='add_btn mt-2'>
                <Link to='/register' className='btn btn-primary mt-2 mb-2'> + Add Data </Link>
            </div>

            <table className="table">
                <thead>
                    <tr className='table-dark'>
                    <th scope='col'></th> 
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope='col'></th> 
                    </tr>
                </thead>

                {empdata.map((data, id)=>{
                    return (
                    <tbody>
                        <tr>
                            <th scope="row">{id+1}</th>
                            <td>{data.first_name}</td>
                            <td>{data.last_name}</td>
                        </tr>
                    </tbody>
                    )
                })}
                
            </table>
        </div>
    </div>
  )
}

export default Home