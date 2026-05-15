import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default Location",
      },
    };
    // console.log(this.props.name + " Child Constructor");
  }

  async componentDidMount() {
    // console.log(this.props.name + " Child Component Did Mount");
    // API call

    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();

    // console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    // console.log("Component Did Update");
  }

  componentWillUnmount() {
    // console.log("Component Will Unmount");
  }

  render() {
    // console.log(this.props.name + " Child Render");
    const { avatar_url, name, location } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @akshaymarch7</h4>
      </div>
    );
  }
}

export default UserClass;

/**
 *
 * ---- MOUNTING ----
 *
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML dummy>
 * Component Did Mount
 *      <API call>
 *      <this.setState> --> state variable is updated
 *
 * ---- UPDATE -----
 *
 *      render(API data)
 *      <HTML(new API data)>
 *      component Did Update
 *
 */
