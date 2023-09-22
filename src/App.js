import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from './UserCard'
import { SimpleGrid } from '@chakra-ui/react';

const defaultFormData = {
  username: "",
  password: ""
}
function App() {
  const [users, setUsers] = useState()
  const [formData, setFormData] = useState(defaultFormData)
  useEffect(() => {
    axios.get("http://localhost:9000/api/users")
      .then(res => setUsers(res.data))
      .catch(e => console.log(e))
  }, []);

  const onSubmit = e => {
    e.preventDefault()
    axios.post("http://localhost:9000/api/users", formData)
        .then(res => {
          users.push(formData)
          setFormData(defaultFormData)
        })
        .catch(e => console.log(e))
  }
  const onChange = e => {
    const {name,value} = e.target
    setFormData(prev => ({...prev,[name]: value}))
  }
  return (
    <div className="App" style={{margin:"50px"}}>
      <header className="App-header">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {users && users.map(eachUser => <UserCard userData={eachUser} />)}
        </SimpleGrid>
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <input style={{border: "1px solid black"}}
                 type="text"
                 name="username"
                 value={formData.username}
                 onChange={onChange}
          />
          <br/>
          <label htmlFor="password">passwords</label>
          <input style={{border: "1px solid black"}}
                 type="password"
                 name="password"
                 value={formData.password}
                 onChange={onChange}
          />
          <br/>
          <button
              style={{border: "1px solid black"}}
              type="submit">submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
