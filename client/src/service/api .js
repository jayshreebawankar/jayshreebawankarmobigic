import axios from 'axios'

export const getAllUser =async()=>{
     return await axios.get(`http://localhost:5000/`)
}

export const getEmployee =async(id)=>{
     id = id || '';
     return await axios.get(`http://localhost:5000/user/get/${id}`)
}

export const createUser =async(employee)=> {
     return await axios.post("http://localhost:5000/user/register",employee)
}