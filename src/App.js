import "./App.css";
import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import Navbar from "./components/navbar";
import axios from "axios";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Pusher from 'pusher-js'
//import Register from './register'
import "react-toastify/dist/ReactToastify.css";

function App() {
  let history = useHistory();

  var pusher = new Pusher("afbd21c4a109a44da4cc", {
    cluster: "ap2",
  });
  var channel = pusher.subscribe("messages");

  //const [users, setUsers] = useState([]);
  const [loginId, setLoginId] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const url = "https://enigma-api.herokuapp.com";

  const loginErr = () => {
    toast.error("Incorrect ID!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const loginSucc = () => {
    toast.success("Welcome to Enigma", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function loginUser(e) {
    e.preventDefault();
    const id = loginId;
    console.log(loginId);
    axios
      .post(`${url}/login/` + id)
      .then((res) => {
        localStorage.setItem(
          "authorization",
          "Bearer " + res.data.authorization
        );
        setLoginStatus(true);
        history.push("/app");
        setLoginId("");
        loginSucc();
      })
      .catch((error) => {
        console.log(error);
        setLoginStatus(false);
        loginErr();
      });
  }

  const authCheck = () => {
    axios
      .get(`${url}/login/` + loginId, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        return true;
      });
  };

  const handleSubmit = (e) => {
    setLoginId(e.target.value);
  };

  const currentUser = loginId;

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={!true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
        />
        <Switch>
          <Route exact path="/">
            <div className="enigma-login">
              <h1>
                Enigma <span>Chat</span> 💙
              </h1>
              <form onSubmit={loginUser}>
                <input
                  value={loginId}
                  onChange={handleSubmit}
                  type="text"
                  required
                  placeholder="enter enigma id"
                ></input>
                <br />
                <button onClick={authCheck} type="submit">
                  Login 🚀
                </button>
                <p>
                  Welcome to <a href="/register">Enigma!</a>
                </p>
              </form>
            </div>
          </Route>
          {/* <Route exact path='/register'>
              <Register/>
          </Route> */}
          <Route exact path="/app">
            {loginStatus ? (
              <div>
                <Navbar currentUser={currentUser} />
                <div className="app-body">
                  <Sidebar currentUser={currentUser} />
                  <Chatbox currentId={currentUser} channel={channel}/>
                </div>
              </div>
            ) : (
              <div className="enigma-login">
                <ToastContainer
                  position="top-center"
                  autoClose={3500}
                  hideProgressBar={!true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnHover
                />
                <h1>
                  Enigma <span>Chat</span> 💙
                </h1>
                <form onSubmit={loginUser}>
                  <input
                    value={loginId}
                    onChange={handleSubmit}
                    type="text"
                    required
                    placeholder="enter enigma id"
                  ></input>
                  <br />
                  <button onClick={authCheck} type="submit">
                    Login 🚀
                  </button>
                  <p>
                    Welcome to <a href="/register">Enigma</a>
                  </p>
                </form>
              </div>
            )}
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
