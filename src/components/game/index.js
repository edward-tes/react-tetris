import React from "react"
import {connect} from "react-redux"
import {APP} from "libs/env"
import * as rem from "libs/rem"
import timer from "hocs/timer"
import {cls} from "libs/utils"
import * as mediaQuery from "libs/media-query"
import {
  setBreakpoint,
  initGame,
  refreshScreen,
  setBrickDown,
} from "game/actions"
import { PHONE, PAD_NARROW, PAD_WIDE } from "game/constants"

import BrickContainer from "components/brick-container"

import "./styles.less"

@connect(undefined, 
  {
    setBreakpoint,
    initGame,
    refreshScreen,
  setBrickDown,
  }
)
@timer
export default class Game extends React.Component {
  render() {
    return (
      <div className={cls(`${APP}-game`)} >
        <BrickContainer />
      </div> 
    )
  }

  componentWillMount() {
    const {initGame} = this.props
    initGame(12, 20, 24)
  }

  async componentDidMount() {
    const { setBreakpoint} = this.props
    this.fps = this.props.setInterval(this.updateScreen, 60)
    this.gameTimer = this.props.setInterval(this.startGame, 1000)

    mediaQuery.add("(max-width: 767px)", () => setBreakpoint(PHONE))
    mediaQuery.add("(min-width: 768px) and (max-width: 1023px)", () =>
      setBreakpoint(PAD_NARROW),
    )
    mediaQuery.add("(min-width: 1024px)", () => setBreakpoint(PAD_WIDE))
    rem.init()
  }
  updateScreen = () => {
    this.props.refreshScreen()
  }
  startGame = () => {
    const {setBrickDown} = this.props
    setBrickDown()
  }
}
