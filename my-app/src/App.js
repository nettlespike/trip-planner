import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'


function App() {

  const [loc, setLoc] = useState([]);

  useEffect(()=>{
    const fetchAllLoc = async () =>{
      try{
        const res=await axios.get("http://localhost:3306")
        setLoc(res.data);
      }
      catch(err){
        console.log("Fetch Error:\n" + err);
      }
    }
    fetchAllLoc()
  },[]);



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Trip Planner
        </h1>


      </header>
    </div>
  );
}

export default App;
