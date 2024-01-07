import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../log.png"
import "./Signup.css";

import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { registerUser } from "../../apis/Auth";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header/Header";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false)
  // Access the client
  const queryClient = useQueryClient()
  //Registration mutation
  const registerUserMutation = useMutation(
    registerUser, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Successfully toasted!')
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    //validate all inputs
    if (name === "" || email === ""  || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const data = {
      name,
      email,
      // phone,
      password,
    };
  
  registerUserMutation.mutate(
    data
  )
  setLoading(false)
};

return (<>
<Header/>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}
  >
    <div className="signupParentDiv"
      style={{
        marginTop:"270px"
      }}
    >
      <img width="400px" height="200px" src={Logo} alt=""></img>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <br />
        <label>Email</label>
        <br />
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <br />
        {/* <label>Phone</label>
        <br />
        <input
          className="input"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
        /> */}
        <br />
        <label>Password</label>
        <br />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <br />
        <br />
        <button>Signup</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  </div>
  <Toaster/>
</>
);
}
