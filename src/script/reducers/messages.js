export default function reducer(state={
    message: {
      id: null,
      user: null,
      content: null,
      timestamp: null,
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_MSG": {
        return {...state, fetching: true}
      }
      case "FETCH_MSG_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          message: action.payload,
        }
      }
      case "SET_MSG": {
        return {
          ...state,
          message: {...state.user, id: action.id, user: action.user, content: action.content, timestamp: action.timestamp},
        }
      }
    }

    return state
}
