import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";

// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy Loading
// On Demand Loading
// Dynamic Import

const Grocery = lazy(() => import("./components/Grocery"));

const About = lazy(() => import("./components/About"));

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

// const elem = <span>React Element</span>;

// const title = (
//   <h1 className="head" tabIndex="1">
//     {elem}
//     Namaste React using JSX 🚀
//   </h1>
// );

// React Functional Component
// const HeadingComponent = () => (
//   <div id="container">
//     {title}
//     <h1 className="heading">Namaste React Functional Component</h1>
//   </div>
// );

// not using keys (not acceptable) <<<< index as key <<<<<<<< unique id (best practice)

const AppLayout = () => {
  const [userName, setUserName] = useState();

  // authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Akshay Saini",
    };

    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
