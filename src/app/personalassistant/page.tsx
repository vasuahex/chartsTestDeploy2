"use client";
import { useRef, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
// import HistoryIcon from "@mui/icons-material/History";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { Box, Drawer, Menu, MenuItem } from "@mui/material";
import toast from 'react-hot-toast';
import Image from 'next/image';
import bgImage from "../../../public/bgImage.png"
import { chartConfigSliceActions } from "@/libs/redux/slices/chartConfigSlice";
import { useAppDispatch } from "@/libs/redux/redux-hooks";
import { useAppSelector } from "@/libs/redux/redux-hooks";
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';



const AiChatPage = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const isDialogOpen = useAppSelector((state) => state.chartConfig.isDialogOpen);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<
    { text: React.ReactNode; sender: string }[]
  >([
    {
      text: (
        <>
          The data I have is from a CSV file called {selectedFile}. It contains
          information about the year, mileage (in thousands), and price of Ford
          Escort cars. This data can be used for various purposes, such as data
          visualization, analysis, and making data-driven decisions.
        </>
      ),
      sender: "receiver",
    },
    {
      text: (
        <div style={{ display: 'flex' }}>
          <div >
            <p>Prompts:</p>
            <ol style={{ color: 'black', listStyleType: 'decimal', padding: "20px" }}>
              <li><span style={{ color: "blue" }}>How does the price of Ford Escort cars vary with their mileage?</span></li>
              <li><span style={{ color: "blue" }}>Is there any correlation between the year of the car and  its price?</span></li>
              <li><span style={{ color: "blue" }}>Can we identify any trends or patterns in the price of Ford Escort cars over the years?</span></li>
            </ol>
            <p>Feel free to ask any questions you may have about this data or any other related topic. I&#39;m here to help!</p>
          </div>
        </div>
      ),
      sender: "receiver",
    },
    {
      text: (
        <div
          style={{ display: "flex" }}>
          <div style={{ marginRight: '4px' }}>
            Is there any correlation between the year of the car and its price?
          </div>
          {/* <div className="ml-auto">
            <FaUserCircle className="text-black w-5 h-5" />
          </div> */}
        </div>
      ),
      sender: "user",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;
    setAnchorEl(currentTarget);
  };

  const handleEditView = () => {
    handleMenuClose();
  };

  const handleRename = () => {
    handleMenuClose();
  };

  const handleRemove = () => {
    setUploadedFileName(null);
    setSelectedFile(null);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.name.split(".").pop();
      if (fileType !== "csv") {
        toast.error('Please upload a CSV file');
        return;
      }
      setUploadedFileName(file.name);
      setSelectedFile(file.name);
    }
    event.target.value = "";
  };

  const handleUploadIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMessageSend = () => {
    if (message.length !== 0) {
      const userMessageWithIcon = (
        <div className="flex">
          <div>{message}</div>
        </div>
      );

      setMessages((prevMessages) => [
        {
          text: userMessageWithIcon,
          sender: "user",
        },
        ...prevMessages,
      ]);
      setMessage("");
    } else {
      alert("Please Type a Message");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && message.length !== 0) {
      handleMessageSend();
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${bgImage.src})`, backgroundSize: "cover", backgroundPosition: "center"
        }}
        style={{
          display: "flex",
          backgroundSize: "cover",
          minHeight: "90vh",
        }}
      >

        {isMobile && <div className="toggle-btn" onClick={toggleSidebar}>
          <MenuIcon />
        </div>}
        <div className={`${isOpen ? 'sidebar open' : (isMobile ? 'close' : '')}`} style={{
          // width: "16.666667%",
          backgroundColor: "white",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "8px",
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: "16px",
        }}>
          <div>

            {uploadedFileName && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderColor: "rgba(209,213,219,1)",
                  borderWidth: "2px",
                  fontFamily: "Roboto Slab",
                  fontWeight: "500",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  backgroundColor: "rgba(243,244,246,1)",
                  padding: "10px",
                }}
              >
                <TextSnippetIcon
                  style={{ color: "rgba(75,85,99,1)", marginRight: "4px" }}
                />
                <span

                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "rgba(75,85,99,1)",
                    fontFamily: "Roboto Slab",
                    fontSize: "15px",
                    lineHeight: "29.01px",
                  }}
                >
                  {selectedFile}
                </span>
                <div style={{ marginLeft: 'auto' }}>
                  <MdMoreVert
                    style={{
                      color: "rgba(107,114,128,1)",
                      cursor: "pointer",
                    }}
                    onClick={(e: any) => handleMenuOpen(e)}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    style={{ borderRadius: "12px" }}
                  >
                    <div style={{ padding: "28px, 66px, 28px, 46px", gap: "10px" }}>
                      <MenuItem
                        onClick={handleEditView}
                        style={{ fontFamily: "Roboto Slab" }}
                      >
                        Edit/view
                      </MenuItem>
                      <MenuItem
                        onClick={handleRemove}
                        style={{ fontFamily: "Roboto Slab" }}
                      >
                        Remove
                      </MenuItem>
                      <MenuItem
                        onClick={handleRename}
                        style={{ fontFamily: "Roboto Slab" }}
                      >
                        Rename
                      </MenuItem>
                    </div>
                  </Menu>
                </div>
              </div>
            )}

            <div
              style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
            >

              <Image
                src="/historyIcon.svg"
                alt="History Icon"
                width={15}
                height={15}
                style={{
                  color: "rgba(70,70,70,1)",
                  marginRight: "10px",
                  fontWeight: "600",
                }}
              />
              <span
                style={{
                  color: "rgba(70,70,70,1)",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Recent Sources
              </span>
            </div>
            <div
              style={{
                backgroundColor: "rgba(243,244,246,1)",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
              }}
            // className="bg-gray-100 rounded-lg p-3 mt-2 flex items-center mr-2"
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(70,70,70,1)",
                  fontWeight: "600",
                  fontFamily: "Roboto Slab",
                  fontSize: "15px",
                  lineHeight: "29.01px",
                }}
              // className="truncate text-gray-700 font-bold"
              >
                Annual-enterprise-surv
              </span>
              <MdMoreVert
                style={{
                  color: "rgba(70,70,70,1)",
                  marginLeft: "auto",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                // className="text-gray-500 ml-auto cursor-pointer font-bold"
                onClick={(e: any) => handleMenuOpen(e)}
              />
            </div>
            <div
              style={{
                backgroundColor: "rgba(243,244,246,1)",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
              }}
            // className="bg-gray-100 rounded-lg p-3 mt-2 flex items-center mr-2"
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(70,70,70,1)",
                  fontWeight: "600",
                  fontFamily: "Roboto Slab",
                  fontSize: "15px",
                  lineHeight: "29.01px",
                }}
              // className="truncate text-gray-700 font-bold"
              >
                Industry.csv
              </span>
              <MdMoreVert
                style={{
                  color: "rgba(70,70,70,1)",
                  marginLeft: "auto",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                // className="text-gray-500 ml-auto cursor-pointer"
                onClick={(e: any) => handleMenuOpen(e)}
              />
            </div>
            <div
              style={{
                backgroundColor: "rgba(243,244,246,1)",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                marginRight: "8px",
              }}
            // className="bg-gray-100 rounded-lg p-3 mt-2 flex items-center mr-2"
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(70,70,70,1)",
                  fontWeight: "600",
                  fontFamily: "Roboto Slab",
                  fontSize: "15px",
                  lineHeight: "29.01px",
                }}
              // className="truncate text-gray-700 font-bold"
              >
                Machine-readable-bus
              </span>
              <MdMoreVert
                style={{
                  color: "rgba(70,70,70,1)",
                  marginLeft: "auto",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                // className="text-gray-500 ml-auto cursor-pointer"
                onClick={(e: any) => handleMenuOpen(e)}
              />
            </div>
          </div>
        </div>
        {/* </Drawer> */}

        <div style={{ width: "83.333333%", padding: "16px" }}>
          <div
            style={{
              maxHeight: "75vh", overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {messages
              .slice(0)
              .reverse()
              .map((msg, index) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <div ref={messagesEndRef}
                      key={index}
                      style={{
                        padding: "16px",
                        borderRadius: "8px",
                        display: "flex",
                        marginBottom: "10px",
                        backgroundColor:
                          msg.sender === "user"
                            ? "rgb(243, 244, 246)"
                            : "white",
                        marginLeft: msg.sender === "user" ? "auto" : "",
                        marginRight: msg.sender !== "user" ? "auto" : "",
                        border:
                          msg.sender === "user" ? "1px solid #D1D1D1" : "",
                        width: "fit-content",
                        marginTop: msg.sender !== "user" ? "10px" : "10px",
                      }}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "user" && (
                      <div style={{ marginTop: "20px" }}>
                        <FaUserCircle
                          style={{
                            color: "rgba(55,65,81,1)",
                            width: "28px",
                            height: "28px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              ))}
          </div>
          <div
            style={{
              backgroundColor: "white",
              marginBottom: "8px",
              borderRadius: "4px",
              padding: "16px",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              position: "fixed",
              bottom: "0",
              width: "80%",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                borderColor: "rgba(209,213,219,1)",
                borderRadius: "4px",
                padding: "4px",
                flexGrow: 1,
                border: "none",
                outline: "none"
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleMessageSend}
              disabled={message.length === 0}
              style={{
                marginLeft: '0.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderRadius: '0.25rem',
                background: message.length !== 0
                  ? 'linear-gradient(to bottom right, #7DD3FC, #1E3A8A)'
                  : '#D1D5DB',
                color: message.length !== 0 ? 'white' : 'initial'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AiChatPage;
