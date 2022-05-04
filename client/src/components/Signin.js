import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loginuser } from "../slices/userSlice"
import {useEffect} from "react"
import { isFulfilled } from '@reduxjs/toolkit';

function Signin() {

  const navigate = useNavigate();

  let {obj, iserror, errmsg, ispending, isuserlogin} = useSelector(state => state.users)
  console.log(obj,iserror,errmsg,ispending,isuserlogin);

  let dispatch = useDispatch()

  const [userin, setUserin] = useState({
    email : "",
    password : ""
  });

  let name, value;
  const funHandelInput = (e) =>{
      name = e.target.name;
      value = e.target.value;
      setUserin({ ...userin, [name]:value });
  }

  useEffect(() => {
    if(isuserlogin == true){
      navigate('/Home')
    }
  }, [obj]);
 
  const funhandlesignin = async (e) => {
    e.preventDefault(); 
    dispatch(loginuser(userin))
  
    // const { email, password } = userin;

    // const res = await fetch("/signin" , {
    //   method : 'POST',
    //   headers : {
    //     "Accept" : "application/json",        
    //     "Content-Type" : "application/json"
    //   },
    //   body : JSON.stringify({
    //     email, password
    //   })
    // })
    
    // const data = await res.json();
    // console.log(data);

    // if(data.message === "login successfully"){
    //   localStorage.setItem("token",data.token)
    //   console.log('login successfully');
    //   const val = localStorage.getItem('token');
    //   console.log(val);
    //   navigate('/Home');
    // }else {
    //   console.log('Invalid cred');
    // }
  };

    return (
      <>
      {
        iserror && <p>{errmsg}</p>
      }
      <br/>
      <br/>
      <br/>
      <h1>signin side</h1>
      <form method = "POST" > 
        <input type='email' name="email" placeholder='email' value={userin.email} onChange={funHandelInput} ></input><br/>
        <input type='password' name="password" placeholder='password' value={userin.password} onChange={funHandelInput} ></input><br/>
       <br/>
        <button type="submit" className="btn btn-primary" onClick={funhandlesignin} >Signin</button>
      </form>
      </>
    );
  }
  
  export default Signin;
  
