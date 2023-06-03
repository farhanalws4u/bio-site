import React, { useEffect, useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Card from "./components/Card";
import List from "./components/List";
import "./styles.css";
import InvalidCred from "./components/InvalidCred";
import camera from "./assets/images/camera.svg";
import telegramSm from "./assets/images/telegramSm.svg";
import instagramSm from "./assets/images/instagramSm.svg";
import pinterestSm from "./assets/images/pinterestSm.svg";
import facebookSm from "./assets/images/facebookSm.svg";
import whatsappSm from "./assets/images/whatsappSm.svg";
import linkedInSm from "./assets/images/linkedInSm.svg";
import spotifySm from "./assets/images/spotifySm.svg";

const HomePage = () => {
  let match = useRouteMatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isUserFound, setIsUserFound] = useState(true);
  const alias = useRef(match.params.alias);
  const [userDataObj, setUserDataObj] = useState({
    profileSection: {
      profilePhoto: "",
      coverPhoto: "",
      name: "",
      bio: "",
    },
    cards: { image: "", title: "", description: "", url: "", id: "" },
    lists: [],
    socialLinks: [],
    socialLinksArray: [],
  });

  const getUserData = async () => {
    var userData = null;
    console.log("alias value in getUserData", alias.current);
    try {
      const response = await axios.get(
        `https://api.gofeed.app/dev/biosite/payload?alias=${alias.current}`
      );
      userData = JSON.parse(response.data);
      console.log("userData", userData);
    } catch (e) {
      console.log("error while fetching user data....", e);
      setIsUserFound(false);
    }
    if (userData !== null) {
      setUserDataObj(userData);
    }
    setIsDataLoaded(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!isDataLoaded) {
    return (
      <ReactLoading
        type={"cylon"}
        color={"#0671E3"}
        height={60}
        width={60}
        className="spinner"
      />
    );
  } else
    return (
      <>
        {isUserFound ? (
          <main className="container">
            {/* first Section */}
            <section className="firstSectionInView">
              {userDataObj?.profileSection?.coverPhoto ? (
                <div className="coverPhotoContainer">
                  <img
                    className="coverPhoto"
                    src={userDataObj?.profileSection?.coverPhoto || camera}
                    alt="coverPhoto"
                  />
                </div>
              ) : null}

              <div
                className={
                  !userDataObj?.profileSection?.profilePhoto &&
                  !userDataObj?.profileSection?.coverPhoto
                    ? "dpAndNameContainerWithoutDpCover"
                    : userDataObj?.profileSection?.profilePhoto &&
                      !userDataObj?.profileSection?.coverPhoto
                    ? "dpNameWithoutCover"
                    : "DpAndNameContainer  d-flex-row"
                }
              >
                {userDataObj?.profileSection?.profilePhoto ? (
                  <div
                    className={
                      userDataObj?.profileSection?.profilePhoto &&
                      !userDataObj?.profileSection?.coverPhoto
                        ? "dpContainerWithoutCover "
                        : "dpContainer "
                    }
                  >
                    <img
                      className={
                        userDataObj?.profileSection?.profilePhoto
                          ? "profilePhotoScaled "
                          : "profilePhoto"
                      }
                      src={userDataObj?.profileSection?.profilePhoto}
                      alt="profilePhoto "
                    />
                  </div>
                ) : null}

                {!userDataObj?.profileSection?.profilePhoto &&
                !userDataObj?.profileSection?.coverPhoto ? (
                  <div>
                    <h1>{userDataObj?.profileSection?.name}</h1>
                    <br />
                    <h5>{userDataObj?.profileSection?.bio}</h5>
                  </div>
                ) : (
                  <div
                    className={
                      userDataObj?.profileSection?.profilePhoto &&
                      !userDataObj?.profileSection?.coverPhoto
                        ? "usernameContainerWithoutCover"
                        : "usernameContainer  "
                    }
                  >
                    <div className="nameDivInEdit">
                      <h1>{userDataObj?.profileSection?.name}</h1>
                    </div>
                    <br />
                    <div
                      className={
                        userDataObj?.profileSection?.profilePhoto &&
                        !userDataObj?.profileSection?.coverPhoto
                          ? "bioDivWithoutCover descriptionDivInEdit"
                          : "descriptionDivInEdit"
                      }
                    >
                      <h5>{userDataObj?.profileSection?.bio}</h5>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* social media section would be modified later  */}

            <section className="socialMediaIconSection ">
              <div className="socialMediaLinksContainer d-flex-row">
                {userDataObj?.socialLinks?.map((link) => {
                  return (
                    <a
                      href={
                        link.icon === whatsappSm
                          ? `https://wa.me/${link.username}`
                          : link.icon === telegramSm
                          ? `https://t.me/${link.username}`
                          : link.icon === facebookSm
                          ? `https://facebook.com/${link.username}`
                          : link.icon === pinterestSm
                          ? `https://in.pinterest.com/${link.username}`
                          : link.icon === spotifySm
                          ? `https://open.spotify.com/user/${link.username}`
                          : link.icon === linkedInSm
                          ? `https://www.linkedin.com/in/${link.username}`
                          : link.icon === instagramSm
                          ? `https://instagram.com/${link.username}`
                          : "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="socialIconInView"
                        src={link.icon}
                        alt=""
                      />
                    </a>
                  );
                })}
              </div>
            </section>

            {/* third section   */}

            <section style={{ marginTop: 11 }} className="thirdSection">
              {userDataObj.cards !== null ? (
                <Card
                  key={userDataObj.cards.id}
                  id={userDataObj.cards.id}
                  image={userDataObj.cards.image}
                  title={userDataObj.cards.title}
                  description={userDataObj.cards.description}
                  url={userDataObj.cards.url}
                />
              ) : null}
            </section>

            {/* last section  */}
            <section className="lastSection">
              {userDataObj.lists !== null
                ? userDataObj.lists.map((list) => {
                    return (
                      <List
                        key={list.id}
                        url={list.url}
                        id={list.id}
                        image={list.image}
                        title={list.title}
                      />
                    );
                  })
                : null}
            </section>
          </main>
        ) : (
          <InvalidCred />
        )}
      </>
    );
};

export default HomePage;
