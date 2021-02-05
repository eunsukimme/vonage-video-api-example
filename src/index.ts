import App from "@components/App";

function render(component: any, rootElement: Element | null) {
  if (!rootElement) {
    console.log("Can't find root element.");
    return;
  }
  rootElement.appendChild(component);
  console.log("rendering complete");
}

function RootComponent() {
  return App();
}

render(RootComponent(), document.getElementById("root"));
