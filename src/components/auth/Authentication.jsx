import React, { useEffect, useState } from 'react'
import './authstyle.css'
import { loginAPI, registerAPI } from '../../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
  

function Authentication() {
  const [signUpMode, setSignUpMode] = useState(false);
  const [preview, setpreview] = useState("")
  const [data,setData] = useState([])
  const[userdata,setUserdata] = useState({
    actual_name:"",
    username:"",
    email:"",
    password:"",
    Profile_picture:"",
    is_superuser:false,
    is_sponsor:false,
    is_college:false
  })

  const navigate = useNavigate()

  const toggleSignUp = () => {
    setSignUpMode(!signUpMode);
    setUserdata({
      ...userdata,
      is_superuser: true,
      is_college: false,
      is_sponsor: false,
    }) 
  };
  useEffect(() => {
    if (userdata.Profile_picture) {
        setpreview(URL.createObjectURL(userdata.Profile_picture))
    }
}, [userdata.Profile_picture])

const [activeTab, setActiveTab] = useState(1);

const handleTabChange = (tabIndex) => {
  setActiveTab(tabIndex);
  if(tabIndex == 1){
    setUserdata({
      ...userdata,
      is_superuser: true,
      is_college: false,
      is_sponsor: false,
  })
  }
else if(tabIndex == 2){
  setUserdata({
    ...userdata,
    is_superuser: false,
    is_college: true,
    is_sponsor: false,
})
}
else if(tabIndex == 3){
  setUserdata({
    ...userdata,
    is_superuser: false,
    is_college: false,
    is_sponsor: true,
})
}
else{
  setUserdata({
    ...userdata,
    is_superuser: false,
    is_college: false,
    is_sponsor: false,
})
}
};

const handleRegister = async (e) => {
  e.preventDefault();
  const { actual_name, username, email, password, Profile_picture,is_superuser, is_sponsor, is_college} = userdata;
if (!actual_name || !username || !email || !password || !Profile_picture) {
  toast.info('please fill the Details Completely');
} else {
  const reqBody = new FormData()
  reqBody.append("actual_name",actual_name)
  reqBody.append("username",username)
  reqBody.append("email",email)
  reqBody.append("password",password)
  reqBody.append("profile_picture",Profile_picture)
  reqBody.append("is_superuser",is_superuser)
  reqBody.append("is_sponsor",is_sponsor)
  reqBody.append("is_college",is_college)
  const result = await registerAPI(reqBody);
  if (result.status === 200) {
    toast.success('Registration success');

    setUserdata({
      actual_name: "",
      username: "",
      email: "",
      password: ""
    });
  setpreview("")
    setData(result.data)
  } else {
    toast.error(`Please Try Again`);
    
    setUserdata({
      actual_name: "",
      username: "",
      email: "",
      password: ""
    });
    setpreview("")
  }
}
};

const navigatetovalidate = ()=>{
  if(data){
    navigate('',{state:{data}})
  }
  else{
toast.error(`Please Try After some time`)
  }
}
console.log(data);
const handleLogin = async (e) => {
  e.preventDefault();
  const { username, password } = userdata;
  if (!username || !password) {
    toast.info('Please fill in all the fields.');
  } else {
    const result = await loginAPI(userdata); // Assuming loginAPI is a function that sends login request
    console.log(result);
    if (result.status === 200) {
      toast.success('Logged in');
      sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser));
      sessionStorage.setItem("token", result.data.token);
      setUserdata({
        username: "",
        password: ""
      });
   setTimeout(() => {
    navigate('/')
   }, 2500);
    } else {
      toast.success(result.response.data);
    }
  }
};
console.log(userdata);
{data && 
console.log(data);}
  return (
    <>
<div className='main-authdiv'>
<form className="form" style={{marginTop:signUpMode?'200px':'0px'}}>
     <h1>{signUpMode ? 'Sign Up' : 'Sign In'}</h1>

    {signUpMode &&  <>
      <div className='ms-3'>
                    <label for="file" class="custum-file-upload">

                        <div class="addimage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <img src={preview ? preview : `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%', border: '5px solid black' }} />
                        </div>
                        <input id="file" type="file" onChange={(e) => setUserdata({ ...userdata, Profile_picture: e.target.files[0] })} style={{ display: 'none' }} />

                    </label>
                </div>
        <div className="flex-column">
          <label>Full Name </label>
        </div>
        <div className="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
          <input type="text" className="input" value={userdata.actual_name}onChange={(e)=>setUserdata({...userdata,actual_name:e.target.value})} placeholder="Enter your Full name" />
        </div>
        </>  
} 
      <div className="flex-column">
      <label>username </label>
      </div>
      <div className="inputForm">
      <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
        <input type="text" className="input" value={userdata.username}onChange={(e)=>setUserdata({...userdata,username:e.target.value})} placeholder="Enter your Username" />
      </div>   
     
     {signUpMode &&  
     <>
     <div className="flex-column">
        <label>Email </label>
      </div>
      <div className="inputForm">
      <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
        <input type="text" className="input" value={userdata.email}onChange={(e)=>setUserdata({...userdata,email:e.target.value})} placeholder="Enter your Email" />
      </div> 
     </> }

      <div className="flex-column">
        <label>Password </label>
      </div>
      <div className="inputForm">
      <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
        <input
          type="password"
          className="input"  value={userdata.password}onChange={(e)=>setUserdata({...userdata,password:e.target.value})} 
          placeholder="Enter your Password"
        />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
      </div>
   {signUpMode &&   <div className="container">
      <div className="tabs">
        <input type="radio" id="radio-1" name="tabs" checked={activeTab === 1} onChange={() => handleTabChange(1)} />
        <label className="tab" htmlFor="radio-1">User</label>
        <input type="radio" id="radio-2" name="tabs" checked={activeTab === 2} onChange={() => handleTabChange(2)} />
        <label className="tab" htmlFor="radio-2">college</label>
        <input type="radio" id="radio-3" name="tabs" checked={activeTab === 3} onChange={() => handleTabChange(3)} />
        <label className="tab" htmlFor="radio-3">Sposnser</label>
       
      </div>
    </div>}
      {/* <div className="flex-row">
        
        <span className="span">Forgot password?</span>
      </div> */}
       {signUpMode ? "Already have an account? " : "Don't have an account? "}
            <button type="button" className="signuptoggler" onClick={toggleSignUp}>
              {signUpMode ? "Sign In" : "Sign Up"}
            </button>
  
     {signUpMode?       <button className="button-submit" onClick={handleRegister}>Register</button>
:
            <button onClick={handleLogin} className="button-submit">Login</button>
    }


      
    </form>
</div>




<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
  )
}

export default Authentication