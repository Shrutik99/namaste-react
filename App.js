import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => Object => HTMLElement(render)
// React Core way of createElement
// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Namaste React 🚀",
// );

// JSX (transpiled before it reaches the JS) - Parcel - Babel
// JSX HTML-like or XML-like syntax
// JSX => Babel transpiles it to React.createElement => ReactElement - JS Object => HTMLElement(render)

const elem = <span>React Element</span>;

const title = (
  <h1 className="head" tabIndex="1">
    {elem}
    Namaste React using JSX 🚀
  </h1>
);

// React Functional Component
const HeadingComponent = () => (
  <div id="container">
    {title}
    <h1 className="heading">Namaste React Functional Component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
