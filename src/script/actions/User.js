export function setUsername(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}


export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Will",
      age: 35,
    }
  }
}