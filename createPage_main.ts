import "./lib/state";
import "./lib/view/createPageRenderer";

import "./lib/view/templates/pages/acceptablePage";
import { dispatch_setInit } from "./lib/dispatch/stateChange";

(async function init() {
  //Wait for the animation, then dispatch set init
  setTimeout(function () {
    dispatch_setInit();
  }, 4000);
})();
