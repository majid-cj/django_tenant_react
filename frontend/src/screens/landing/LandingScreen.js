import React from "react";
import { connect } from "react-redux";

const LandingScreen = () => {
  return <h1>this is landing screen</h1>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
