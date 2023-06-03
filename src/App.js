import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import { UserInfoProvider } from "./providers/UserInfoProvider";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import InvalidCred from "./components/InvalidCred";

const HomePage = loadable(() => import("./HomePage"));
const EditPage = loadable(() => import("./EditPage"));
const ViewPage = loadable(() => import("./ViewPage"));

function App() {
  const [userId, setUserId] = useState("");
  const [alias, setAlias] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const getUserInfoFromURL = () => {
    var urlString = window.location.href;
    var url = new URL(urlString);
    console.log("url from app component.....", url);
    var user_id = url.searchParams.get("userId");
    var access_token = url.searchParams.get("accessToken");
    var _alias = url.searchParams.get("alias");

    setUserId(user_id);
    setAccessToken(access_token);
    setAlias(_alias);

    if (userId !== "" && accessToken !== "" && alias !== "") {
      console.log(
        "got user info from URL successfully....",
        userId,
        accessToken,
        alias
      );
    }
    console.log(alias);
  };

  useEffect(() => {
    console.log(navigator.onLine);
    getUserInfoFromURL();
  }, []);

  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            userInfo={{
              userId: userId,
              accessToken: accessToken,
              alias: alias,
            }}
            exact
            path="/"
            component={HomePage}
          />
          <PrivateRoute
            userInfo={{
              userId: userId,
              accessToken: accessToken,
              alias: alias,
            }}
            exact
            path="/editPage"
            component={EditPage}
          />

          <Route exact path="/:alias" component={ViewPage} />
          <Route exact path="/notFound" component={InvalidCred} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
