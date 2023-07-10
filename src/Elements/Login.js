import {React, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import quoteContext from '../context/quotes/quoteContext'
import '../CSS/Login.css'
const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser,setImgURL,setData} = useContext(quoteContext);
    const showPassword = (e) =>{
      e.preventDefault();
        const pwd = document.getElementById('password');
        const passShowBtn = document.getElementById('passShowBtn');
        if (pwd.type === "password") {
          pwd.type = "text";
          passShowBtn.classList.remove('fa-eye');
          passShowBtn.classList.add('fa-eye-slash');
        } else {
          pwd.type = "password";
          passShowBtn.classList.remove('fa-eye-slash');
          passShowBtn.classList.add('fa-eye');
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch('http://localhost:5000/api/auth/login', requestOptions)
        .then(async (response) => {
          const resPonse = await response.json();
          
          console.log(resPonse)
          if(resPonse.result)
          {
            const user = resPonse.data.user;
            user && user.photoURL && setImgURL(user.photoURL)
            setUser(user)
            navigate('/')
          }
          else {
            return document.getElementById('error').innerText = resPonse.msg;
          }
        })
        .catch((error)=> {
          e.preventDefault();
          document.getElementById('error').innerText = error
        })
        // .then((data) => {
        //   console.log(data);
        //   const url = data.photoURL;
        //   setUser(url)
        //   navigate('/')
        // })
        
        // fetch('http://localhost:5000/api/auth/login', 'post', (err, res) => {
        // if(err)
        // throw err;
        // })
        // .then((res)=>{
        //     console.log(res);
        // })
    }

  return (
    <div id='loginMainDiv'>
      <div id='loginFormDiv' className='formDiv'>
        <form id='loginForm'  onSubmit={onLogin}>
            <div id='usernameDiv' className='inputDiv'>
                <label htmlFor='username'>User Name</label>
                <input type='text' name='username' id='username' value={username} onChange={e=> setUserName(e.target.value)} />
            </div>
            <div id='passwordDiv' className='inputDiv'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' value={password} onChange={e=> setPassword(e.target.value)}/>
                <button onClick={showPassword}><i id="passShowBtn" className="fa-solid fa-eye"></i></button>
            </div>
            <h4 id='error'></h4>
            <h5 style={{margin: "10px 0px"}}>Don't have Account? <span style={{color: 'blue', textDecoration: 'Underline', cursor: "pointer"}} onClick={()=>{navigate('/signup')}}>Signup</span></h5>
            <div id='submitDiv'>
                <input type='submit' value={"Login"}/>
            </div>
        </form>        

      </div>
    </div>
  )
}

export default Login
