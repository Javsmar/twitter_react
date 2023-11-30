import React from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";

import { ReactComponent as IconNotLiked } from "../../../assets/not-liked.svg";
import { ReactComponent as IconLiked } from "../../../assets/liked.svg";
import "./LikeButton.css";

const LikeButton = ({ likes, isLike, onLike }) => {
  const Icon = isLike ? IconLiked : IconNotLiked;

  return (
    <div
      className={clsx("likeButton", {
        "likeButton--active": isLike,
      })}
      onClick={(event) => {
        event.preventDefault();
        onLike(event);
      }}
    >
      <span className="likeButton-icon">
        <Icon width="20" height="20" />
      </span>
      <span className="likeButton-label">{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  isLike: PropTypes.bool,
  onLike: PropTypes.func.isRequired,
};

LikeButton.defaultProps = {
  isLike: false,
};

export default LikeButton;
