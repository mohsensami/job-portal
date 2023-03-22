import './App.css'
import Navbar from './components/layout/Navbar'
import { Input, Grid, Icon, Container, Form, Image, Card, Header } from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css'
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('')
const submitHandler = (e) => {
  if (e.keyCode === 13){
    fetch('https://api.github.com/users')
    .then((res)=>res.json())
    .then((data)=>setUsername(data))
  }
}

  return (
    <>
    <Container text>
      <Navbar />
<br />
<br />
<br />
    <Header as='h2'>Github Finder</Header>
    <Form className=''>
      <Form.Field>
          <Input onKeyDown={(e)=>submitHandler(e)} label='@' placeholder='Github Username' />
      </Form.Field>
    </Form>
    <br />
    <Grid>
<Grid.Row columns={2}>
    {username ? 
      username.map((item)=>{
        return (


      <Grid.Column>
        <Card>
    <Image src={item.avatar_url} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
      </Grid.Column>
    


        )
      })
    : null}
    </Grid.Row>
  </Grid>
    </Container>
    </>
  )
}

export default App
