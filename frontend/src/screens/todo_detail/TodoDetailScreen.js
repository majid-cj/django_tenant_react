import React from 'react'
import { connect } from "react-redux";

const TodoDetailScreen = () => {
  return <h1>this is todo details screen</h1>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailScreen);
