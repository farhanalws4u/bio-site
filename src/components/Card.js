import React from "react";
import remove from "../assets/images/remove.png";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Card = ({
  image,
  title,
  description,
  id,
  url,
  handlerDeleteComponent,
  isEditing,
}) => {
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
          {image && (
            <div className="thirdSectionImageContainer">
              <img className="thirdSectionImage" src={image} alt="" />
            </div>
          )}
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

export default Card;
