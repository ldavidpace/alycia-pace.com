import * as $ from 'jquery'; 

const listeners = {

}

export enum directions {
  RIGHT = 'right',
  LEFT = 'left',
}
type swipeCallback = (direction: directions) => void;

export function setUpSwipe(node: HTMLElement | null, callback:swipeCallback ): () => void {
  if(!node) return () => {};
  const initital = {
    start: 0,
    stop: 0,
    dragging: false,
    dragStart: 0,
    node,
  }
  listeners[node.classList.toString()] = initital;

  var myMouseDown = mouseDown.bind(node, node);
  var myMouseUp = mouseup.bind(node, node, callback);
  var myMouseMove = mousemove.bind(node, node);
  var myTouched = touched.bind(node, node, callback);
  $(node).mousedown(myMouseDown);
  $(document).mouseup(myMouseUp);
  $(node).on('touchstart', myTouched);
  $(node).on('touchmove', myMouseMove);
  $(document).on('touchend', myTouched);
  return () => {
    $(node).off('mousedown', myMouseDown);
    $(document).off('mouseup', myMouseUp);
    $(node).off('touchstart', myTouched);
    $(document).off('touchend', myTouched);
    $(document).off('touchmove', myMouseMove);
  }
}

function mouseDown(node: HTMLElement, event: any) {
  let x = event.clientX;
  listeners[node.classList.toString()].start = x;
  listeners[node.classList.toString()].dragStartTime = new Date().getTime();
  listeners[node.classList.toString()].dragging = true;
  return false;
}


function mouseup(node: HTMLElement, callback: swipeCallback, event: any) {
  const info = listeners[node.classList.toString()];
  let x = event.clientX;
  if (info.dragging && new Date().getTime() - info.dragStartTime < 1000 ) {
    if (x - info.start > 50) {
      callback(directions.RIGHT);
    } else if (x - info.start < -50){
      callback(directions.LEFT);
    }
    listeners[node.classList.toString()].dragging = false;
  }
}



function touched(node: HTMLElement, callback:swipeCallback, event: any) {
  let x = 0;
  if(event.touches && event.touches.length > 0) {
    x = event.touches[0].clientX;
    listeners[node.classList.toString()].start = x;
    listeners[node.classList.toString()].dragStartTime = new Date().getTime();
    listeners[node.classList.toString()].dragging = true;
  } else if (listeners[node.classList.toString()].dragging)  {
    
    const listener = listeners[node.classList.toString()];
    if(listener.distance > 50) {
      callback(directions.RIGHT);
    } else if (listener.distance < -50) {
      callback(directions.LEFT);
    }
    listeners[node.classList.toString()].dragging = false;
  }
}

function mousemove(node: HTMLElement, event: any) {
  let x = 0;
  if(event.touches && event.touches.length > 0) {
    x = event.touches[0].clientX;
  }
  const listener = listeners[node.classList.toString()];
  listener.distance = x - listener.start;
}