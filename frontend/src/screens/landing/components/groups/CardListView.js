import React from "react";

export const CardListView = ({ groups = [] }) => {
  return (
    <div className="d-flex">
      {groups.map((group) => (
        <div>{group.name}</div>
      ))}
    </div>
  );
};
