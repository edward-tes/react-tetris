export const SET_BREAKPOINT = "GAME_SET_BREAKPOINT"
export const INIT_GAME = "GAME_INIT_GAME"
export const SET_ACTIVE_BRICK = "GAME_ACTIVE_BRICK"
export const REFRESH_SCREEN = "GAME_REFRESH_SCREEN"
export const SET_BRICK_DOWN = "GAME_SET_BRICK_DOWN"
export const MOVE = "GAME_MOVE_LEFT"

export function setBreakpoint(breakpoint) {
  return {
    type: SET_BREAKPOINT,
    breakpoint,
  }
}

export function initGame(row, column, brickSize) {
  return {
    type: INIT_GAME,
    row,
    column,
    brickSize,
  } 
}

export function refreshScreen() {
  return {
    type: REFRESH_SCREEN,
  }
}

export function setActiveBrick(row, column) {
  return {
    type: SET_ACTIVE_BRICK,
    row,
    column,
  } 
}

export function setBrickDown() {
  return {
    type: SET_BRICK_DOWN,
  } 
}

export function move(direction) {
  return {
    type: MOVE_LEFT,
    direction,
  }  
}

