import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { getMailsCountAxios, getQuoteAxios, verifyTokenAxios } from '../../Services/axios'
import { defaultToast, errorToast } from '../../Services/tostify'

const Home = () => {
  const navigate= useNavigate();
  const [flag ,setFlag ] = useState(true)
  const [count,setCount] = useState({count:0,name:''});
  const [quote,setQuote] = useState({author:"Ann Landers",quote:"It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings."})

  useEffect(()=>{
    if(flag){
      verifyTokenAxios()
      .then((res)=>{
        if(res.status === 200){
          // defaultToast("Welcome")
          setFlag(false)
        }
      })
      .catch((err)=>{
        console.log(err);
        if(err.code === "ERR_NETWORK"){
          errorToast(" Please check your Internet Connection")
        }
        if(err.response.status === 401){
          navigate("/login")
          localStorage.clear()
          errorToast("Something Went Wrong")
        }
      })
    }
    getMailsCountAxios()
    .then((res)=>setCount(res.data))
    .catch((err)=>console.log(err))

    fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(res=>setQuote(res));
            
    },[])

  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap' style={{height:'80vh',backgroundColor:"#D3D3D3"}}>
     
      <div className=" " style={{height:"400px",width:"400px"}}>
          <div style={{width:"400px"}}>
            <h3 className='w-100 ' > Hi, {count.name} !</h3>
          </div>
          <div>
          <Card style={{ width: '' }} className="text-start">
            <Card.Body>
              <Card.Title className='d-flex'>Today's Date: <span className='ms-auto'>{new Date().toLocaleDateString()}</span></Card.Title>
              <hr/>
              <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Email Sent <span className='ms-auto me-5 '>{count.count}</span></Card.Subtitle>
              <br/>
              {/* <Card.Subtitle className="mb-2 w-100 text-muted d-flex">Total <span className='ms-auto me-5 '>0</span></Card.Subtitle> */}
             <hr />
              
            </Card.Body>
          </Card>
    </div>
      </div>
    </div>
  )
}

export default Home