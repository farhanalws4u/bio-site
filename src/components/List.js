import React from "react";
import remove from "../assets/images/remove.png";
import { BrowserRouter as Router, Link } from "react-router-dom";

const List = ({
  image,
  title,
  id,
  url,
  isEditing,
  handlerDeleteComponent,
  lessMargin,
}) => {
  console.log(lessMargin);
  return (
    <Router>
      <div
        className={
          lessMargin === true
            ? "lastSectionMainContainerWithoutMargin d-flex-row"
            : "lastSectionMainContainer d-flex-row"
        }
      >
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

export default List;
