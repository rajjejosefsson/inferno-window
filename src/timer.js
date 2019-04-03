// @flow

// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js

const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

export type TimeoutID = {|
  id: AnimationFrameID,
|};

export function cancelTimeout(timeoutID: TimeoutID, ref: Node) {
  ownerWindow(ref).cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback: Function, delay: number, ref: Node): TimeoutID {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = ownerWindow(ref).requestAnimationFrame(tick);
    }
  }

  const timeoutID: TimeoutID = {
    id: ownerWindow(ref).requestAnimationFrame(tick),
  };

  return timeoutID;
}

function ownerWindow(ref: Node): Window {
  return ref.ownerDocument.defaultView;
}
