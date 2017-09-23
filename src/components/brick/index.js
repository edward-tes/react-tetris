import React from "react"
import {APP} from "libs/env"
import {cls} from "libs/utils"
import "./styles.less"

export default class Brick extends React.Component {
  render() {
    const {x, y, className, style} = this.props
    return (
      <div className={cls(className, `${APP}-brick`)} 
      style={
        {
          ...style,
          left: x,
          top: y,
        }
      }
      >
      </div>
    )
  }
}
