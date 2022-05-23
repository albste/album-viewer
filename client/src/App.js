import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://localhost:3001/api'
    };
    
    axios(config)
    .then(function (response) {
      setData(JSON.stringify(response.data.message));
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;