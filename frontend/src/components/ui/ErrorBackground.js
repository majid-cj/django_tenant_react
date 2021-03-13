import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HOME_SCREEN } from "../../constants";

export const ErrorBackground = ({ background }) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 15%;
    padding-left: 5%;
    padding-right: 5%;
  `;

  return (
    <Container>
      <img src={background} className="img-fluid" width={500} height={500} />

      <Link
        to={HOME_SCREEN}
        className="text-decoration-none m-4 p-2 fs-6 text-warning bg-dark rounded-pill"
      >
        go back to home screen
      </Link>
    </Container>
  );
};
