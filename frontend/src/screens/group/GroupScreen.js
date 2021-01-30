import React from "react";
import { connect } from "react-redux";

const GroupScreen = () => {
  return <h1>this is group screen</h1>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupScreen);
