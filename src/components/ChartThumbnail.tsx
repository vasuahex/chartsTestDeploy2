"use client"
import Image from "next/image";
import { useState } from "react";


interface IChartThumbnail {
  heading: string;
  imagePath: string;
}

const ChartThumbnail = ({ heading, imagePath }: IChartThumbnail) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        transition: "box-shadow 0.3s ease",
        boxShadow: isHovered ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "none",
      }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{
          paddingInline: "10px",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Image
            src={imagePath}
            alt={heading}
            width={70}
            height={70}
          />
          <p style={{ color: "#000", textAlign: "center" }}>{heading}</p>
        </div>
      </div>
    </>
  );
};

export default ChartThumbnail;
