export function setUsername(name, age) {
  return {
    type: 'SET_USER_NAME',
    payload: {
   		name,
   		age
    }
  }
}


export function fetchUser(id) {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      id
    }
  }
}