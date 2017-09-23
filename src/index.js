import "babel-polyfill"
import {Provider} from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer as HMRContainer } from "react-hot-loader"
import Game from "components/game"
import store from "store"

import "./index.less"

const render = (Comp) => {
  ReactDOM.render(
    <HMRContainer>
    <Provider store={store}>
    <Comp/>
    </Provider>
    </HMRContainer>,
    document.getElementById("root")
  )
}

render(Game)

if (module.hot) {
  module.hot.accept("components/game", () => render(Game))
}
