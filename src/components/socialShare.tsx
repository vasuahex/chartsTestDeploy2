"use client";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface SocialShareComponentProps {
  onClose?: (view: boolean) => void;
  shareUrl?: string | null;
  title?: string;
}

const SocialShareComponent: React.FC<SocialShareComponentProps> = ({
  onClose,
  shareUrl,
  title,
}) => {
  return (
    <div
      style={{
        padding: "8px 6px 0 6px",
        position: "relative",
      }}
    >
      <div
        style={{
          marginInline: 3,
          position: "absolute",
          top: -20,
          right: -20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: 20,
          padding: 5,
          borderRadius: "50%",
          backgroundColor: "#f3f3f3",
          transition: "background-color 0.3s ease-in-out",
        }}
        onClick={() => (onClose ? onClose(false) : "")}
      >
        <IoCloseCircleOutline fontWeight="bold" fontSize={30} color="black" />
      </div>

      <div style={{ fontWeight: "bold", fontSize: 18 }}>
        You can share the url through any of the below apps
      </div>
      <br />
      <div
        style={{
          display: "flex",
          marginTop: 8,
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginInline: 3 }}>
          <TelegramShareButton
            url={shareUrl ? shareUrl : ""}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>

        <div style={{ marginInline: 3 }}>
          <WhatsappShareButton
            url={shareUrl ? shareUrl : ""}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        <div style={{ marginInline: 3 }}>
          <EmailShareButton
            url={shareUrl ? shareUrl : ""}
            title={title}
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <div style={{ marginInline: 3 }}>
          <LinkedinShareButton
            url={shareUrl ? shareUrl : ""}
            title={title}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div style={{ marginInline: 3 }}>
          <TwitterShareButton
            url={shareUrl ? shareUrl : ""}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShareComponent;
