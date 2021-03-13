import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoGroups } from "../../../../actions";
import { IconButton } from "../../../../components/buttons";
import { SearchField } from "../../../../components/inputs";
import { AddGroupModal } from "../../../../components/modals";
import { Alert, LandingLoader } from "../../../../components/ui";
import { TODO_GROUP_URL } from "../../../../constants";
import { getGroupsList } from "../../../../hooks";
import { CardListView } from "./CardListView";

export const GroupsLists = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState(TODO_GROUP_URL);
  const [
    {
      data: { results, next, previous, count },
      loading,
      error,
    },
    getData,
  ] = getGroupsList(TODO_GROUP_URL);

  const dismiss = () => setShow(false);

  const submit = () => dispatch(createTodoGroups({ name: name }));

  return (
    <>
      <div className="d-flex align-items-center">
        <IconButton onClick={() => setShow(true)} icon={"folder-plus"} />
        <SearchField
          onValue={(value) => setUrl(`${TODO_GROUP_URL}?search=${value}`)}
        />
        <IconButton onClick={() => getData(url)} icon={"search"} />
      </div>
      <CardListView groups={results} />
      <Alert show={!loading} message={error} fontSize={18} />
      <LandingLoader show={loading} />
      <AddGroupModal
        show={show}
        dismiss={dismiss}
        submit={submit}
        setName={setName}
      />
    </>
  );
};
