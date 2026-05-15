import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);

    // console.log("Parent Counstructor");
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Render");
    return (
      <div>
        <h1>About</h1>
        <div>
          Logged In User
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="text-lg font-bold">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>
        </div>
        <h2>This is Namaste React Web Series</h2>
        <UserClass name={"First"} location={"Shirpur Class"} />
      </div>
    );
  }
}

/*
  - Parent constructor
  - Parent render

    -First Child constructor
    -First Child render

    -Second Child constructor
    -Second Child render

    <DOM UPDATED - IN SINGLE BATCH>

    -First Child componentDidMount
    -Second Child componentDidMount

  - Parent componentDidMount
*/

export default About;
