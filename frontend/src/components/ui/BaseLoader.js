import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { debounce } from "../../utils/utils";

export const BaseLoader = ({
  show = false,
  width = "100%",
  height = "100%",
  opacity = 1,
  background = "transparent",
}) => {
  const [loading, setLoading] = useState(show);
  const onLoading = debounce((newAlert) => {
    setLoading(newAlert);
  });

  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

  const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 2rem;
    opacity: 1;
  `;

  useEffect(() => {
    onLoading(show);
  }, [onLoading, show]);

  if (!loading) return <React.Fragment />;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        opacity: opacity,
        background: background,
        width: width,
        height: height,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Rotate>&lt; 🍺🌯 &gt;</Rotate>
    </div>
  );
};
