import React from "react"
import {connect} from "react-redux"
import {APP} from "libs/env"
import Brick from "components/brick"
import BrickGroup from "components/brick-group"
import {cls} from "libs/utils"

import "./styles.less"

@connect(({game}) => ({
  grid: game.grid,
}))
export default class BrickContainer extends React.Component {
  render() {
    let {grid} = this.props || []
    grid[11][10].brick = true
    return (
      <div className={cls(`${APP}-brick-container`)}>
      {
        grid.map((item, i) =>
          Object.keys(item).map((key) =>
            <Brick className={cls(item[key].brick ? `${APP}-brick-active` : "" )} x={item[key].x} y={item[key].y}/>
          )
        )
      }
      <BrickGroup />
      </div> 
    )
  }
}
