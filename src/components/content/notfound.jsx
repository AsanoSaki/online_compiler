import React, { Component } from "react";
import Card from "./card";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <Card header={<h3>404 NotFound</h3>}>
        <h1>您要找的页面丢失啦！请仔细确认网址的有效性！</h1>
      </Card>
    );
  }
}

export default NotFound;
