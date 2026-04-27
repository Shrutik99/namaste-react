import React from "react";
import ReactDOM from "react-dom/client";

// Using React.createElement
// const container = React.createElement("div", { className: "title" }, [
//   React.createElement("h1", {}, "This is heading 1"),
//   React.createElement("h2", {}, "This is heading 2"),
//   React.createElement("h3", {}, "This is heading 3"),
// ]);

// Using JSX
// const container = (
//   <div className="title">
//     <h1>This is heading 1</h1>
//     <h2>This is heading 2</h2>
//     <h3>This is heading 3</h3>
//   </div>
// );

// Functional Component of JSX
const Container = () => (
  <div className="title">
    <h1 id="head1">This is heading 1</h1>
    <h2 id="head2">This is heading 2</h2>
    <h3 id="head3">This is heading 3</h3>
    <Title />
  </div>
);

// Composition Component
const Title = () => {
  return <p>This is Paragraph</p>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Container />);
