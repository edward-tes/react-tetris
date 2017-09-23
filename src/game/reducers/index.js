import update from "immutability-helper"
import {
  SET_BREAKPOINT, 
  INIT_GAME,
  SET_ACTIVE_BRICK,
  REFRESH_SCREEN,
  SET_BRICK_DOWN,
  MOVE,
} from "game/actions"

const initialState = {
  breakpoint: null,
  grid: null,
  rows: 0,
  columns: 0,
  activeBrick: {row: 5, column: 5},
}

update.extend(
  "$autoObject",
  (value, object) =>
    object != null ? update(object, value) : update({}, value),
)

const handlers = {
  [SET_BREAKPOINT](state, { breakpoint }) {
    return update(state, {
      breakpoint: { $set: breakpoint },
    })
  },
  [INIT_GAME](state, {row, column, brickSize} ) {
    let grid = []
    for(let i = 0; i < row; i++) {
      for(let j = 0; j < column; j++) {
        if(!grid[i]) {
          grid[i] = {}
        }
        grid[i][j] = {
          x: i * brickSize,
          y: j * brickSize,
          brick: null,
        }
      }
    }
    return update(state, {
      grid: {$set: grid},
      rows: {$set: row},
      columns: {$set: column},
    })
  },
  [SET_ACTIVE_BRICK](state, {row, column}) {
    return update(state, {
      activeBrick: {
        $autoObject: {
          row: {
            $set: row,
          },
          column: {
            $set: column,
          },
        }
      },
    })
  },
  [REFRESH_SCREEN](state) {
    if(state.activeBrick) {
      const brick = state.activeBrick
      return update(state, {
        grid:{
          [brick.row]: {
            [brick.column]: {
              brick: {
                $set: true
              }
            }
          }
        }
      })
    } else {
      return state
    }
  },
  [SET_BRICK_DOWN](state) {
    const brick = state.activeBrick
    if(brick && brick.column < state.columns - 1) {
      let currentState = update(state, {
        grid:{
          [brick.row]: {
            [brick.column]: {
              brick: {
                $set: false
              }
            }
          }
        }
      })
      return update(currentState, {
        activeBrick: {
          column: {
            $apply: prevCount =>
               prevCount == state.columns - 1 ?  prevCount : prevCount + 1,
          } 
        }
      })
    } else {
      return state
    }
  },
  [MOVE](state, {direction}) {
    const brick = state.activeBrick
    if(brick && brick.row > 0 && brick.row < state.rows) {
      return update(currentState, {
        activeBrick: {
          row: {
            $apply: prev =>
            prev + direction,
          } 
        }
      })
    } else {
      return state
    }
  }
}

export default function app(state = initialState, action) {
  const type = action.type
  if (!handlers[type]) return state
  return handlers[type](state, action)
}
