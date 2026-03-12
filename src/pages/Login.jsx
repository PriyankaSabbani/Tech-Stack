import React from "react"; 
function Login() { 
  return ( 
  <div className="container mt-5"> 
  <h1>Login</h1>
   <form>
     <input type="name " placeholder="Name"/><br/>
     <br/>
      <input type="email" id="email" placeholder="Email"/><br/>
     <br/> 
     <input type="password" placeholder="Password"/><br/>
     <br/> 
     <button>Login</button> 
     </form> 
     <p>Please log in to access your courses.</p> 
     </div>
      ); 
    } 
    export default Login;