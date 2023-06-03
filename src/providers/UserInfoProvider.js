import React, { useState, useEffect } from "react";

const UserInfoContext = React.createContext([{}, () => {}]);

const UserInfoProvider = (props) => {
  const [state, setState] = useState({
    alias: "",
    userId: "",
    accessToken: "",
  });

  return (
    <UserInfoContext.Provider value={[state, setState]}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };
