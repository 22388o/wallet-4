import { createRoot } from "react-dom/client";

import App from "./App";

function render() {
  const container = document.getElementById("root");

  if (!container) {
    console.error(`No element with ID: ${container} is found. No rendering react tree`);
    return;
  }

  container.setAttribute("style", "height:100%;width:100%;");
  const root = createRoot(container);
  root.render(<App />);
}

render();
