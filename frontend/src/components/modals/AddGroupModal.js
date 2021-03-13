import React, { useEffect, useState } from "react";
import { debounce, doNothing } from "../../utils/utils";
import { IconButton } from "../buttons";
import { GroupField } from "../inputs";

export const AddGroupModal = ({
  show = false,
  submit = doNothing,
  dismiss = doNothing,
  setName = doNothing,
}) => {
  const [loading, setLoading] = useState(show);
  const onLoading = debounce((newAlert) => {
    setLoading(newAlert);
  });

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
        background: "transparent",
        width: "100%",
        height: "100%",
        zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "#f5f5f5", borderRadius: 16, padding: 8 }}>
        <GroupField onValue={(name) => setName(name)} />

        <div className="d-flex align-items-center justify-content-between">
          <IconButton icon={"plus"} title={"add group name"} onClick={submit} />
          <IconButton icon={"x"} title={"close"} onClick={dismiss} />
        </div>
      </div>
    </div>
  );
};
