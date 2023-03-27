let RENDER_COUNTER = 0;
function getCounter() {
  return RENDER_COUNTER++;
}
export { RENDER_COUNTER, getCounter };
