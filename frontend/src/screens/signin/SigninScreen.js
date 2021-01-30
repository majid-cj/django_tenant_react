import React from "react";
import { connect } from "react-redux";

const SigninScreen = () => {
  return <h1>this is signin screen</h1>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
