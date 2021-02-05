import _ from "lodash";
import "./app.css";
import initializeSession from "@utils/vonage";

function App() {
  const element = document.createElement("div");

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(["Hello", "webpack!"], " ");

  // init session
  initializeSession();

  return element;
}

export default App;
