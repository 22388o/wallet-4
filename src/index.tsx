import { createRoot } from "react-dom/client";

function render() {
  const container = document.getElementById("root");

  if (!container) {
    console.error(`No element with ID: ${container} is found. No rendering react tree`);
    return;
  }

  const root = createRoot(container);
  root.render(<div>Helslo World</div>);
}

render();
