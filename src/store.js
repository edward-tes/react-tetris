import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import game from "game/reducers"


const store = createStore(
  combineReducers({
    game,
  }),
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

export const dispatch = store.dispatch.bind(store)
export const getState = store.getState.bind(store)

export default store
