export default function reducer(state={
    user: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {
          ...state.user[action.payload.id],          
        }

      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {id: state.user.length, name: action.payload.name, age: action.payload.name},
        }
      }
    }

    return state
}
