import { useState } from "react";

function StudentLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if(username === "student" && password === "student123"){
      alert("Student Login Successful");
    } else {
      alert("Invalid Student Username or Password");
    }

  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h2>Student Portal Login</h2>

      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default StudentLogin;