import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from './UserCard'
import { SimpleGrid,  FormControl,
  FormLabel,
  Field,
Input,
Button} from '@chakra-ui/react';

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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div className="App" style={{ margin: "50px" }}>
      <header className="App-header">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {users && users.map(eachUser => <UserCard userData={eachUser} />)}
        </SimpleGrid>
        <form onSubmit={onSubmit}>
    
        <FormControl >
            <FormControl >
              <FormLabel>username</FormLabel>
              <Input
                focusBorderColor='pink.400'
                placeholder='Here is a sample placeholder'
                type="text"
                name="username"
                value={formData.username}
                onChange={onChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>password</FormLabel>
              <Input
                focusBorderColor='pink.400'
                placeholder='Here is a sample placeholder'
                type="password"
                value={formData.password}
                name="password"
                onChange={onChange}
              />
            </FormControl>
          
        </FormControl>
        <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
          </form>

      </header>
    </div>
  );
}

export default App;
