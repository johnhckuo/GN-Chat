import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Chatroom from "./components/Chatroom"
import store from "./store"
import "../style/reset.scss"
import "../style/chatroom.scss"
import "../style/main.scss"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <Chatroom />
</Provider>, app);
