import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Input, Grid, Icon, Container, Form, Image, Card, Header, Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import { useState } from "react";

function App() {
    const [username, setUsername] = useState([]);
    const [value, setValue] = useState("");
    const submitHandler = (e) => {
        console.log("submit");

        fetch(`https://api.github.com/search/users?q=${value}`)
            .then((res) => res.json())
            .then((data) => setUsername([...data.items]));
    };

    return (
        <>
            <Container text>
                <Navbar />
                <br />
                <br />
                <br />
                <Header as="h2">Github Finder</Header>
                <Form onSubmit={(e) => submitHandler(e)} className="">
                    <Form.Field>
                        <Input onChange={(e) => setValue(e.target.value)} label="@" placeholder="Github Username" />
                    </Form.Field>
                </Form>
                <br />
                <Grid>
                    <Grid.Row columns={2}>
                        {username
                            ? username.map((item) => {
                                  return (
                                      <Grid.Column>
                                          <Card>
                                              <Image src={item.avatar_url} wrapped ui={false} />
                                              <Card.Content>
                                                  <Card.Header>{item.login}</Card.Header>
                                              </Card.Content>
                                              <Card.Content extra>
                                                  <a>
                                                      <Button href={item.html_url} content="Show" secondary />
                                                  </a>
                                              </Card.Content>
                                          </Card>
                                          <br />
                                      </Grid.Column>
                                  );
                              })
                            : null}
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    );
}

export default App;
