import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";

import Button from "./src/components/Button";
import WobblyBox from "./src/components/WobblyBox";

export default class WobblyExample extends React.Component {
  state = {
    flipped: false
  };
  handleClick = () =>
    this.setState(prevState => ({ flipped: !prevState.flipped }));
  render() {
    return (
      <View>
        <Pano source={asset("chess-world.jpg")} />
        <WobblyBox flipped={this.state.flipped} rotateY={-30} />
        <Button
          flipped={this.state.flipped}
          onClick={this.handleClick}
          rotateY={30}
        >
          Click To Invert
        </Button>
      </View>
    );
  }
}

AppRegistry.registerComponent("WobblyExample", () => WobblyExample);
