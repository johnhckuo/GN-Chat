import React from "react"
import { connect } from "react-redux"

import * as Chat from "../actions/Chat"
import * as User from "../actions/User"

var chatRoomId = 0;
var username = "johnhckuo";

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
    this.props.dispatch(Chat.createChatroom(username));
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
              return (<div className="msg" key={val.id}>
                <span className = "toMsg">{val.content}</span>
              </div>);
            }else{
              return(<div className="msg" key={val.id}>
                <span className = "fromMsg">{val.content}</span>
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
