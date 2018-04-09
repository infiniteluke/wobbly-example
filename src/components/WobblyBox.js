import React, { Component } from "react";
import PropTypes from "prop-types";
import { VrButton, View, SpotLight, Box, Animated } from "react-vr";
import Wobbly from "wobbly";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const COLORS = [
  "dodgerblue",
  "deepskyblue",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "darkgoldenrod"
];

class WobblyBox extends Component {
  static propTypes = {
    position: PropTypes.array,
    rotateY: PropTypes.number,
    flipped: PropTypes.bool
  };
  static defaultProps = {
    position: [0, 0, -3],
    rotateY: 0,
    flipped: false
  };
  static *getColor() {
    let i = 0;
    for (;;) {
      i += 1;
      yield COLORS[i % COLORS.length];
    }
  }
  colorIterator = this.constructor.getColor();
  state = {
    color: this.colorIterator.next().value
  };
  handleClick = () => {
    this.setState(() => ({ color: this.colorIterator.next().value }));
  };
  render() {
    const { rotateY, position, flipped } = this.props;
    console.log({ flipped });
    const Shape = this.state.color;
    return (
      <View
        style={{
          layoutOrigin: [0.5, 0.5],
          position: "absolute",
          transform: [{ rotateY }, { translate: position }]
        }}
      >
        <SpotLight
          intensity={1}
          style={{ transform: [{ translate: [1, 4, 4] }] }}
        />
        <Wobbly flipX onExitSpringFriction={2} onExitSpringTension={70}>
          {({ getMoveTargetProps, getWobblyTransformStyle }) => (
            <VrButton onClick={this.handleClick}>
              <AnimatedBox
                lit
                dimWidth={0.75}
                dimDepth={1}
                dimHeight={0.75}
                style={{
                  color: this.state.color,
                  transform: getWobblyTransformStyle()
                }}
                {...getMoveTargetProps()}
              />
            </VrButton>
          )}
        </Wobbly>
      </View>
    );
  }
}

export default WobblyBox;
