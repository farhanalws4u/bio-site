import React, { useState, useRef, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import "./styles.css";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import { uuid } from "uuidv4";
import penBlack from "./assets/images/penBlack.svg";
import profile from "./assets/images/user.svg";
import camera from "./assets/images/camera.svg";
import cameraXs from "./assets/images/cameraXs.svg";
import plus from "./assets/images/plus.svg";
import remove from "./assets/images/remove.png";
import cameraIconLg from "./assets/images/cameraIconLg.svg";
import cameraIconSm from "./assets/images/cameraIconSm.svg";
import formatText from "./formatText";
import formatOnPaste from "./formatOnPaste";
import telegramSm from "./assets/images/telegramSm.svg";
import instagramSm from "./assets/images/instagramSm.svg";
import pinterestSm from "./assets/images/pinterestSm.svg";
import facebookSm from "./assets/images/facebookSm.svg";
import whatsappSm from "./assets/images/whatsappSm.svg";
import linkedInSm from "./assets/images/linkedInSm.svg";
import spotifySm from "./assets/images/spotifySm.svg";
import ErrorBubble from "./components/ErrorBubble";
import ProgressComp from "./components/ProgressComp";
import linkWhite from "./assets/images/linkWhite.svg";
import { UserInfoContext } from "./providers/UserInfoProvider";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPublishingData, setIsPublishingData] = useState(false);
  const [state, setState] = useContext(UserInfoContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMediaName, setUploadMediaName] = useState("profilePhoto");

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
    setState((prev) => ({
      alias: location.state.alias,
      userId: location.state.userId,
      accessToken: location.state.accessToken,
    }));
    var userData = {};
    try {
      const response = await axios.get(
        `https://api.gofeed.app/dev/biosite/payload?alias=${location.state.alias}`
      );
      userData = JSON.parse(response.data);
      console.log("userData", userData);
    } catch (e) {
      console.log("error while fetching user data....", e);
    }
    if (userData !== {}) {
      setUserDataObj(userData);
      setIsDataLoaded(true);
    }
  };

  // fetching user's data.....
  useEffect(() => {
    console.log(
      "userInfo from route history....",
      location.state.userId,
      location.state.accessToken,
      location.state.alias
    );
    getUserData();
  }, []);

  // Booleans
  const [isEditing, setIsEditing] = useState(true);

  // for First Section....
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const name = useRef("");
  const bio = useRef("");

  // for Cards ......
  const [holderCardImage, setHolderCardImage] = useState("");
  const holderCardTitle = useRef("");
  const holderCardDescription = useRef("");
  const holderCardURL = useRef("");

  // for Lists ......
  const [holderListImage, setHolderListImage] = useState("");
  const holderListTitle = useRef("");
  const holderListUrl = useRef("");

  // objects to save data.......
  const [lists, setLists] = useState([]);

  const [userData, setUserData] = useState({
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

  // for modal....
  const [isModalOpened, setIsmodalOpened] = useState(false);
  const [isUserLinkModalOpen, setIsUserLinkModalOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialLinksArray, setSocialLinksArray] = useState([]);
  const telegramUsername = useRef("");
  const fbUsername = useRef("");
  const instaUsername = useRef("");
  const pinterestUsername = useRef("");
  const whatsappUsername = useRef("");
  const linkedInUsername = useRef("");
  const spotifyUsername = useRef("");
  const [isTelegramAdded, setIsTelegramAdded] = useState(false);
  const [isInstaAdded, setIsInstaAdded] = useState(false);
  const [isPinterestAdded, setIsPinterestAdded] = useState(false);
  const [isFacebookAdded, setIsFacebookAdded] = useState(false);
  const [isWhatsappAdded, setIsWhatsappAdded] = useState(false);
  const [isLinkedInAdded, setIsLinkedInAdded] = useState(false);
  const [isSpotifyAdded, setIsSpotifyAdded] = useState(false);

  // for error messages....
  const [nameError, setNameError] = useState(false);
  const nameErrorRef = useRef();
  const [cardUrlError, setCardUrlError] = useState(false);
  const cardUrlErrorRef = useRef();
  const [cardImageError, setCardImageError] = useState(false);
  const cardImageErrorRef = useRef();
  const [hlTitleError, setHlTitleError] = useState(false);
  const hlTitleErrorRef = useRef();
  const [hlUrlError, setHlUrlError] = useState(false);
  const hlUrlErrorRef = useRef();

  // to set edit states as the data which is in userDataObj....
  useEffect(() => {
    if (userDataObj.profileSection !== undefined) {
      setProfilePhoto(userDataObj?.profileSection?.profilePhoto);
      setCoverPhoto(userDataObj?.profileSection?.coverPhoto);
      name.current = userDataObj?.profileSection?.name;
      bio.current = userDataObj?.profileSection?.bio;
      holderCardTitle.current = userDataObj?.cards?.title;
      holderCardDescription.current = userDataObj?.cards?.description;
      holderCardURL.current = userDataObj?.cards?.url;
      setHolderCardImage(userDataObj?.cards?.image);
      setLists(userDataObj?.lists);
      setSocialLinks(userDataObj?.socialLinks);
      setSocialLinksArray(userDataObj?.socialLinksArray);

      userDataObj.socialLinks.forEach((link) => {
        switch (link.name) {
          case "telegram":
            telegramUsername.current = link.username;
            break;
          case "instagram":
            instaUsername.current = link.username;
            break;
          case "pinterest":
            pinterestUsername.current = link.username;
            break;
          case "facebook":
            fbUsername.current = link.username;
            break;
          case "whatsapp":
            whatsappUsername.current = link.username;
            break;
          case "linkedIn":
            linkedInUsername.current = link.username;
            break;
          case "spotify":
            spotifyUsername.current = link.username;
            break;

          default:
            break;
        }
      });
    }
  }, [userDataObj]);

  // handlers
  const handleListAdd = () => {
    if (holderListTitle.current === "") {
      alert("Please fill the empty List first!");
    }
    if (holderListTitle.current !== "") {
      const listData = {
        image: holderListImage,
        title: holderListTitle.current,
        url: urlCheck(holderListUrl.current),
        id: uuid(),
      };
      setLists((prev) => [...prev, listData]);
      setHolderListImage("");
      holderListTitle.current = "";
      holderListUrl.current = "";
    }
  };

  //

  // handler for set state of images....
  function handleImageUpload(e, setImage, imageName) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = function (e) {
        setImage(e.target.result);
      };
    }
  }

  // handler for deleting specific component
  const handlerDeleteComponent = (id, compName) => {
    if (compName === "list") {
      const filteredLists = lists.filter((list) => list.id !== id);
      setLists([...filteredLists]);
    }
  };

  // function for getting upload url and upload images to that....

  const uploadMedia = async (name, data) => {
    console.log("reached here......");
    const [, type] = data?.split(";")[0]?.split("/");
    let imageName = [name, "_", uuid(), ".", type].join("");
    let response;
    setUploadMediaName(name);

    const base64Data = new Buffer.from(
      data.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // for getting upload URL....
    try {
      response = await axios.get(
        `https://api.gofeed.app/dev/biosite/getUploadURL?filename=${imageName}`,
        {
          headers: {
            user_id: state.userId,
            access_token: state.accessToken,
          },
        }
      );
    } catch (e) {
      console.log(e);
      return false;
    }
    // for uploading image to s3 api.....
    try {
      const uploadRes = await axios.put(response.data, base64Data, {
        headers: {
          "Content-Type": "",
        },
        onUploadProgress: function (event) {
          setUploadProgress(Math.round((event.loaded * 100) / event.total));
        },
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    const imageLink = `https://GoFeed.link/${location.state.alias}/media/${imageName}`;
    setUploadProgress(0);
    return imageLink;
  };

  //
  // for links images....
  const uplaodMultipleMedia = async (lists) => {
    for (var i = 0; i < lists.length; i++) {
      if (
        lists[i].image !== null &&
        lists[i].image !== undefined &&
        lists[i].image !== "" &&
        !lists[i].image.includes("https://GoFeed.link")
      ) {
        const imageLink = await uploadMedia("linkImage", lists[i].image);
        if (!imageLink) {
          return false;
        } else lists[i].image = imageLink;
      }
    }
    return lists;
  };

  const urlCheck = (string) => {
    let url = string;

    if (!string.includes("https") || !string.includes("http")) {
      url = "https://" + string;
    }

    return url;
  };

  // Final submit handler of the whole editPage .....
  const handlerFinalSubmit = async () => {
    var cardsData = null;
    var listsData = null;
    var finalCard = null;
    var finalList = null;

    // for cards....
    if (holderCardImage) {
      let cardUrl = urlCheck(holderCardURL.current);
      finalCard = {
        image: holderCardImage,
        title: holderCardTitle.current,
        description: holderCardDescription.current,
        url: cardUrl,
        id: uuid(),
      };
      cardsData = finalCard;
    }

    if (holderListTitle.current !== "") {
      let listUrl = urlCheck(holderListUrl.current);
      finalList = {
        image: holderListImage,
        title: holderListTitle.current,
        url: listUrl,
        id: uuid(),
      };
      listsData = [...lists, finalList];
    } else {
      listsData = [...lists];
    }

    const userData = {
      profileSection: {
        profilePhoto,
        coverPhoto,
        name: name.current,
        bio: bio.current,
      },
      cards: cardsData,
      lists: listsData,
      socialLinks,
      socialLinksArray,
    };
    setUserData(userData);
  };

  // error message's timeouts
  useEffect(() => {
    if (nameError) {
      setTimeout(() => {
        setNameError(false);
      }, 3000);
    }
    if (cardUrlError) {
      setTimeout(() => {
        setCardUrlError(false);
      }, 3000);
    }
    if (holderCardImage !== "") {
      setCardImageError(false);
    }
    if (hlTitleError) {
      setTimeout(() => {
        setHlTitleError(false);
      }, 3000);
    }
    if (hlUrlError) {
      setTimeout(() => {
        setHlUrlError(false);
      }, 3000);
    }
  }, [
    nameError,
    cardUrlError,
    holderCardURL,
    holderCardImage,
    hlTitleError,
    hlUrlError,
  ]);

  const handlerDoneEditing = async () => {
    console.log("editing done.....");
    if (name.current === "") {
      nameErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setNameError(true);
      return;
    }

    if (holderCardImage) {
      if (holderCardURL.current === "") {
        cardUrlErrorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        setCardUrlError(true);
        return;
      }
    }

    if (
      holderCardTitle.current !== "" &&
      holderCardTitle.current !== undefined &&
      !holderCardImage
    ) {
      cardImageErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setCardImageError(true);
      return;
    }

    if (lists.length !== 0) {
      if (holderListUrl.current !== "") {
        if (holderListTitle.current === "") {
          hlTitleErrorRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          setHlTitleError(true);

          return;
        }
      }
      if (holderListTitle.current !== "") {
        if (holderListUrl.current === "") {
          hlUrlErrorRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          setHlUrlError(true);
          return;
        }
      }
    }
    handlerFinalSubmit();
    setIsUserLinkModalOpen(true);
    setIsEditing(false);
  };

  const handlerBackToEdit = () => {
    setIsEditing(true);
  };

  const handlerCancelEditing = () => {
    history.goBack();
  };

  const handlerPublishEdits = async () => {
    setIsUserLinkModalOpen(false);
    setIsPublishingData(true);
    var cardImageLink = "";
    var coverPhotoLink = "";
    var profilePhotoLink = "";

    if (
      coverPhoto !== null &&
      coverPhoto !== undefined &&
      coverPhoto !== "" &&
      !coverPhoto.includes("https://GoFeed.link")
    ) {
      console.log("cover upload executed....");
      coverPhotoLink = await uploadMedia("coverPhoto", coverPhoto);
      if (!coverPhotoLink) {
        alert("Error while uploading cover photo! Please try again.");
        setIsPublishingData(false);
        return;
      }
    }
    console.log("coverUpload complete....");
    if (
      profilePhoto !== null &&
      profilePhoto !== undefined &&
      profilePhoto !== "" &&
      !profilePhoto.includes("https://GoFeed.link")
    ) {
      console.log("profile upload executed....");
      profilePhotoLink = await uploadMedia("profilePhoto", profilePhoto);
      if (!profilePhotoLink) {
        alert("Error while uploading profile photo! Please try again.");
        setIsPublishingData(false);
        return;
      }
    }
    console.log("profilePhoto uplaod complete.....");
    if (
      holderCardImage !== null &&
      holderCardImage !== undefined &&
      holderCardImage !== "" &&
      !holderCardImage?.includes("https://GoFeed.link")
    ) {
      console.log("reached to card upload...");
      cardImageLink = await uploadMedia("cardImage", holderCardImage);
      console.log(cardImageLink);
      if (!cardImageLink) {
        alert("Error while uploading card image! Please try again.");
        setIsPublishingData(false);
        return;
      }
      userData.cards.image = cardImageLink;
    }
    console.log("card image upload complete.....");

    const updatedLists = await uplaodMultipleMedia(userData.lists);
    console.log("updatedlist", updatedLists);
    if (!updatedLists) {
      alert("Error while uploading link's images! Please try again.");
      setIsPublishingData(false);
      return;
    }
    console.log("links photots upload is complete....");
    userData.lists = [...updatedLists];

    const publishData = {
      profileSection: {
        profilePhoto: profilePhotoLink ? profilePhotoLink : profilePhoto,
        coverPhoto: coverPhotoLink ? coverPhotoLink : coverPhoto,
        name: name.current,
        bio: bio.current,
      },
      cards: userData.cards,
      lists: userData.lists,
      socialLinks,
      socialLinksArray,
    };
    console.log(
      "handler publish edits called with creds =>",
      state.userId,
      state.alias,
      state.accessToken
    );
    // saving user's data to database.....
    try {
      const response = await axios.post(
        `https://api.gofeed.app/dev/biosite/publish?alias=${location.state.alias}`,
        publishData,
        {
          headers: {
            user_id: location.state.userId,
            access_token: location.state.accessToken,
          },
        }
      );
      console.log("data published successfully.....");
    } catch (e) {
      console.log(e);
    }
    setIsPublishingData(false);
    history.goBack();
  };

  const handleCardReset = () => {
    const isConfirmed = window.confirm(
      "Do you really want to reset the card ?"
    );
    if (isConfirmed) {
      setHolderCardImage("");
      holderCardTitle.current = "";
      holderCardDescription.current = "";
      holderCardURL.current = "";
    } else return;
  };

  const handleCoverReset = () => {
    const isConfirmed = window.confirm(
      "Do you really want to remove the cover photo ?"
    );
    if (isConfirmed) {
      setCoverPhoto("");
    } else return;
  };

  ///
  const bioChange = (e) => {
    const formattedText = formatText(e.target.value);
    bio.current = formattedText;
  };

  // for modal....
  const handleModalOpen = () => {
    setIsmodalOpened(true);
  };

  const handleModalClose = () => {
    setIsmodalOpened(false);
  };
  console.log(socialLinks);

  const handleSocialIconSubmit = async () => {
    var facebookLink;
    var telegramLink;
    var instaLink;
    var pinterestLink;
    var whatsAppLink;
    var linkedInLink;
    var spotifyLink;
    var socialLinksArray = [];

    if (fbUsername.current !== "") {
      facebookLink = {
        icon: facebookSm,
        username: fbUsername.current,
        name: "facebook",
      };
      socialLinksArray = [facebookLink];
    }
    ////
    if (telegramUsername.current !== "") {
      telegramLink = {
        icon: telegramSm,
        username: telegramUsername.current,
        name: "telegram",
      };
      socialLinksArray = [...socialLinksArray, telegramLink];
    }
    ////
    if (instaUsername.current !== "") {
      instaLink = {
        icon: instagramSm,
        username: instaUsername.current,
        name: "instagram",
      };
      socialLinksArray = [...socialLinksArray, instaLink];
    }
    /////
    if (pinterestUsername.current !== "") {
      pinterestLink = {
        icon: pinterestSm,
        username: pinterestUsername.current,
        name: "pinterest",
      };
      socialLinksArray = [...socialLinksArray, pinterestLink];
    }
    /////
    if (whatsappUsername.current !== "") {
      whatsAppLink = {
        icon: whatsappSm,
        username: whatsappUsername.current,
        name: "whatsapp",
      };
      socialLinksArray = [...socialLinksArray, whatsAppLink];
    }
    //////
    if (linkedInUsername.current !== "") {
      linkedInLink = {
        icon: linkedInSm,
        username: linkedInUsername.current,
        name: "linkedIn",
      };
      socialLinksArray = [...socialLinksArray, linkedInLink];
    }
    /////
    if (spotifyUsername.current !== "") {
      spotifyLink = {
        icon: spotifySm,
        username: spotifyUsername.current,
        name: "spotify",
      };
      socialLinksArray = [...socialLinksArray, spotifyLink];
    }
    setSocialLinks([...socialLinksArray]);

    setIsmodalOpened(false);
  };

  const socialIconClickHandler = (EditList) => {
    if (socialLinksArray.length <= 4) {
      const isPresent = socialLinksArray.find((list) => list.name === EditList);

      if (!isPresent) {
        const newList = {
          name: EditList,
          id: uuid(),
        };

        setSocialLinksArray((prev) => [...prev, newList]);
      }
    } else {
      alert("You can add only 5 Links");
    }
  };

  const handlerSocialListRemove = (name) => {
    const fArray = socialLinksArray.filter((list) => {
      return list.name !== name;
    });
    setSocialLinksArray([...fArray]);
  };

  const handlerUserLinkModalOpen = () => {
    setIsUserLinkModalOpen(true);
  };

  const checkEdiList = (name) => {
    var EditList;
    switch (name) {
      case "TelegramEditList":
        EditList = <TelegramEditList />;
        setIsTelegramAdded(true);
        break;
      case "InstaEditList":
        EditList = <InstaEditList />;
        setIsInstaAdded(true);
        break;
      case "PinterestEditList":
        EditList = <PinterestEditList />;
        setIsPinterestAdded(true);
        break;
      case "FacebookEditList":
        EditList = <FacebookEditList />;
        setIsFacebookAdded(true);
        break;
      case "WhatsappEditList":
        EditList = <WhatsappEditList />;
        setIsWhatsappAdded(true);
        break;
      case "LinkedInEditList":
        EditList = <LinkedInEditList />;
        setIsLinkedInAdded(true);
        break;
      case "SpotifyEditList":
        EditList = <SpotifyEditList />;
        setIsSpotifyAdded(true);
        break;

      default:
        break;
    }
    return EditList;
  };

  // Components....

  const UserLinkModal = () => {
    return (
      <section
        className={
          isUserLinkModalOpen
            ? "userLinkModalContainer displayBlock"
            : "userLinkModalContainer"
        }
      >
        <div className="userLinkMainContainer">
          <p className="publishP">Publish your biosite</p>
          <p className="belowP">Below is the URL for your biosite</p>
          <div className="userLinkModalLinkDiv">
            <p>
              gofeed.link/&nbsp;&nbsp;<span>{state.alias}</span>
            </p>
            <CopyToClipboard
              onCopy={() => alert("Your link is copied !")}
              text={`https://gofeed.link/${location.state.alias}`}
            >
              <button className="userLinkModalLinkBtn">
                <div style={{ display: "flex" }}>
                  <img
                    style={{
                      marginRight: 3,
                    }}
                    src={linkWhite}
                    alt="linkIcon"
                  />
                  <p style={{ color: "#ffffff", marginLeft: 5 }}>Copy</p>
                </div>
              </button>
            </CopyToClipboard>
          </div>
          <button
            onClick={handlerPublishEdits}
            className="UserLinkModalpublishBtn"
          >
            PUBLISH
          </button>
        </div>
      </section>
    );
  };

  const SocialModal = () => {
    return (
      <div
        className={
          isModalOpened ? "modalContainer displayBlock" : "modalContainer"
        }
      >
        <div className="iconEditSection">
          {socialLinksArray.map((list) => {
            const EditList = checkEdiList(list.name);
            return (
              <li style={{ listStyle: "none" }} key={list.id}>
                {EditList}
              </li>
            );
          })}
        </div>
        <div className="bottomContainer">
          <div className="iconCounter">
            <p className="first">
              SOCIAL LINKS &nbsp;&nbsp; {socialLinksArray.length}/5
            </p>
            <p className="second">Click on icons below to add to your site</p>
          </div>
          <div className="divider"></div>

          <div className="addIconSection">
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsTelegramAdded(true);
                socialIconClickHandler("TelegramEditList");
              }}
              className="iconSmContainer "
            >
              {!isTelegramAdded && <img src={telegramSm} alt="instagram" />}

              {isTelegramAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M10.9865 17.7111L10.5233 24.2257C11.186 24.2257 11.473 23.9411 11.8171 23.5992L14.924 20.6301L21.3616 25.3446C22.5423 26.0026 23.3741 25.6561 23.6926 24.2584L27.9183 4.45774L27.9195 4.45657C28.294 2.71124 27.2883 2.02874 26.138 2.4569L1.29963 11.9664C-0.395537 12.6244 -0.36987 13.5694 1.01146 13.9976L7.36163 15.9727L22.1118 6.74324C22.806 6.28357 23.4371 6.5379 22.918 6.99757L10.9865 17.7111Z"
                      fill="#787878"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsInstaAdded(true);
                socialIconClickHandler("InstaEditList");
              }}
              className="iconSmContainer "
            >
              {!isInstaAdded && <img src={instagramSm} alt="instagram" />}
              {isInstaAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M27.9703 8.23208C27.9047 6.74433 27.6641 5.72152 27.3195 4.83523C26.9639 3.89447 26.4169 3.0522 25.7003 2.35202C25.0001 1.64095 24.1523 1.08841 23.2224 0.738425C22.331 0.393784 21.3136 0.153198 19.8258 0.0876025C18.327 0.0164522 17.8511 0 14.0496 0C10.2481 0 9.77225 0.0164522 8.27895 0.0820473C6.7912 0.147642 5.76839 0.388443 4.88232 0.73287C3.94134 1.08841 3.09908 1.63539 2.3989 2.35202C1.68782 3.0522 1.1355 3.90002 0.7853 4.82989C0.440659 5.72152 0.200073 6.73877 0.134478 8.22652C0.0633272 9.72538 0.046875 10.2012 0.046875 14.0027C0.046875 17.8043 0.0633272 18.2801 0.128922 19.7734C0.194517 21.2611 0.435317 22.284 0.779959 23.1702C1.1355 24.111 1.68782 24.9533 2.3989 25.6534C3.09908 26.3645 3.9469 26.9171 4.87677 27.267C5.76839 27.6117 6.78565 27.8523 8.27361 27.9179C9.7667 27.9837 10.2427 27.9999 14.0443 27.9999C17.8458 27.9999 18.3216 27.9837 19.8149 27.9179C21.3027 27.8523 22.3255 27.6117 23.2115 27.267C25.0933 26.5395 26.581 25.0518 27.3086 23.1702C27.653 22.2786 27.8938 21.2611 27.9594 19.7734C28.025 18.2801 28.0414 17.8043 28.0414 14.0027C28.0414 10.2012 28.0359 9.72538 27.9703 8.23208ZM25.4488 19.664C25.3886 21.0315 25.1589 21.7699 24.9674 22.2622C24.497 23.482 23.5288 24.4501 22.309 24.9206C21.8167 25.112 21.073 25.3417 19.7109 25.4017C18.234 25.4676 17.7911 25.4838 14.0552 25.4838C10.3192 25.4838 9.87075 25.4676 8.39924 25.4017C7.03179 25.3417 6.29336 25.112 5.80108 24.9206C5.19406 24.6962 4.64152 24.3407 4.19304 23.8758C3.7281 23.4217 3.37257 22.8747 3.14822 22.2677C2.95677 21.7754 2.72709 21.0315 2.66705 19.6696C2.60124 18.1927 2.585 17.7496 2.585 14.0136C2.585 10.2777 2.60124 9.82922 2.66705 8.35792C2.72709 6.99047 2.95677 6.25204 3.14822 5.75976C3.37257 5.15253 3.7281 4.6002 4.19859 4.15151C4.65242 3.68657 5.1994 3.33103 5.80663 3.1069C6.29892 2.91546 7.0429 2.68577 8.4048 2.62551C9.88165 2.55992 10.3248 2.54347 14.0605 2.54347C17.802 2.54347 18.2449 2.55992 19.7164 2.62551C21.0839 2.68577 21.8223 2.91546 22.3146 3.1069C22.9216 3.33103 23.4741 3.68657 23.9226 4.15151C24.3876 4.60554 24.7431 5.15253 24.9674 5.75976C25.1589 6.25204 25.3886 6.99581 25.4488 8.35792C25.5144 9.83478 25.5309 10.2777 25.5309 14.0136C25.5309 17.7496 25.5144 18.1871 25.4488 19.664Z"
                      fill="#787878"
                    />
                    <path
                      d="M14.0519 6.80981C10.081 6.80981 6.85913 10.0315 6.85913 14.0026C6.85913 17.9738 10.081 21.1954 14.0519 21.1954C18.0231 21.1954 21.2448 17.9738 21.2448 14.0026C21.2448 10.0315 18.0231 6.80981 14.0519 6.80981ZM14.0519 18.6684C11.4758 18.6684 9.38614 16.579 9.38614 14.0026C9.38614 11.4263 11.4758 9.33683 14.0519 9.33683C16.6283 9.33683 18.7177 11.4263 18.7177 14.0026C18.7177 16.579 16.6283 18.6684 14.0519 18.6684Z"
                      fill="#787878"
                    />
                    <path
                      d="M23.2102 6.52587C23.2102 7.45318 22.4583 8.20507 21.5308 8.20507C20.6035 8.20507 19.8516 7.45318 19.8516 6.52587C19.8516 5.59835 20.6035 4.84668 21.5308 4.84668C22.4583 4.84668 23.2102 5.59835 23.2102 6.52587Z"
                      fill="#787878"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsPinterestAdded(true);
                socialIconClickHandler("PinterestEditList");
              }}
              className="iconSmContainer "
            >
              {!isPinterestAdded && <img src={pinterestSm} alt="pinterest" />}
              {isPinterestAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M14.001 0.00115967C6.26867 0.00115967 0 6.26896 0 13.9994C0 19.7332 3.44668 24.6576 8.38061 26.8227C8.33885 25.8443 8.37147 24.6721 8.62207 23.6089C8.89271 22.4717 10.4254 15.9792 10.4254 15.9792C10.4254 15.9792 9.97865 15.0853 9.97865 13.7651C9.97865 11.6899 11.1808 10.1409 12.6771 10.1409C13.9519 10.1409 14.5657 11.0979 14.5657 12.2424C14.5657 13.5217 13.7504 15.4376 13.3309 17.2104C12.9804 18.6958 14.0754 19.9075 15.539 19.9075C18.1921 19.9075 19.9791 16.4994 19.9791 12.4639C19.9791 9.39636 17.9124 7.09964 14.1535 7.09964C9.90596 7.09964 7.26193 10.2662 7.26193 13.8032C7.26193 15.0235 7.61972 15.8829 8.18448 16.5484C8.44242 16.8553 8.47871 16.9788 8.38428 17.3293C8.31706 17.5872 8.1645 18.2073 8.09914 18.4524C8.0064 18.8075 7.71956 18.9337 7.39819 18.8039C5.44247 18.0039 4.53263 15.8638 4.53263 13.4555C4.53263 9.47803 7.88669 4.71029 14.5367 4.71029C19.8827 4.71029 23.4021 8.57692 23.4021 12.729C23.4021 18.2209 20.3477 22.3245 15.846 22.3245C14.3351 22.3245 12.9132 21.5064 12.4265 20.5784C12.4265 20.5784 11.613 23.8049 11.4424 24.4268C11.1445 25.5055 10.5634 26.5856 10.0331 27.4263C11.2916 27.7977 12.6226 28.0001 14.001 28.0001C21.7332 28.0001 28 21.7324 28 13.9992C28 6.26896 21.7332 0.00115967 14.001 0.00115967Z"
                      fill="#787878"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsFacebookAdded(true);
                socialIconClickHandler("FacebookEditList");
              }}
              className="iconSmContainer "
            >
              {!isFacebookAdded && <img src={facebookSm} alt="facebook" />}
              {isFacebookAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9988 0.00582587L17.3679 0C13.2886 0 10.6524 2.70466 10.6524 6.89084V10.068H7.0016C6.68613 10.068 6.43066 10.3237 6.43066 10.6392V15.2425C6.43066 15.558 6.68642 15.8134 7.0016 15.8134H10.6524V27.4291C10.6524 27.7445 10.9078 28 11.2233 28H15.9865C16.302 28 16.5575 27.7442 16.5575 27.4291V15.8134H20.8261C21.1416 15.8134 21.397 15.558 21.397 15.2425L21.3988 10.6392C21.3988 10.4877 21.3385 10.3427 21.2316 10.2355C21.1247 10.1283 20.979 10.068 20.8276 10.068H16.5575V7.37468C16.5575 6.08017 16.866 5.42301 18.5523 5.42301L20.9983 5.42214C21.3134 5.42214 21.5689 5.16638 21.5689 4.8512V0.576761C21.5689 0.261873 21.3137 0.00640846 20.9988 0.00582587Z"
                    fill="#787878"
                  />
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsWhatsappAdded(true);
                socialIconClickHandler("WhatsappEditList");
              }}
              className="iconSmContainer "
            >
              {!isWhatsappAdded && <img src={whatsappSm} alt="whatsapp" />}
              {isWhatsappAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.2829 4.6761C20.8271 2.21741 17.5611 0.86277 14.0817 0.861328C6.91195 0.861328 1.07684 6.69628 1.07395 13.8679C1.07299 16.1605 1.67188 18.3984 2.81023 20.371L0.964844 27.1113L7.86044 25.3025C9.76045 26.3389 11.8995 26.8851 14.0764 26.8857H14.0818C21.2508 26.8857 27.0865 21.0503 27.0892 13.8783C27.0907 10.4026 25.7389 7.13463 23.2829 4.6761ZM14.0817 24.689H14.0772C12.1373 24.6882 10.2347 24.1669 8.57452 23.182L8.17991 22.9476L4.08796 24.0211L5.18016 20.0315L4.92301 19.6224C3.84074 17.9011 3.26925 15.9115 3.27021 13.8687C3.27245 7.90784 8.12255 3.05823 14.086 3.05823C16.9738 3.05919 19.6883 4.1852 21.7295 6.22877C23.7707 8.27234 24.8941 10.9887 24.8931 13.8775C24.8906 19.8389 20.0408 24.689 14.0817 24.689ZM20.012 16.5918C19.687 16.429 18.089 15.643 17.791 15.5343C17.4933 15.4259 17.2764 15.3719 17.0599 15.6971C16.8432 16.0224 16.2204 16.7546 16.0307 16.9713C15.841 17.1883 15.6516 17.2155 15.3266 17.0527C15.0015 16.8901 13.9543 16.5468 12.7128 15.4395C11.7467 14.5777 11.0944 13.5134 10.9047 13.1881C10.7153 12.8626 10.9031 12.7036 11.0473 12.5248C11.3992 12.0879 11.7515 11.6299 11.8598 11.4131C11.9682 11.1961 11.9139 11.0063 11.8325 10.8437C11.7515 10.681 11.1015 9.08127 10.8307 8.43031C10.5667 7.79681 10.2989 7.88237 10.0993 7.87244C9.90993 7.86298 9.69316 7.86106 9.47639 7.86106C9.25977 7.86106 8.90761 7.94229 8.60961 8.26785C8.31177 8.59325 7.47223 9.37944 7.47223 10.9792C7.47223 12.579 8.63685 14.1244 8.79931 14.3414C8.96177 14.5583 11.0912 17.8412 14.3515 19.2488C15.1269 19.584 15.7322 19.7838 16.2044 19.9336C16.983 20.181 17.6914 20.146 18.2515 20.0624C18.876 19.969 20.1743 19.2761 20.4453 18.5169C20.7161 17.7577 20.7161 17.107 20.6347 16.9713C20.5536 16.8358 20.3369 16.7546 20.012 16.5918Z"
                    fill="#787878"
                  />
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsLinkedInAdded(true);
                socialIconClickHandler("LinkedInEditList");
              }}
              className="iconSmContainer "
            >
              {!isLinkedInAdded && <img src={linkedInSm} alt="linkedIn" />}
              {isLinkedInAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#787878" />
                  <path
                    d="M19.5834 19.0196C19.5834 19.2763 19.3754 19.4844 19.1187 19.4844H16.81C16.5534 19.4844 16.3453 19.2763 16.3453 19.0196V14.7892C16.3453 14.1581 16.5304 12.0238 14.696 12.0238C13.2732 12.0238 12.9846 13.4847 12.9266 14.1403V19.0196C12.9266 19.2763 12.7186 19.4844 12.4619 19.4844H10.229C9.97233 19.4844 9.76425 19.2763 9.76425 19.0196V9.9192C9.76425 9.66256 9.97233 9.45448 10.229 9.45448H12.4619C12.7185 9.45448 12.9266 9.66256 12.9266 9.9192V10.706C13.4542 9.91428 14.2383 9.30314 15.9077 9.30314C19.5838 9.30314 19.5836 12.7181 19.5834 14.6224V14.6546V19.0196Z"
                    fill="white"
                  />
                  <path
                    d="M8.33973 18.9789C8.33973 19.2581 8.11345 19.4844 7.8343 19.4844H5.68279C5.40364 19.4844 5.17736 19.2581 5.17736 18.9789V9.95991C5.17736 9.68076 5.40364 9.45448 5.68279 9.45448H7.8343C8.11345 9.45448 8.33973 9.68076 8.33973 9.95991V18.9789Z"
                    fill="white"
                  />
                  <path
                    d="M6.75855 8.6043C5.62972 8.6043 4.7146 7.68919 4.7146 6.56036C4.7146 5.43153 5.62972 4.51641 6.75855 4.51641C7.88738 4.51641 8.80249 5.43153 8.80249 6.56036C8.80249 7.68919 7.88743 8.6043 6.75855 8.6043Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                socialLinksArray.length <= 4 && setIsSpotifyAdded(true);
                socialIconClickHandler("SpotifyEditList");
              }}
              className="iconSmContainer "
            >
              {!isSpotifyAdded && <img src={spotifySm} alt="spotify" />}
              {isSpotifyAdded && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.37257 0 0 5.37257 0 12C0 18.6274 5.37257 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37257 18.6274 0 12 0ZM17.2226 17.4153C17.07 17.6764 16.7954 17.8219 16.5133 17.822C16.3727 17.822 16.2302 17.7858 16.1 17.7097C13.9436 16.4495 11.4524 16.247 9.74188 16.299C7.84709 16.3566 6.45755 16.7307 6.44374 16.7345C6.00696 16.8538 5.55558 16.5968 5.43577 16.16C5.316 15.7234 5.57214 15.2723 6.0087 15.152C6.07133 15.1348 7.5666 14.7286 9.64592 14.6601C10.8707 14.6196 12.0498 14.705 13.15 14.9137C14.5434 15.178 15.8146 15.642 16.9281 16.2928C17.3194 16.5215 17.4512 17.0241 17.2226 17.4153ZM18.7481 14.2468C18.5674 14.5561 18.2422 14.7285 17.908 14.7285C17.7415 14.7285 17.5727 14.6857 17.4185 14.5956C14.8642 13.1028 11.9132 12.863 9.88712 12.9245C7.64264 12.9928 5.99669 13.4359 5.98036 13.4404C5.4631 13.5815 4.92832 13.2773 4.7864 12.76C4.64452 12.2427 4.94797 11.7084 5.46506 11.5659C5.53925 11.5455 7.31041 11.0644 9.77342 10.9832C11.2243 10.9353 12.6209 11.0364 13.9241 11.2836C15.5747 11.5968 17.0804 12.1464 18.3994 12.9172C18.8629 13.188 19.019 13.7833 18.7481 14.2468ZM19.686 11.3658C19.4816 11.3658 19.2747 11.3133 19.0855 11.2028C13.0129 7.65381 5.13552 9.76366 5.05667 9.78543C4.42178 9.96036 3.76545 9.5875 3.59058 8.95266C3.41566 8.31783 3.78852 7.66144 4.42335 7.48657C4.51432 7.46149 6.68686 6.87138 9.70799 6.77177C11.4877 6.71318 13.2008 6.83709 14.7992 7.14031C16.8239 7.5244 18.6708 8.19852 20.2886 9.14403C20.8571 9.47627 21.0487 10.2064 20.7165 10.7749C20.4948 11.1543 20.0958 11.3658 19.686 11.3658Z"
                    fill="#787878"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // social icon components

  const TelegramEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={telegramSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              handlerSocialListRemove("TelegramEditList");
              telegramUsername.current = "";
              const fArray = socialLinks.filter(
                (link) => link.name !== "telegram"
              );
              setIsTelegramAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={telegramUsername.current}
            onChange={(e) => {
              telegramUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder={"Enter Username"}
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };
  const FacebookEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={facebookSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              handlerSocialListRemove("FacebookEditList");
              fbUsername.current = "";
              const fArray = socialLinks.filter(
                (link) => link.name !== "facebook"
              );
              setIsFacebookAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={fbUsername.current}
            onChange={(e) => {
              fbUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder={"Enter Username"}
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };

  const InstaEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={instagramSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              instaUsername.current = "";
              handlerSocialListRemove("InstaEditList");
              const fArray = socialLinks.filter(
                (link) => link.name !== "instagram"
              );
              setIsInstaAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={instaUsername.current}
            onChange={(e) => {
              instaUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder={"Enter Username"}
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };
  const PinterestEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={pinterestSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              pinterestUsername.current = "";
              handlerSocialListRemove("PinterestEditList");
              const fArray = socialLinks.filter(
                (link) => link.name !== "pinterest"
              );
              setIsPinterestAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={pinterestUsername.current}
            onChange={(e) => {
              pinterestUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder={"Enter Username"}
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };
  const WhatsappEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={whatsappSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              whatsappUsername.current = "";
              handlerSocialListRemove("WhatsappEditList");
              const fArray = socialLinks.filter(
                (link) => link.name !== "whatsapp"
              );
              setIsWhatsappAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={whatsappUsername.current}
            onChange={(e) => {
              whatsappUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder="Enter number with country code"
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };
  const LinkedInEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={linkedInSm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              linkedInUsername.current = "";
              handlerSocialListRemove("LinkedInEditList");
              const fArray = socialLinks.filter(
                (link) => link.name !== "linkedIn"
              );
              setIsLinkedInAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer ">
          <ContentEditable
            html={linkedInUsername.current}
            onChange={(e) => {
              linkedInUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder={"Enter Username"}
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };
  const SpotifyEditList = ({ id }) => {
    return (
      <div className="socialListMainContainer ">
        <img className="socialIcon" src={spotifySm} alt="socialIcon" />
        {isEditing && (
          <img
            onClick={() => {
              spotifyUsername.current = "";
              handlerSocialListRemove("SpotifyEditList");
              const fArray = socialLinks.filter(
                (link) => link.name !== "spotify"
              );
              setIsSpotifyAdded(false);
              setSocialLinks(fArray);
            }}
            className="removeIconSocialList"
            src={remove}
            alt="removeIcon"
          />
        )}

        <div className="socialEditContainer">
          <ContentEditable
            html={spotifyUsername.current}
            onChange={(e) => {
              spotifyUsername.current = formatText(e.target.value);
            }}
            onPaste={formatOnPaste}
            placeholder="Enter Username"
            className="socialListUsername"
            tagName="p"
          />
        </div>
      </div>
    );
  };

  const HolderCard = () => {
    return (
      <div className=" thirdSectionMainContainer ">
        <label htmlFor="cardImageUpload">
          <div className="thirdSectionImageContainer">
            <img
              className="thirdSectionImage"
              src={holderCardImage || camera}
              alt=""
            />
            {isEditing && (
              <img
                className="cameraIconForHolderCard"
                src={cameraIconLg}
                alt="cameraIcon"
              />
            )}
            <div ref={cardImageErrorRef}>
              {cardImageError && (
                <ErrorBubble top={50} left={20} text="Upload Image here !" />
              )}
            </div>
          </div>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="cardImageUpload"
          onChange={(e) =>
            handleImageUpload(e, setHolderCardImage, "cardImage")
          }
          accept=".jpg,.jpeg,.png,.svg,.gif"
        />
        <div className="thirdSectionContentContainer d-flex-row">
          <div className="thirdSectionHeadingContainer">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div ref={cardUrlErrorRef}>
                {cardUrlError && (
                  <ErrorBubble top={175} left={20} text="Enter URL here !" />
                )}
              </div>
              <ContentEditable
                html={holderCardTitle.current}
                onChange={(e) => {
                  holderCardTitle.current = formatText(e.target.value);
                }}
                onPaste={formatOnPaste}
                className="cardTitle"
                placeholder="Enter Title"
                tagName="h1"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ContentEditable
                html={holderCardDescription.current}
                onChange={(e) => {
                  holderCardDescription.current = formatText(e.target.value);
                }}
                onPaste={formatOnPaste}
                className="cardDescription"
                placeholder="Enter Description"
                tagName="h5"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 6 }}
            >
              <ContentEditable
                html={holderCardURL.current}
                onChange={(e) => {
                  holderCardURL.current = formatText(e.target.value);
                }}
                onPaste={formatOnPaste}
                className="cardUrl"
                placeholder="Enter URL"
                tagName="h5"
              />
            </div>
          </div>
        </div>
        {holderCardImage && (
          <button className="cardResetButton" onClick={handleCardReset}>
            Reset
          </button>
        )}
      </div>
    );
  };

  const Card = ({ image, title, description, id, url }) => {
    return (
      <div
        className={
          title === "" && description === ""
            ? "thirdSectionMainContainerWithoutPadding"
            : "thirdSectionMainContainer"
        }
      >
        {isEditing && (
          <img
            onClick={() => handlerDeleteComponent(id, "card")}
            className="removeIcon"
            src={remove}
            alt="removeIcon"
          />
        )}
        <Router>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={{ pathname: url }}
            target="_blank"
          >
            <div className="thirdSectionImageContainer">
              <img className="thirdSectionImage" src={image} alt="" />
            </div>
            {title || description ? (
              <div className="thirdSectionContentContainer d-flex-row">
                <div className="thirdSectionHeadingContainer">
                  <h1 id="cardTitleInEdit" className="thirdSectionTitle ">
                    {title}
                  </h1>
                  <h5
                    id="cardDescriptionInEdit"
                    className="thirdSectionDescription"
                  >
                    {description}
                  </h5>
                </div>
              </div>
            ) : null}
          </Link>
        </Router>
      </div>
    );
  };

  const HolderList = () => {
    return (
      <div className="lastSectionMainContainer d-flex-row">
        <label htmlFor="holderListImageUpload">
          <div className="lastSectionImageDiv">
            <img
              className="lastSectionImage"
              src={holderListImage || cameraXs}
              alt=""
            />
            {isEditing && (
              <img
                className="cameraIconForHolderList"
                src={cameraIconSm}
                alt="cameraIcon"
              />
            )}
          </div>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="holderListImageUpload"
          onChange={(e) =>
            handleImageUpload(e, setHolderListImage, "listImage")
          }
          accept=".jpg,.jpeg,.png,.svg,.gif"
        />
        <div className="lastSectionContentContainer ">
          <div className="d-flex-row">
            <ContentEditable
              html={holderListTitle.current}
              onChange={(e) => {
                holderListTitle.current = formatText(e.target.value);
              }}
              onPaste={formatOnPaste}
              placeholder="Add Title"
              className="listTitle"
              tagName="h3"
            />
          </div>
          <div ref={hlTitleErrorRef}>
            {hlTitleError && (
              <ErrorBubble bottom={65} left={90} text="Enter Title here !" />
            )}
          </div>
          <ContentEditable
            html={holderListUrl.current}
            onChange={(e) => {
              holderListUrl.current = formatText(e.target.value);
            }}
            style={{ textAlign: "center" }}
            onPaste={formatOnPaste}
            className="listUrl"
            placeholder="Enter URL"
            tagName="h5"
          />
          <div ref={hlUrlErrorRef}>
            {hlUrlError && (
              <ErrorBubble bottom={40} left={95} text="Enter URL here !" />
            )}
          </div>
        </div>
      </div>
    );
  };
  const List = ({ image, title, id, url }) => {
    return (
      <Router>
        <div className="lastSectionMainContainer d-flex-row">
          {isEditing && (
            <img
              onClick={() => handlerDeleteComponent(id, "list")}
              className="removeIconForList"
              src={remove}
              alt="removeIcon"
            />
          )}
          {image && (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={{ pathname: url }}
              target="_blank"
            >
              <img className="lastSectionImage" src={image} alt="" />
            </Link>
          )}

          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={{ pathname: url }}
            target="_blank"
          >
            <div
              className={
                image
                  ? "lastSectionContentContainer lasSectionContentContainerInView d-flex-row "
                  : "listWithoutImage"
              }
            >
              <h3 className="listTitleInView">{title}</h3>
            </div>
          </Link>
        </div>
      </Router>
    );
  };

  const EditPage = () => {
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
    } else
      return (
        <>
          <main
            className={
              isModalOpened || isUserLinkModalOpen || isPublishingData
                ? "container bgBlur"
                : "container"
            }
          >
            {/* first section  */}
            <section className="firstSection">
              <label htmlFor="coverPhotoUpload">
                <div className="coverPhotoContainer">
                  {coverPhoto && (
                    <button
                      className="coverResetButton"
                      onClick={handleCoverReset}
                    >
                      Reset
                    </button>
                  )}
                  <img
                    className="coverPhoto"
                    src={coverPhoto || camera}
                    alt="coverPhoto"
                  />
                  {isEditing && (
                    <img
                      className="cameraIconForCover"
                      src={cameraIconLg}
                      alt="cameraIcon"
                    />
                  )}
                </div>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="coverPhotoUpload"
                onChange={(e) =>
                  handleImageUpload(e, setCoverPhoto, "coverPhoto")
                }
                accept=".jpg,.jpeg,.png,.svg,.gif"
              />
              <div className="DpAndNameContainer d-flex-row">
                <label htmlFor="dpUpload">
                  <div className="dpContainer">
                    <img
                      className={
                        profilePhoto ? "profilePhotoScaled " : "profilePhoto "
                      }
                      src={profilePhoto || profile}
                      alt="profilePhoto"
                    />
                    {isEditing && (
                      <img
                        className="cameraIconForDp"
                        src={cameraIconLg}
                        alt="cameraIcon"
                      />
                    )}
                  </div>
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="dpUpload"
                  onChange={(e) =>
                    handleImageUpload(e, setProfilePhoto, "profilePhoto")
                  }
                  accept=".jpg,.jpeg,.png,.svg,.gif"
                />
                <div className="usernameContainer">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <ContentEditable
                      html={name.current}
                      onChange={(e) => {
                        setNameError(false);
                        name.current = formatText(e.target.value);
                      }}
                      className="name"
                      onPaste={formatOnPaste}
                      tagName="h1"
                      placeholder="Enter Your Name"
                    />{" "}
                    <div ref={nameErrorRef}>
                      {nameError && (
                        <ErrorBubble
                          top={220}
                          left={110}
                          text="Enter Name here !"
                        />
                      )}
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "",
                    }}
                  >
                    <ContentEditable
                      html={bio.current}
                      onChange={bioChange}
                      className="bio"
                      placeholder="Enter short description"
                      onPaste={formatOnPaste}
                      tagName="h5"
                    />{" "}
                  </div>
                </div>
              </div>
            </section>

            <section className="socialMediaIconSection ">
              <div
                onClick={handleModalOpen}
                className="socialMediaLinksContainer d-flex-row"
              >
                {socialLinks.length === 0 && (
                  <>
                    <div className="socialIconContainer"></div>
                    <div className="socialIconContainer"></div>
                    <div className="socialIconContainer"></div>
                    <div className="socialIconContainer"></div>
                  </>
                )}
                {socialLinks.map((link) => {
                  return (
                    <img className="socialIconInView" src={link?.icon} alt="" />
                  );
                })}
              </div>
              {socialLinks.length === 0 && (
                <p className="SmSectionHeading">Enter Social Media Links</p>
              )}
            </section>

            {/* third section  */}
            <section className="thirdSection">
              <HolderCard />
            </section>

            {/* last section  */}
            <section className="lastSection">
              {lists.map((list) => {
                return (
                  <List
                    key={list.id}
                    url={list.url}
                    id={list.id}
                    image={list.image}
                    title={list.title}
                    isEditing={true}
                    handlerDeleteComponent={handlerDeleteComponent}
                  />
                );
              })}
              <HolderList />
            </section>
            <button className="button" onClick={handleListAdd}>
              Add Link <img src={plus} alt="plus" />{" "}
            </button>
          </main>

          <SocialModal />
        </>
      );
  };
  const DataUploadModal = () => {
    if (isPublishingData) {
      return (
        // <ReactLoading
        //   type={"cylon"}
        //   color={"#0671E3"}
        //   height={50}
        //   width={60}
        //   className="spinner"
        // />
        <section
          className={
            isPublishingData
              ? "userLinkModalContainer  displayBlock "
              : "userLinkModalContainer"
          }
        >
          <div className="userLinkMainContainer  boxShadow">
            <p className="publishP">Uploading Media</p>
            <p style={{ marginTop: 5, marginBottom: 5 }} className="belowP">
              {uploadMediaName === "coverPhoto"
                ? "Cover Photo"
                : uploadMediaName === "profilePhoto"
                ? "Profile Photo"
                : uploadMediaName === "cardImage"
                ? "Card Image"
                : uploadMediaName === "linkImage"
                ? "Link Image"
                : "images"}
              &nbsp;{uploadProgress}%
            </p>
            <ProgressComp
              value={uploadProgress}
              line={true}
              strokeColor="#0671e3"
            />
          </div>
        </section>
      );
    }
  };
  return (
    <div style={{ paddingBottom: 0 }} className="container">
      {!isModalOpened && (
        <div
          className={
            isUserLinkModalOpen || isPublishingData
              ? "finalSubmitBtnContainer boxShadow bgBlur"
              : "finalSubmitBtnContainer boxShadow"
          }
        >
          <button
            className="cancelBtn"
            onClick={!isEditing ? handlerBackToEdit : handlerCancelEditing}
          >
            {isEditing ? (
              "CANCEL"
            ) : (
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
            )}
          </button>
          <button
            className="doneBtn"
            onClick={isEditing ? handlerDoneEditing : handlerUserLinkModalOpen}
          >
            DONE
          </button>
        </div>
      )}

      {isModalOpened && (
        <div className="finalSubmitBtnContainer boxShadow">
          <button className="cancelBtn" onClick={handleModalClose}>
            CANCEL
          </button>
          <button className="doneBtn" onClick={handleSocialIconSubmit}>
            SAVE
          </button>
        </div>
      )}

      <EditPage />
      <UserLinkModal />
      {isPublishingData && <DataUploadModal />}
    </div>
  );
}

export default App;
