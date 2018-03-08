import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/UserActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched
  };
})
export default class Chatroom extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  render() {
    return <div>
      <h1>{this.props.user.name}</h1>
      <ul>yo</ul>
    </div>
  }
}
