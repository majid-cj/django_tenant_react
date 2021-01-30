import React from "react";
import { connect } from "react-redux";

const TodoScreen = () => {
  return <h1>this is todo screen</h1>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);
