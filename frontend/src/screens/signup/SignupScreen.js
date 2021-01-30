import React from "react";
import { connect } from "react-redux";

const SignupScreen = () => {
  return <h1>this is signup screen</h1>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
