import React from "react"
import { connect } from "react-redux"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Chat from "../actions/Chat"
import * as User from "../actions/User"

@connect((store) => {
  return {
    user: store.user,
    chatroom: store.chatroom
  };
})
export default class Chatroom extends React.Component {

  constructor(props){
    super(props);
    this.chatRoomId = 0;
    this.username = "johnhckuo";
    this.otherusername = "zaza";
    this.userId = 0;
    this.otherUserId = 1;
  }

  componentWillMount() {
    this.props.dispatch(Chat.createChatroom(this.username));
    this.props.dispatch(Chat.createChatroom(this.otherusername));
    this.props.dispatch(User.createUser(this.username, 22, ""));
    this.props.dispatch(User.createUser(this.otherusername, 26, "zaza.png"));
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

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.sendMessage.call(this, e.target.value);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    const differentCurrentValue = this.props.chatroom.RoomArr[this.chatRoomId].currentMessage != nextProps.chatroom.RoomArr[this.chatRoomId].currentMessage;
    return !differentCurrentValue;
  }

  sendMessage(currentMessage){
    this.props.dispatch(Chat.setMsg(this.chatRoomId, this.userId, currentMessage, this.currentTime()));
    this.props.dispatch(Chat.setMsg(this.chatRoomId, this.otherUserId, "What?", this.currentTime()));
  }

  onInputMessage(e){
    this.props.dispatch(Chat.setCurrentMsg(this.chatRoomId, e.target.value));
  }

  render() {
    const { chatroom, user } = this.props;
    const currentChatroom = chatroom.RoomArr[this.chatRoomId];
    return (<div className="chatRoom">
      <div className = "chatRoomHeader"><h2>Chatroom 123</h2></div>
      <div className = "chatMessageContent">
        <ReactCSSTransitionGroup transitionName="message" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
        {
          currentChatroom.message.map((val)=>{
            if (val.userId === this.userId){
              return (<div className="msg toMsg" key={val.id}>
                <div className="msg_container">
                  <div className = "msg_content">{val.content}</div>
                </div>
                <div className = "sent_time">{val.timestamp}</div>
              </div>);
            }else{
              var userImage = user.UserList[val.userId].image;
              return(<div className="msg fromMsg" key={val.id}>
                <div className="msg_container">
                  <div className = "user_icon"><img src={require(`../../images/${userImage}`)} /></div>
                  <div className = "msg_content">{val.content}</div>
                </div>
                <div className = "sent_time">{val.timestamp}</div>

              </div>);
            }
          })
        }
        </ReactCSSTransitionGroup>
      </div>
      <div className = "chatBar" ><input onKeyPress={this.handleKeyPress.bind(this)} value = {currentChatroom.currentMessage} onChange = {this.onInputMessage.bind(this)} className = "submitBar" /><button onClick = {this.sendMessage.bind(this, currentChatroom.currentMessage)}>Submit</button></div>
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
