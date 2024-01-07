import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Logo from "../../log.png";
import "./Login.css";
import toast, {Toaster } from "react-hot-toast";
import { loginUser } from "../../apis/Auth";
import { useMutation } from "react-query";
import { AuthContext } from "../../contextStore/AuthContext";
import Header from "../Header/Header";


function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false)
  const {setUser} = useContext(AuthContext)
  const history = useHistory()

  const loginUserMutation = useMutation(
    loginUser, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Successfully loggedIn!')
      setUser(JSON.parse(localStorage.getItem("user")))
      history.push("/")
    },
    onError: (err) => {
      toast.error(err);
    },

  })

  const handleSubmit = (e) => {

    e.preventDefault();
    //validate all inputs 
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const data = {
      email,
      password,
    };
    loginUserMutation.mutate(
      data
    )
  };
  return (<>
    <div>
  <Header/>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
    <Toaster/>
  </>
  );
}

export default Login;
