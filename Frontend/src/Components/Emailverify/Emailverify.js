import React, { useEffect, useState } from 'react'
import { InfinitySpin } from  'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmailAxios } from '../../Services/axios';
import inv from '../../assets/404.svg'


const Emailverify = () => {
    const [flag , setFlag] = useState("loader");
    const [timer,setTimer ] = useState(5);
    const {string} = useParams();
    const navigate =  useNavigate();

    useEffect(()=>{
        verifyEmailAxios(string)
        .then((res)=>{
          if(res.status === 200){
            setFlag("successfull")
          }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.data.message === "invalid credential"){
                setFlag("invalid")
            }else{
                console.log(err)

            }
        })
    },[])
    if(flag === 'successfull'){
        if(timer>-1){
            setInterval(()=>{
                setTimer(timer-1)
            },1000)
        }else{
            navigate("/login")
        }
    }
    if(flag === 0){
        navigate("/login")
    }
    

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
        {flag === 'loader' ? 
        <InfinitySpin
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
          
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />:flag === 'invalid' ?<img src={inv} alt="" /> :
        <div>
           
            <h3>Login Page will appear in:</h3>
            <h4>{timer}</h4>
        </div>
        }
    </div>
  )
}

export default Emailverify