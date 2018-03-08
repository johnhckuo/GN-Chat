import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/UserActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    //message: store.message.message
  };
})
export default class Chatroom extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      toMsg: [],
      fromMsg: [],
      currentMsg : ""
    });
  }

  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  sendMessage(e){
    this.setState((prevState, props)=>{
      return {
        toMsg: prevState.toMsg.concat([prevState.currentMsg]),
        currentMsg: ""
      };
    }, ()=>{
      console.log(this.state.toMsg)
    });
  }

  onInputMessage(e){
    this.setState({
      currentMsg: e.target.value
    })
  }

  render() {
    return <div className="chatRoom">
      <ChatroomHeader />
      <ChatMessageContent />
      <Submit currentMsg = {this.state.currentMsg} sendMessage = {this.sendMessage.bind(this)} onInputMessage = {this.onInputMessage.bind(this)}/>
    </div>
  }
}

function ChatroomHeader(){
  return <div className = "chatRoomHeader"><h2>Chatroom 123</h2></div>;
}

function ChatMessageContent(){
  return <div className = "chatMessageContent"><div className="msg"><span className="fromMsg">Message1</span></div><div className="msg"><span className = "toMsg">Message2</span></div></div>;
}

function Submit(props){
  return <div className = "chatBar" ><input onChange = {props.onInputMessage} value={props.currentMsg} className = "submitBar" /><button onClick = {props.sendMessage}>Submit</button></div>;
}
