import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUser} from '../service/api '

const Register = () => {
  const [data, setData] = useState({
    first_name : '',
    last_name : '',
    email : '', 
    phone_no : '', 
    address : '', 
    emp_type : '', 
    designation : '', 
    image : ''
  })

  const {first_name, last_name, email, phone_no, address, emp_type, designation, image} = data

  const inputHandler =(event)=>{
    // console.log(event.target.value);
    const {name, value} = event.target;
    
    setData(preVal=>{
      return{
        ...preVal,
        [name] : value
      }
    })
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    let send = await createUser(data)
    console.log(send);
  }
  
  return (
    <div className='container'>
     <div className='mt-2 pb-3 pt-2'><Link to='/'>Home</Link></div>

      <form>
          <div className='row'>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2 py-2">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" name='first_name' value={data.first_name} onChange={inputHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name"/>
          </div>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" name='last_name' value={data.last_name} onChange={inputHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name"/>
          </div>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Email </label>
              <input type="email" name='email' value={data.email} onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Enter your Email"/>
          </div>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Phone Number</label>
              <input type="text" name='phone_no' value={data.phone_no} onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Enter your Mobile Number"/>
          </div>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Address</label>
              <input type="textarea" name='address' mulitiline="true" value={data.address} onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Enter your address"/>
          </div>
          <div className="md-3 col-lg-6 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Employment Type</label>
              <input type="test" name='emp_type' value={data.emp_type} onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Enter your work information"/>
          </div>
          <div className="md-3 col-lg-12 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Designation : </label>
              <select name='designation' value={data.designation}>
                <option value="front_developer">Frontend Developer</option>
                <option value="backend_developer">Backend Developer</option>
                <option value="full_stack_developer">Full Stack Developer</option>
              </select>
          </div>
          <div className="md-3 col-lg-12 col-md-6 col-12 py-2">
              <label for="exampleInputPassword1">Upload Image</label>
              <textarea type='text' name='image' value={data.image} onChange={inputHandler} className="form-control" cols='30' rows='5' placeholder="Describe yourself here"/>
          </div>
          <button type="submit" onClick={submitHandler} className="btn btn-primary mt-3">Submit</button>
          </div>
      </form>
    </div>
  )
}
export default Register