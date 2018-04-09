import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, VrButton, Animated } from "react-vr";
import Wobbly from "wobbly";

const ParallaxButton = Animated.createAnimatedComponent(VrButton);

function Button({ rotateY, position, children, flipped, onClick }) {
  return (
    <View
      style={{
        layoutOrigin: [0.5, 0.5],
        position: "absolute",
        transform: [{ rotateY }, { translate: position }]
      }}
    >
      <Wobbly flipX={flipped} flipY={flipped}>
        {({ getMoveTargetProps, getWobblyTransformStyle }) => (
          <ParallaxButton
            style={{
              transform: getWobblyTransformStyle(),
              backgroundColor: flipped ? "pink" : "blue",
              padding: 0.15,
              borderRadius: 0.02
            }}
            onClick={onClick}
            {...getMoveTargetProps({
              onExit: () => console.log("Exited button")
            })}
          >
            <Text
              style={{
                fontSize: 0.2,
                width: 2,
                textAlignVertical: "center",
                textAlign: "center",
                transform: [
                  {
                    translateZ: 0.13
                  }
                ]
              }}
            >
              {children}
            </Text>
          </ParallaxButton>
        )}
      </Wobbly>
    </View>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.array,
  rotateY: PropTypes.number,
  flipped: PropTypes.bool
};

Button.defaultProps = {
  position: [0, 0, -3],
  rotateY: 0,
  flipped: false
};

export default Button;
