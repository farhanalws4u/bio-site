import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import ReactLoading from "react-loading";
import Card from "./components/Card";
import List from "./components/List";
import "./styles.css";
import camera from "./assets/images/camera.svg";
import cameraXs from "./assets/images/cameraXs.svg";
import profile from "./assets/images/user.svg";
import link from "./assets/images/link.svg";
import eye from "./assets/images/eye.svg";
import penBlack from "./assets/images/penBlack.svg";
import telegramSm from "./assets/images/telegramSm.svg";
import instagramSm from "./assets/images/instagramSm.svg";
import pinterestSm from "./assets/images/pinterestSm.svg";
import facebookSm from "./assets/images/facebookSm.svg";
import whatsappSm from "./assets/images/whatsappSm.svg";
import linkedInSm from "./assets/images/linkedInSm.svg";
import spotifySm from "./assets/images/spotifySm.svg";
import { useHistory } from "react-router-dom";
import ErrorBubble from "./components/ErrorBubble";
import InvalidCred from "./components/InvalidCred";

const HomePage = ({ userInfo }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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
  const history = useHistory();
  const [isNewUser, setIsNewUser] = useState(true);
  const [isNoUserInfo, setIsNoUserInfo] = useState(false);
  const editErrorRef = useRef();
  const [editError, setEditError] = useState(false);

  const getUserData = async () => {
    var userData = null;
    console.log("alias value in getUserData", userInfo.alias);
    try {
      const response = await axios.get(
        `https://api.gofeed.app/dev/biosite/payload?alias=${userInfo.alias}`
      );
      userData = JSON.parse(response.data);
      console.log("userData", userData);
    } catch (e) {
      console.log("error while fetching user data....", e);
    }
    if (userData !== null) {
      setUserDataObj(userData);
      setIsNewUser(false);
    }
    setIsDataLoaded(true);
  };
  console.log(userDataObj);
  useEffect(() => {
    console.log("calling userInfoURL");
    if (
      userInfo.userId === "" ||
      userInfo.accessToken === "" ||
      userInfo.alias === ""
    ) {
      setIsNoUserInfo(true);
    }
    console.log("calling getUserData");
    getUserData();
  }, []);

  const moveToEditPage = () => {
    history.push({
      pathname: "/editPage",
      state: {
        ...userInfo,
      },
    });
  };

  const handleSetEditError = () => {
    setEditError(true);
  };

  if (!isDataLoaded) {
    return (
      <ReactLoading
        type={"cylon"}
        color={"#0671E3"}
        height={50}
        width={60}
        className="spinner"
      />
    );
  } else if (isNoUserInfo) {
    return <InvalidCred />;
  } else if (isNewUser) {
    return (
      <main className="container">
        <div className="finalSubmitBtnContainer boxShadow">
          <button onClick={moveToEditPage} className="cancelBtn">
            <div style={{ display: "flex" }}>
              <img
                style={{
                  width: 15,
                  height: 15,
                  minWidth: 15,
                  minHeight: 15,
                  marginTop: 3,
                }}
                src={penBlack}
                alt="editIcon"
              />
              <h3 style={{ color: "#000000", marginLeft: 5 }}>EDIT</h3>
            </div>
          </button>
          <div ref={editErrorRef}>
            {editError && (
              <ErrorBubble top={5} left={15} text="Click here to Edit!" />
            )}
          </div>
          <div className="eyeAndLinkDiv  ">
            <div className="eyeIconContainer">
              <img src={eye} alt="eyeIcon" />
            </div>
            <CopyToClipboard
              onCopy={() => alert("Your link is copied !")}
              text={`https://gofeed.link/${userInfo.alias}`}
            >
              <button className="linkBtn">
                <div style={{ display: "flex" }}>
                  <img
                    style={{
                      width: 15,
                      height: 15,
                      minWidth: 15,
                      minHeight: 15,
                      marginTop: 3,
                      marginRight: 3,
                    }}
                    src={link}
                    alt="linkIcon"
                  />
                  <h3 style={{ color: "#000000", marginLeft: 5 }}>Copy</h3>
                </div>
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div onClick={handleSetEditError}>
          {/* first section */}
          <section className="firstSectionInView">
            <div className="coverPhotoContainer">
              <img className="coverPhoto" src={camera} alt="coverPhoto" />
            </div>

            <div className="DpAndNameContainer  d-flex-row">
              <div className="dpContainer ">
                <img
                  className="profilePhoto"
                  src={profile}
                  alt="profilePhoto "
                />
              </div>
              <div className="usernameContainer  ">
                <div className="nameDivInEdit">
                  <h1>Your Name </h1>
                </div>
                <br />
                <div className="descriptionDivInEdit">
                  <h5>short description</h5>
                </div>
              </div>
            </div>
          </section>

          {/* social icons section  */}

          <section className="socialMediaIconSection ">
            <div className="socialMediaLinksContainer d-flex-row">
              <>
                <div className="socialIconContainer"></div>
                <div className="socialIconContainer"></div>
                <div className="socialIconContainer"></div>
                <div className="socialIconContainer"></div>
              </>
            </div>
            <p className="SmSectionHeading">Social Media Links</p>
          </section>

          {/* third section  */}
          <section className="thirdSection">
            <div className=" thirdSectionMainContainer ">
              <div className="thirdSectionImageContainer">
                <img className="thirdSectionImage" src={camera} alt="" />
              </div>

              <div className="thirdSectionContentContainer d-flex-row">
                <div className="thirdSectionHeadingContainer">
                  <h1 id="cardTitleInEdit" className="thirdSectionTitle ">
                    Card Title
                  </h1>
                  <h5
                    id="cardDescriptionInEdit"
                    className="thirdSectionDescription"
                  >
                    Card description
                  </h5>
                </div>
              </div>
            </div>
          </section>

          {/* last section  */}

          <section className="lastSection">
            <div className="lastSectionMainContainer d-flex-row">
              <img className="lastSectionImage" src={cameraXs} alt="" />

              <div className="lastSectionContentContainer lasSectionContentContainerInView d-flex-row ">
                <h3 className="listTitleInView">Link Title</h3>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  } else
    return (
      <main className="container">
        <div className="finalSubmitBtnContainer boxShadow">
          <button onClick={moveToEditPage} className="cancelBtn">
            <div style={{ display: "flex" }}>
              <img
                style={{
                  width: 15,
                  height: 15,
                  minWidth: 15,
                  minHeight: 15,
                  marginTop: 3,
                }}
                src={penBlack}
                alt="editIcon"
              />
              <h3 style={{ color: "#000000", marginLeft: 5 }}>EDIT</h3>
            </div>
          </button>
          <div className="eyeAndLinkDiv  ">
            <a href={`https://gofeed.link/${userInfo.alias}`} target="_blank">
              <div className="eyeIconContainer">
                <img src={eye} alt="eyeIcon" />
              </div>
            </a>
            <CopyToClipboard
              onCopy={() => alert("Your link is copied !")}
              text={`https://gofeed.link/${userInfo.alias}`}
            >
              <button className="linkBtn">
                <div style={{ display: "flex" }}>
                  <img
                    style={{
                      width: 15,
                      height: 15,
                      minWidth: 15,
                      minHeight: 15,
                      marginTop: 3,
                      marginRight: 3,
                    }}
                    src={link}
                    alt="linkIcon"
                  />
                  <h3 style={{ color: "#000000", marginLeft: 5 }}>Copy</h3>
                </div>
              </button>
            </CopyToClipboard>
          </div>
        </div>

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
                  <img className="socialIconInView" src={link.icon} alt="" />
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
    );
};

export default HomePage;
