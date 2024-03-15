"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  Paper,
  DialogContentText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as d3 from "d3";
import {
  deleteSourceData,
  getContentById,
  getSourceContentById,
  renameContent,
  renameSourceContent,
  saveCodeToDB,
  saveFileToMongoDB,
  saveSourceContent,
  updateDataItem,
  updateSourceType,
} from "../libs/db";
// import { getCodeFromDB, saveCodeToDB } from "../libs/db";
import { Box, Button, Divider, InputBase, Menu, MenuItem } from "@mui/material";
import { FaCloudUploadAlt, FaArrowRight } from "react-icons/fa";
import { TextSnippet as TextSnippetIcon } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import { MdMoreVert } from "react-icons/md";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from "@/assets/svgs/SearchIcon";
import { CiSearch } from "react-icons/ci";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import toast from "react-hot-toast";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdDelete } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import Textarea from '@mui/joy/Textarea';
import { useAppDispatch } from "@/libs/redux/redux-hooks";
import { currentSourceDataAction } from "@/libs/redux/slices/currentSourceDataSlice";

interface SourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setAnchorEl: any;
}

interface FileData {
  sourceType: string;
  fileName: string;
  data: any; // Adjust the type according to your data structure
  _id: number; // Assuming id is a number
}

const useStyles = makeStyles({
  uploadInput: {
    display: "none",
  },
  addMoreButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "10px",
  },
  closeButton: {
    backgroundColor: "#888 !important",
    color: "#fff !important",
    borderRadius: "0 !important",
  },
  uploadLabel: {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    display: "inline-block",
    fontSize: "12px",
  },
});

const SourceDialog: React.FC<SourceDialogProps> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch=useAppDispatch();
  const [dropData, setDropData] = useState<any>({ data: [] });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [currentUploadFileName, setCurrentUploadFileName] = useState();
  const [filesUploadedData, setFilesUploadedData] = useState<FileData[]>([]);

  const [currentFilesUploadedData, setCurrentFilesUploadedData] = useState<
    FileData[]
  >([]);
  const [recentFilesUploadedData, setRecentFilesUploadedData] = useState<
    FileData[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [renameIndex, setRenameIndex] = useState(null);

  const [newFileName, setNewFileName] = useState("");
  const [newRecentFileName, setNewRecentFileName] = useState("");
  const [newCurrentFileName, setNewCurrentFileName] = useState("");
  const [newSourceFileName, setNewSourceFileName] = useState("");
  const [sourceDescription, setSourceDescription] = useState("");


  const [inputPopUp, setInputPopUp] = useState(false); // [inputPopUp, setInputPopUp]
  const [recentInputPopUp, setRecentInputPopUp] = useState(false);

  const [currentInputPopUp, setCurrentInputPopUp] = useState(false);

  const [newFileNameState, setNewFileNameState] = useState("");

  const [recentFileId, setRecentFileId] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);

  const [menuOpenForRecentFiles, setMenuOpenForRecentFiles] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpenInputPopup = () => {
    setOpen(true);
  };

  const handleCloseInputPopup = () => {
    setOpen(false);
  };

  const handleSaveInputPopup = () => {
    setOpen(false);
  };

  const [anchorElForRecentFiles, setAnchorElForRecentFiles] =
    React.useState<null | HTMLElement>(null);
  const openForRecentFiles = Boolean(anchorElForRecentFiles);

  const handleClickOpenForRecentFiles = (event: any, fileId: any) => {
    setAnchorElForRecentFiles(event.currentTarget);
    setRecentFileId(fileId);

    const selectedFile = recentFilesUploadedData.find(
      (file) => file._id === fileId
    );

    if (selectedFile) {
      const fileName = selectedFile.fileName;
      setNewRecentFileName(fileName);
    }
  };
  const handleCloseForRecentFiles = () => {
    setAnchorElForRecentFiles(null);
  };

  const handleClickRenameForRecentFiles = () => {
    setRecentInputPopUp(true);
  };

  const [anchorElForCurrentFiles, setAnchorElForCurrentFiles] =
    React.useState<null | HTMLElement>(null);

  const openForCurrentFiles = Boolean(anchorElForCurrentFiles);
  const handleClickOpenForCurrentFiles = (event: any, fileId: any) => {
    setAnchorElForCurrentFiles(event.currentTarget);
    setCurrentFileId(fileId);
    const selectedFile = currentFilesUploadedData.find(
      (file) => file._id === fileId
    );

    if (selectedFile) {
      const fileName = selectedFile.fileName;
      setNewCurrentFileName(fileName);
    }
  };
  const handleCloseForCurrentFiles = () => {
    setAnchorElForCurrentFiles(null);
  };

  useEffect(() => {
    // console.log("dropDatat",dropData)
  }, [dropData]);

  useEffect(() => {
    setUploadedFiles([]);
    setDropData({ data: [] });
  }, [onClose]);

  useEffect(() => {
    setCurrentFilesUploadedData(
      filesUploadedData.filter((file) => file.sourceType === "current")
    );
    setRecentFilesUploadedData(
      filesUploadedData.filter((file) => file.sourceType === "recent")
    );
  }, [filesUploadedData]);

  const getCodeFromDB12 = async (contentId ? : any) => {
    console.log('contentId',contentId)
    const baseUrl = "/api/getSourceData";
    const url = contentId ? `${baseUrl}/${contentId}` : baseUrl;
    console.log('contentId',url)
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "An error occurred while fetching the data."
        );
      }
      const responseData = await res.json();
      setCurrentUploadFileName(responseData.data.fileName);
      setFilesUploadedData(responseData.data?.content);
      // const fileName = responseData.data.content[responseData.data?.content.length-1].fileName;
      // const data=responseData.data?.content[responseData.data?.content.length-1].data;
      // dispatch(currentSourceDataAction.setDataWithSource({fileName,data}))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCodeFromDB12();
  }, [isOpen]);

  const onChangeFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("testing");
    const fileInput = event.target;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const newFiles = Array.from(fileInput.files);

    // Check if all files are CSV
    if (!newFiles.every((file) => file.name.endsWith(".csv"))) {
      toast.error("Please upload a CSV file.");
      return;
    }

    setUploadedFileName(newFiles[0]?.name);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setOpen(true)

    for (const file of newFiles) {
      try {
        const csvDataRaw = await readCSVFile(file);
        if (Array.isArray(csvDataRaw)) {
          const csvData: any[] = csvDataRaw;
          const transformedData = {
            data: csvData,
          };
          setDropData((prevData: any) => ({
            data: [...prevData.data, transformedData.data],
          }));
        } else {
          console.error("CSV data is not in the expected format:");
        }
      } catch (error) {
        console.error("Error reading CSV file:", error);
      }
    }
  };
  const readCSVFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e && e.target) {
          const csvData = d3.csvParse(e.target.result as string);
          resolve(csvData);
        } else {
          reject(new Error("Error reading CSV file: Event or target is null."));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleSaveFileToDB = async () => {
    // const fileName: any = uploadedFileName;
    // const data = dropData.data[0];
    const sourceType = "current";
    // const eachUploadedCSV = { fileName, data, sourceType };
    // const bodyDetail=[eachUploadedCSV] // IF USER ADDS THREE FILES here [...]

    const filesData: any = uploadedFiles.map((file, index) => ({
      fileName: file.name,
      sourceType: sourceType,
      data: dropData.data[index],
    }));

    // const bodyDetail=[filesData]

    // saveFileToMongoDB(filesData);
    await saveSourceContent(filesData)
    

    // console.log("File saved to DB with fileId:", dropData, params, "File:");
    await saveCodeToDB("SourceData", dropData.data[0]);
    setAnchorEl(null);
    onClose();
  };

  // const handleCancel = (index: number) => {
  //   setUploadedFiles((prevFiles) => {
  //     const updatedFiles = [...prevFiles];
  //     updatedFiles.splice(index, 1);
  //     return updatedFiles;
  //   });

  //   setDropData((prevData: any) => {
  //     const updatedData = { data: [...prevData.data] };
  //     updatedData.data.splice(index, 1);
  //     return updatedData;
  //   });
  // };

  const handleClose = () => {
    setInputPopUp(false);
  };

  const handleCloseRecentPopUp = () => {
    setRecentInputPopUp(false);
    setRecentFileId(null);
    setTrackRecentRename(false);
  };

  const handleCloseCurrentPopUp = () => {
    setCurrentInputPopUp(false);
    setCurrentFileId(null);
    setTrackCurrentRename(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const handleMenuOpen = (event: any, index: any) => {
    const currentTarget = event.currentTarget;
    setAnchorEl(currentTarget);
    setRenameIndex(index);
    setNewFileName(uploadedFiles[index].name);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRenameSourceFile = async () => {
    
    setInputPopUp(true);
    const contentId = "65e9694eb315a7ddb7ad053f";
    const newFileName = "bbbbbbbbbbb.csv";
    await getContentById(contentId);

    await renameContent(contentId, newFileName);
    handleMenuClose();
  };

  const [trackRecentReaname, setTrackRecentRename] = useState(false);
  const [trackCurrentReaname, setTrackCurrentRename] = useState(false);

  const handleRenameRecentFiles = (fileId: any) => {
    setRecentFileId(fileId);
    setRecentInputPopUp(true);
    handleCloseForRecentFiles();
    setTrackRecentRename(true);

    const selectedFile = recentFilesUploadedData.find(
      (file) => file._id === fileId
    );

    if (selectedFile) {
      const fileName = selectedFile.fileName;
      setNewRecentFileName(fileName);
    }
  };

  const handleRenameCurrentFiles = (fileId: any) => {
    setCurrentFileId(fileId);
    setCurrentInputPopUp(true);
    handleCloseForCurrentFiles();
    setTrackCurrentRename(true);

    const selectedFile = currentFilesUploadedData.find(
      (file) => file._id === fileId
    );

    if (selectedFile) {
      const fileName = selectedFile.fileName;
      setNewCurrentFileName(fileName);
    }
  };

  const handleSave = () => {
    if (renameIndex !== null) {
      const updatedFiles = uploadedFiles.map((file, index) => {
        if (index === renameIndex) {
          // If it's the file we want to rename, create a new File object
          // with the updated name
          return new File([file], newFileName, { type: file.type });
        }
        return file; // Otherwise, return the original file object
      });

      setUploadedFiles(updatedFiles);
    }

    setNewFileNameState(newFileName);
    setUploadedFileName(newFileName);
    setNewFileName(newFileName);
    setInputPopUp(false);
  };

  const handleRenameForRecentFiles = async () => {
    setTrackRecentRename(false);
    if (recentFileId !== null) {
      const updatedFiles = recentFilesUploadedData.map((file) => {
        // Check if the file's _id matches the selected _id
        if (file._id === recentFileId) {
          // Create a new object with the updated fileName
          return {
            ...file,
            fileName: newRecentFileName,
          };
        }
        return file; // Otherwise, return the original file object
      });

      setRecentFilesUploadedData(updatedFiles);
      await renameContent(recentFileId, newRecentFileName);
    }
    setRecentInputPopUp(false);
    if (recentFileId !== null) {
      setRecentFileId(null);
    }
  };

  const handleSaveRenameForCurrentFiles = async () => {
    setTrackCurrentRename(false);
    if (currentFileId !== null) {
      const updatedFiles = currentFilesUploadedData.map((file) => {
        // Check if the file's _id matches the selected _id
        if (file._id === currentFileId) {
          // Create a new object with the updated fileName
          return {
            ...file,
            fileName: newCurrentFileName,
          };
        }
        return file; // Otherwise, return the original file object
      });

      setCurrentFilesUploadedData(updatedFiles);
      // await renameContent(currentFileId, newCurrentFileName);
      await renameSourceContent(currentFileId, newCurrentFileName);

    }
    setCurrentInputPopUp(false);
    if (currentFileId !== null) {
      setCurrentFileId(null);
    }
  };

  const handleRemoveForRecentFiles = async (fileId: any) => {
    handleCloseForRecentFiles();

    if (fileId !== null) {
      // Filter out the selected file from recentFilesUploadedData
      const updatedFiles = recentFilesUploadedData.filter(
        (file) => file._id !== fileId
      );

      // Set the state with the updated array
      setRecentFilesUploadedData(updatedFiles);

      // Perform renaming action (assuming renameContent is an asynchronous operation)
      await deleteSourceData(fileId);
    }
    // Close the input popup
    // handleCloseForRecentFiles();
  };

  const handleRemoveForCurrentFiles = async (fileId: any) => {
    handleCloseForCurrentFiles();

    if (fileId !== null) {
      // Filter out the selected file from recentFilesUploadedData
      const updatedFiles = currentFilesUploadedData.filter(
        (file) => file._id !== fileId
      );

      // Set the state with the updated array
      setCurrentFilesUploadedData(updatedFiles);

      // Perform renaming action (assuming renameContent is an asynchronous operation)
      await deleteSourceData(fileId);
    }
    // Close the input popup
    // handleCloseForCurrentFiles();
    getCodeFromDB12();
  };

  useEffect(() => {}, []);

  const onChangeNewFileName = (event: any) => {
    setNewFileName(event.target.value);
  };

  const onChangeNewFileNameForRecent = (event: any) => {
    setNewRecentFileName(event.target.value);
  };

  const onChangeNewFileNameForCurrent = (event: any) => {
    setNewCurrentFileName(event.target.value);
  };

  const onChangeForSourceFileName = (event: any) => {
    setNewSourceFileName(event.target.value);
  };

  const onChangeForSourceDescription = (event: any) => {
    setSourceDescription(event.target.value);
  };

  const handleEditView = async () => {
    // await updateDataItem();
    // await updateDataItem({
    //   updateType: 'renameContent',
    //   // contentId: 'contentId456',
    //   // newSourceType: 'NewSourceType'
    // });
    // updateSourceType();

    // const res = await fetch('/api/data', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // other headers...
    //   },
    //   body: JSON.stringify({
    //     contentId: 'the-content-id',
    //     updatedContentData: {
    //       // the data to update
    //     },
    //   }),
    // });

    // handleMenuClose();
  };

  const updateSourceTypeLocally = (fileId: any, newSourceType: string) => {
    const updatedFiles = filesUploadedData.map((file) => {
      if (file._id === fileId) {
        return { ...file, sourceType: newSourceType };
      }
      return file;
    });
    setFilesUploadedData(updatedFiles);
  };

  const handleEditSelectedAsCurrent = (fileId: any) => {
    updateSourceType(fileId, "current");
    updateSourceTypeLocally(fileId, "current");
    handleCloseForRecentFiles();
  };

  const handleEditSelectedAsRecent = (fileId: any) => {
    getCodeFromDB12(fileId);
    // getSourceContentById(fileId); // for making active

    updateSourceType(fileId, "recent");
    updateSourceTypeLocally(fileId, "recent");
    handleCloseForCurrentFiles();
  };

  const handleRemove = (indexToRemove: any) => {
    setInputPopUp(false);
    setSelectedFile(null);
    setDropData({ data: [] }); // Clear dropData state if needed

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleMenuClose();
    setUploadedFiles((prevFiles) => {
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleRename = async () => {
    // const contentId = '65e80e2795edebf9dbe356c6';
    // const newFileName = 'bbbbbbbbbbb.csv';
    // await getContentById(contentId);

    // await renameContent(contentId, newFileName);

    handleMenuClose();
  };

  // const handleRename = () => {
  //   handleMenuClose();
  // };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = currentFilesUploadedData?.filter((fileData) =>
    fileData?.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogContent
        sx={{
          // display: "flex",
          // justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: {
            xs: "column", // Apply column layout for extra small devices (mobile)
            sm: "row", // Apply row layout for small and larger devices
          },
          position: "relative",
          height: "calc(180vh / 2 - 15px)",
        }}
      >
        <Box style={{ flex: 0.5, marginRight: "10px", overflowX: "auto" }}>
          <Box
            style={{
              // border: "2px solid #000",
              padding: "0px 10px 10px 10px",
              // height: "calc(65vh / 2 - 15px)",
              // marginBottom: "10px",
              // overflow: "auto",
            }}
          >
            {/* Content for the first box */}
            <Box sx={{ display: "flex", gap: "16px" }}>
              {/* First Box */}
              <Box
                sx={{
                  backgroundColor: "#F8F8F8",
                  border: "dashed",
                  borderWidth: "1.5px",
                  borderColor: "#3B82F6",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  flex: 1, // Set flex to distribute space evenly
                }}
              >
                <CloudUploadIcon
                  sx={{
                    color: "#718096",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    marginBottom: "8px",
                  }}
                  onClick={handleUploadIconClick}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#718096",
                    fontSize: "12px",
                    fontFamily: "Roboto Slab",
                    textAlign: "center",
                  }}
                >
                  Click to browse or drag and drop your CSV file
                </Typography>
              </Box>

              {/* Second Box */}
              <Box
                sx={{
                  backgroundColor: "#F8F8F8",
                  border: "dashed",
                  borderWidth: "1.5px",
                  borderColor: "#3B82F6",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  flex: 1, // Set flex to distribute space evenly
                }}
              >
                {/* Content for the second box */}
                <InputBase
                  sx={{
                    fontSize: "12px",
                    wordBreak: "break-word",
                    backgroundColor: "#F8F8F8",
                    border: "1.5px solid #D1D1D1",
                    borderRadius: "8px",
                    paddingLeft: "8px",
                  }}
                  value={""}
                  placeholder="Paste Link"
                  // onClick={handleUploadIconClick}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#718096",
                    fontSize: "12px",
                    fontFamily: "Roboto Slab",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  Copy and paste the URL of your CSV file
                </Typography>
              </Box>
            </Box>

            {/* Your input file element */}
            <InputBase
              type="file"
              inputProps={{ accept: ".csv", multiple: true }}
              inputRef={fileInputRef}
              // className="hidden"
              onChange={onChangeFileUpload}
              sx={{
                display: "none", // Hide the input element
                // Add more custom styles here
              }}
            />

            {uploadedFiles.map((file, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid #CBD5E0", // Equivalent to border-gray-300
                    borderRadius: "16px", // Equivalent to rounded-2xl
                    marginBottom: "16px", // Equivalent to mb-4
                    backgroundColor: "#F3F4F6", // Equivalent to bg-gray-100
                    padding: "10px", // Equivalent to p-4
                  }}
                >
                  <TextSnippetIcon
                    sx={{
                      color: "#718096",
                      marginRight: "8px",
                      width: "0.8em",
                      height: "0.8em",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#718096",
                      fontSize: "8px",
                      wordBreak: "break-word",
                    }}
                  >
                    {file.name}
                  </Typography>

                  <Box style={{ marginLeft: "auto" }}>
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, index)}
                      sx={{ color: "#718096", fontSize: "12px" }}
                    >
                      <MdMoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <Box>
                        {/* <MenuItem
                          onClick={handleEditView}
                          sx={{ fontFamily: "Roboto Slab", fontSize: "13px" }}
                        >
                          Edit/view
                        </MenuItem> */}
                        <MenuItem
                          onClick={() => handleRemove(renameIndex)}
                          sx={{ fontFamily: "Roboto Slab", fontSize: "13px" }}
                        >
                          Remove
                        </MenuItem>
                        <MenuItem
                          onClick={handleRenameSourceFile}
                          sx={{ fontFamily: "Roboto Slab", fontSize: "13px" }}
                        >
                          Rename
                        </MenuItem>
                      </Box>
                    </Menu>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {inputPopUp && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InputBase
                value={newFileName}
                onChange={onChangeNewFileName}
                sx={{
                  fontSize: "12px",
                  wordBreak: "break-word",
                  backgroundColor: "#F8F8F8",
                  border: "1.5px solid #D1D1D1",
                  borderRadius: "8px",
                  paddingLeft: "8px",
                }}
              />
              <Box>
                <Button
                  sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {/* Box 2 */}
        </Box>

        <Box style={{ flex: 1 }}>
          <Box
            style={{
              // border: "1px solid #D1D1D1",
              padding: "10px",
              height: "calc(80vh / 2 - 15px)",
              overflow: "auto",
            }}
          >
            {/* Content for the third box */}
            {/* Box 3 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "10px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#464646", // Equivalent to text-gray-700
                    fontSize: "0.8rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    fontFamily: "Roboto Slab",
                    padding: "10px",
                  }}
                >
                  Current Uploads
                </Typography>
              </Box>

              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                  backgroundColor: "#F8F8F8",
                  border: "1.5px solid #D1D1D1",
                }}
              >
                <IconButton>
                  <CiSearch fontSize="18px" />
                </IconButton>
                <InputBase
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{
                    fontFamily: "Roboto Slab",
                    fontSize: "12px",
                    padding: "4px",
                  }}
                  placeholder="Search..."
                />
              </Paper>
            </Box>

            {/* currentFiles Input */}

            

            {/* from text here */}

            {filteredFiles
              ?.map(
                (fileData, index) =>
                  fileData.fileName && (
                    <>
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#F8F8F8",
                          padding: "2px 12px 2px 12px",
                          marginTop: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          key={fileData._id}
                          variant="body1"
                          sx={{
                            color: "#464646",
                            fontSize: "0.7rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 600,
                            fontFamily: "Roboto Slab",
                          }}
                        >
                          
                          { currentFileId === fileData._id && trackCurrentReaname ? (
                            currentInputPopUp && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <InputBase
                                  value={newCurrentFileName}
                                  onChange={onChangeNewFileNameForCurrent}
                                  sx={{
                                    fontSize: "12px",
                                    wordBreak: "break-word",
                                    backgroundColor: "#F8F8F8",
                                    border: "1.5px solid #D1D1D1",
                                    borderRadius: "8px",
                                    paddingLeft: "8px",
                                  }}
                                />
                                <Box>
                                  <Button
                                    sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                                    onClick={handleSaveRenameForCurrentFiles}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                                    onClick={handleCloseCurrentPopUp}
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              </Box>
                            )
                          ) : (fileData.fileName)}
                        </Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                          <IconButton
                            sx={{ fontSize: "12px" }}
                            onClick={() =>
                              handleRenameCurrentFiles(fileData._id)
                            }
                          >
                            <FaPencil />
                          </IconButton>
                          <IconButton
                            sx={{ fontSize: "12px" }}
                            onClick={() =>
                              handleEditSelectedAsRecent(fileData._id)
                            }
                          >
                            <FaArrowUpRightFromSquare />
                          </IconButton>
                          <IconButton
                            sx={{ fontSize: "15px" }}
                            onClick={() =>
                              handleRemoveForCurrentFiles(fileData._id)
                            }
                          >
                            <MdDelete />
                          </IconButton>
                        </Box>
                      </Box>

                    </>
                  )
              )
              .reverse()}
          </Box>

          <Box
            sx={{
              height: "calc(80vh / 2 - 15px)",
              marginTop: "10px",
              overflow: "auto",
            }}
          >
            <Box
              style={{
                // border: "2px solid #000",
                padding: "10px",
                height: "fit-content", // Adjust height to fit content
                // overflow: "auto", // Add overflow auto for scrollbars if needed
              }}
            >
              {/* Content for the second box */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HistoryIcon
                  sx={{
                    color: "#718096",
                    fontFamily: "Roboto Slab",
                    fontWeight: 600,
                    padding: "4px",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#464646",
                    fontSize: "0.7rem",
                    fontFamily: "Roboto Slab",
                    fontWeight: 600,
                  }}
                >
                  Recent Sources
                </Typography>
              </Box>

              {/* {recentInputPopUp && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InputBase
                    value={newRecentFileName}
                    onChange={onChangeNewFileNameForRecent}
                    sx={{
                      fontSize: "12px",
                      wordBreak: "break-word",
                      backgroundColor: "#F8F8F8",
                      border: "1.5px solid #D1D1D1",
                      borderRadius: "6px",
                      textAlign: "center",
                      paddingLeft: "8px",
                    }}
                  />
                  <Box>
                    <Button
                      sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                      onClick={handleRenameForRecentFiles}
                    >
                      Save
                    </Button>
                    <Button
                      sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                      onClick={handleCloseRecentPopUp}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )} */}

              {recentFilesUploadedData.map((file, index) => (
                <>
                  <Box
                    key={index} // Add key prop to each iteration
                    sx={{
                      backgroundColor: "#F8F8F8",
                      padding: "2px 12px 2px 12px",
                      marginTop: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#464646",
                        fontSize: "0.7rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: "Roboto Slab",
                        fontWeight: 600,
                      }}
                    >
                      {recentFileId === file._id && trackRecentReaname  ?
                       ( recentInputPopUp && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <InputBase
                            value={newRecentFileName}
                            onChange={onChangeNewFileNameForRecent}
                            sx={{
                              fontSize: "12px",
                              wordBreak: "break-word",
                              backgroundColor: "#F8F8F8",
                              border: "1.5px solid #D1D1D1",
                              borderRadius: "6px",
                              textAlign: "center",
                              paddingLeft: "8px",
                            }}
                          />
                          <Box>
                            <Button
                              sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                              onClick={handleRenameForRecentFiles}
                            >
                              Save
                            </Button>
                            <Button
                              sx={{ fontSize: "8px", padding: "0px", minWidth: "36px" }}
                              onClick={handleCloseRecentPopUp}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      )) : (file.fileName)
                    }
                    </Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        sx={{ fontSize: "12px" }}
                        onClick={() => handleRenameRecentFiles(file._id)}
                      >
                        <FaPencil />
                      </IconButton>
                      <IconButton
                        sx={{ fontSize: "12px" }}
                        onClick={() => handleEditSelectedAsCurrent(file._id)}
                      >
                        <FaArrowUpRightFromSquare />
                      </IconButton>
                      <IconButton
                        sx={{ fontSize: "15px" }}
                        onClick={() => handleRemoveForRecentFiles(file._id)}
                      >
                        <MdDelete />
                      </IconButton>
                    </Box>
                  </Box>

                </>
              ))}
            </Box>
          </Box>
        </Box>
        {/* <HighlightOffIcon sx={{ padding: "5px", marginTop: "-10px"}}/> */}
        <Box
          sx={{
            position: "absolute", // Position the icon absolutely
            top: 0, // Align the icon to the top
            right: 0, // Align the icon to the right
            marginTop: { xs: "10px", sm: "0" }, // Adjust marginTop for mobile view
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ padding: "5px", cursor: "pointer", fontSize: "5px" }}
          >
            <HighlightOffIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button
          onClick={handleSaveFileToDB}
          sx={{
            backgroundColor: "#888888 !important",
            fontSize: "10px",
            color: "white",
          }}
        >
          Save To DB
        </Button>
        {/* <Button onClick={onClose} className={classes.closeButton}>
          Close
        </Button> */}
      </DialogActions>
    </Dialog>

    <Dialog
        open={open}
        onClose={handleCloseInputPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {/* {"Example Title?"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px" , padding: "10px"}}>Source Name</Typography>
              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "200px",
                  backgroundColor: "#F8F8F8",
                  border: "1.5px solid #D1D1D1",
                }}
              >
                <InputBase
                  value={newSourceFileName}
                  onChange={onChangeForSourceFileName}
                  sx={{
                    fontFamily: "Roboto Slab",
                    fontSize: "12px",
                    padding: "4px",
                  }}
                  placeholder="SourceName..."
                />
              </Paper>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px" , padding: "10px"}}>Description</Typography>
             
                <Textarea
                  value={sourceDescription}
                  onChange={onChangeForSourceDescription}
                  maxRows={15}
                  sx={{
                    fontFamily: "Roboto Slab",
                    marginLeft: "15px",
                    fontSize: "12px",
                    padding: "4px",
                    height: "80px", // adjust the height as needed
                    width: "200px",  // adjust the width as needed
                  }}
                  placeholder="Description..."
                />
   
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInputPopup} sx={{ fontSize: "10px" }} autoFocus>Cancel</Button>
          <Button onClick={handleSaveInputPopup} sx={{ fontSize: "10px"}} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SourceDialog;
