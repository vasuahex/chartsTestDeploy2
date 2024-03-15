import React from "react";
import FeedIcon from "@mui/icons-material/Feed";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Tooltip } from "@mui/material";

interface StickyIconComponentProps {
  onClick?: (view: string) => void;
  view?: string;
}

const StickyIconComponent: React.FC<StickyIconComponentProps> = ({
  onClick,
  view,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "40%",
        background: "#fff",
        boxShadow: "2px 3px 1px 1px #cdcdcd",
        width: "40px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <Tooltip title="View Saved Charts" arrow>
        <BarChartIcon
          fontSize="medium"
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
            color: view === "charts" ? "blue" : "inherit",
          }}
          onClick={() => {
            onClick?.("charts");
          }}
        />
      </Tooltip>
      <br />
      <Tooltip title="View data table" arrow>
        <FeedIcon
          fontSize="medium"
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
            color: view === "table" ? "blue" : "inherit",
          }}
          onClick={() => {
            onClick?.("table");
          }}
        />
      </Tooltip>
    </div>
  );
};

export default StickyIconComponent;
