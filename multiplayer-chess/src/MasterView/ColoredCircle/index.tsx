import React from "react";

import "./styles.css";

type ColoredCircleProps = {
  color: string;
};

const ColoredCircle = ({ color }: ColoredCircleProps) => {
  const styles = { backgroundColor: color };

  return color ? (
    <>
      <span className="colored-circle" style={styles} />
    </>
  ) : null;
};

export default ColoredCircle;
