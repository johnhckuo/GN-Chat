
export function fetchChatContent(chatId, user) {
  return {
    type: "FETCH_CHAT",
    payload: {
      chatId,
      user,
    }
  }
}
export function setMsg(chatId, user, content, timestamp) {
  return {
    type: "SET_MSG",
    payload: {
      chatId,
      user,
      content,
      timestamp
    }
  }
}

export function setCurrentMsg(chatId, currentMessage) {
  return {
    type: "SET_CURRENT_MSG",
    payload: {
      chatId,
      currentMessage
    }
  }
}

export function createChatroom(...users) {
  return {
    type: "CREATE_CHATROOM",
    payload: {
      users:{...users}
    }
  }
}
