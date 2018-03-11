import React from "react"
import { connect } from "react-redux"

import * as Chat from "../actions/Chat"
import * as User from "../actions/User"

var chatRoomId = 0;
var username = "johnhckuo";
var otherusername = "zaza";

@connect((store) => {
  return {
    user: store.user.user,
    chatroom: store.chatroom
  };
})
export default class Chatroom extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(Chat.createChatroom(username, 22));
    this.props.dispatch(Chat.createChatroom(otherusername, 26));
  }

  currentTime() {
    var date = new Date();

    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var hh = date.getHours();
    var minutes = date.getMinutes();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            (hh>9 ? '' : '0') + hh,
            (minutes>9 ? '' : '0') + minutes
           ].join('.');
  };

  shouldComponentUpdate(nextProps, nextState){
    const differentCurrentValue = this.props.chatroom.RoomArr[chatRoomId].currentMessage != nextProps.chatroom.RoomArr[chatRoomId].currentMessage;
    return !differentCurrentValue;
  }

  sendMessage(currentMessage){
    this.props.dispatch(Chat.setMsg(chatRoomId, username, currentMessage, this.currentTime()));
    this.props.dispatch(Chat.setMsg(chatRoomId, otherusername, "What?", this.currentTime()));

  }

  onInputMessage(e){
    this.props.dispatch(Chat.setCurrentMsg(chatRoomId, e.target.value));
  }

  render() {
    const { chatroom, user } = this.props;
    const currentChatroom = chatroom.RoomArr[chatRoomId];
    console.log("rerender")
    return (<div className="chatRoom">
      <div className = "chatRoomHeader"><h2>Chatroom 123</h2></div>
      <div className = "chatMessageContent">
        {
          currentChatroom.message.map((val)=>{
            if (val.user === username){
              return (<div className="msg toMsg" key={val.id}>
                <div className = "msg_content">{val.content}</div>
                <div className = "sent_time">{val.timestamp}</div>
              </div>);
            }else{
              return(<div className="msg fromMsg" key={val.id}>
                <div className = "msg_sender">{val.user}</div>
                <div className = "msg_content">{val.content}</div>
                <div className = "sent_time">{val.timestamp}</div>

              </div>);
            }
          })
        }
      </div>
      <div className = "chatBar" ><input value = {currentChatroom.currentMessage} onChange = {this.onInputMessage.bind(this)} className = "submitBar" /><button onClick = {this.sendMessage.bind(this, currentChatroom.currentMessage)}>Submit</button></div>
    </div>);
  }
}

function SubmitTime(){
  let currentTime = new Date();
  //console.log(currentTime.getMinutes())
  return <div></div>;
}

function Submit(props){
  return;
}
