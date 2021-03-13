import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { HOME_SCREEN } from "../../constants";
import BgImage from "../../resources/images/bg.jpg";

export const Background = (props) => {
  const location = useLocation();

  const BackgroundWrapper = styled.div`
    background-image: url("${BgImage}");
    background-repeat: no-repeat;
    background-size: cover;
    height: 400px;
  `;

  const BreifContainer = styled.div`
    width: 100%;
    height: 100%;
    background: grey;
    opacity: 0.75;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  if (location.pathname !== HOME_SCREEN) return null;

  return (
    <BackgroundWrapper>
      <BreifContainer>
        <div className="col-10 text-center">
          <p className="h1 text-white">Django Tenant React</p>
          <br />
          <p className="h3 text-white">
            is a simple todo app based on multi-tenant database schema
          </p>
        </div>
      </BreifContainer>
    </BackgroundWrapper>
  );
};
