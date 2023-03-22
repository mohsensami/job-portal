import React from "react";
import { Menu, Icon, Container } from "semantic-ui-react";

function Navbar() {
  return (
    <Menu borderless inverted fixed="top" color="violet">
      <Menu.Item  ><Icon name="github" />GithubFinder</Menu.Item>
            
    </Menu>
  );
}
export default Navbar;