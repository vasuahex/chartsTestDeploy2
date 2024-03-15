// "use client"
// import {
//   Box,
//   Chip,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Typography,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { useEffect, useState } from "react";
// import { DrawScatterPlot } from "../../charts/ScatteredPlot";
// import { DrawAreaChart } from "../../charts/AreaChart/index";
// import AreaChartStyles from "../../charts/AreaChart/styles.json";
// import columnChartStyles from "../../charts/ColumnChart/styles.json";
// import { drawColumnChart } from "../../charts/ColumnChart/index";
// import { DrawPieChart } from "../../charts/PieChart/index";
// import { DrawMultiLineChart } from "../../charts/MultiLineChart";
// import { DrawCalendarChart } from "../../charts/CalendarChart/index";
// import scatterPlotStyles from "../../charts/ScatteredPlot/styles.json";
// import pieChartStyles from "../../charts/PieChart/styles.json";
// import multiLineChartStyles from "../../charts/MultiLineChart/styles.json";
// import { useParams } from "next/navigation";
// import {
//   getCodeFromDB,
//   saveCodeToDB,
// } from "../../libs/db";
// import { useAppDispatch } from "../../libs/redux/redux-hooks";
// import { chartConfigSliceActions } from "../../libs/redux/slices/chartConfigSlice";

// interface IDataCompoennt {
//   data?: any;
// }
// interface XDataEntry {
//   [key: string]: string[];
// }

// interface YDataEntry {
//   [key: string]: string[];
// }

// const useStyles = makeStyles({
//   container: {
//     transition: "margin-left 0.3s",
//     overscrollBehavior: "contain",
//     margin: 0,
//     scrollbarWidth: "thin",
//     scrollbarColor: "#808080 transparent",
//     "&::-webkit-scrollbar": {
//       width: "5px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#808080",
//       borderRadius: "5px",
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "transparent",
//     },
//   },
//   optionsContainer: {
//     padding: 20,
//   },
// });

// const DataComponent: React.FC<IDataCompoennt> = ({ data }) => {
//   const classes = useStyles();
//   const {id} = useParams();
//   const dispatch = useAppDispatch();
//   const [defaultData, setDefaultData] = useState(data);

//   const allKeys = Array.from(
//     new Set(data?.data?.flatMap((item: any) => Object.keys(item)))
//   );
//   const [xValue, setXValue] = useState<any>("genre" || "name" || []);
//   const [yValue, setYValue] = useState<any>("na_sales" || "value" || []);
//   const [dropData, setDropData] = useState<any>();
//   const defaultDataLength = defaultData?.data && defaultData?.data?.length;
//   const defaultDataColumns = defaultData?.data[defaultDataLength - 1];
//   const [selectedFilterOption, setSelectedFilterOption] = useState<any>("");
//   const [getFValues, setGetFValues] = useState<any>();
//   const [getFilterValues, setGetFilterValues] = useState<any>();
//   const [selectYValue, setSelectedYValue] = useState<any>();
//   const [keysXArray, setKeysXArray] = useState<any[]>([]);
//   const [keysYArray, setKeysYArray] = useState<any[]>([]);
//   const [valuesXArray, setValuesXArray] = useState<any>([]);
//   const [valuesYArray, setValuesYArray] = useState<any>([]);

//   useEffect(() => {
//     const newData = { ...data };
//     newData.data = [...newData.data, { columns: allKeys }];

//     setDefaultData(newData);
//   }, [id, data]);

//   useEffect(() => {
//     getCodeFromDB("selected-FilteredAxis")
//       .then((yAxis: any) => {
//         if (yAxis) {
//           const uniqueYValuesSet = new Set(yAxis);

//           const uniqueYValuesArray = Array.from(uniqueYValuesSet);
//           setGetFilterValues(uniqueYValuesArray);
//         } else {
//           console.log("Code not found for the given id:", id);
//         }
//       })
//       .catch((error) => {
//         console.error("Error retrieving code from IndexedDB:", error);
//       });
//   }, [selectedFilterOption, id, getFValues]);

//   const handleChange = (event: any) => {
//     setSelectedFilterOption(event.target.value);
//   };

//   const handleYValueChange = (event: any) => {
//     setSelectedYValue(event.target.value);
//   };

//   const Filteroptions = [
//     { value: "in", label: "in" },
//     { value: "=", label: "Equal to(=)" },
//     { value: "#", label: "Not equal to(#)" },
//     { value: "<", label: "Less than(<)" },
//     { value: "<=", label: "Less or Equal(<=)" },
//     { value: ">", label: "Greater than(>)" },
//     { value: ">=", label: "Greater or Equal(>=)" },
//     { value: "not", label: "Not in", disabled: true },
//   ];

//   const handleXAxisChange = (event: SelectChangeEvent<any>) => {
//     const {
//       target: { value },
//     } = event;
//     const removedKey = keysXArray.find((key) => !value.includes(key));

//     if (removedKey) {
//       setKeysXArray(value)
//       const updatedValuesArray = valuesXArray.filter(
//         (entry: any) => Object.keys(entry)[0] !== removedKey
//       );
//       setValuesXArray(updatedValuesArray);
//     } else {
//       const key = value[value.length - 1];
//       keysXArray.push(key);
//       let columnValues;
//       if (dropData?.length > 0) {
//         columnValues = dropData?.map((val: any) => val[key]);
//       } else {
//         columnValues = defaultData?.data?.map((val: any) => val[key]);
//       }
//       valuesXArray.push({ [key]: columnValues });
//       setValuesXArray(valuesXArray);
//       const updatedXAxis = [...xValue, key];
//       setXValue(updatedXAxis);
//       dispatch(chartConfigSliceActions.setKeysXArray(keysXArray));
//     }
//   };

//   const handleYAxisChange = (event: SelectChangeEvent<any>) => {
//     const {
//       target: { value },
//     } = event;

//     value.forEach(async (newKey: string) => {
//       const removedKey = keysYArray.find((key) => !value.includes(key));
//       if (removedKey) {
//         setKeysYArray(value)
//         const updatedValuesArray = valuesYArray.filter(
//           (entry: any) => Object.keys(entry)[0] !== removedKey
//         );
//         setValuesYArray(updatedValuesArray);
//       } else {
//         const updatedKeysArray = [...keysYArray, newKey];
//         setKeysYArray(updatedKeysArray);
//         let columnValues;
//         if (dropData?.length > 0) {
//           columnValues = dropData?.map((val: any) => val[newKey]);
//         } else {
//           columnValues = defaultData?.data?.map((val: any) => val[newKey]);
//         }

//         const updatedValuesArray = [...valuesYArray, { [newKey]: columnValues }];
//         setValuesYArray(updatedValuesArray);

//         const updatedYAxis = [...yValue, newKey];
//         setYValue(updatedYAxis);
//         dispatch(chartConfigSliceActions.setKeysYArray(updatedKeysArray));
//       }
//     }
//     );
//   };

//   const handleFilterChange = async (event: SelectChangeEvent<any>) => {
//     if (defaultData && defaultData.data) {
//       const selectedColumn = event.target.value;
//       const columnValues = defaultData.data.map(
//         (val: any) => val[selectedColumn]
//       );
//       const filteredColumnValues = columnValues.filter(
//         (value: any) => value !== undefined
//       );
//       setGetFValues(filteredColumnValues);
//       await saveCodeToDB("selected-FilteredAxis", filteredColumnValues);
//     }
//     const selectedColumn = event.target.value;
//     const columnValues = dropData?.map((val: any) => val[selectedColumn]);
//     setGetFValues(columnValues);
//     await saveCodeToDB("selected-FilteredAxis", columnValues);
//   };

//   const renderChart = (dataToRender: any) => {
//     try {
//       if (id === "area-chart") {
//         const options = {
//           id: id,
//           dimension: keysXArray,
//           measures: keysYArray,
//           filterValues: getFValues,
//           filters: [selectedFilterOption, selectYValue],
//         };
//         DrawAreaChart(options, dataToRender, AreaChartStyles);
//       } else if (id === "column-chart") {
//         const options = {
//           id: id,
//           dimension: keysXArray,
//           measures: keysYArray,
//           filterValues: getFValues,
//           filters: [selectedFilterOption, selectYValue],
//         };
//         drawColumnChart(options, dataToRender, columnChartStyles);
//       } else if (id === "scatter-plot") {
//         const options = {
//           id: id,
//           dimension: keysXArray,
//           measures: keysYArray,
//           filterValues: getFValues,
//           filters: [selectedFilterOption, selectYValue],
//         };
//         DrawScatterPlot(options, dataToRender, scatterPlotStyles);
//       } else if (id === "pie-chart") {
//         const seletctedXAixsPie = keysXArray.map((item: any) => ({
//           name: item,
//           hidden: false,
//         }));
//         const options = {
//           id: id,
//           dimension: seletctedXAixsPie,
//           measures: keysYArray,
//           filters: [],
//         };
//         DrawPieChart(options, dataToRender, pieChartStyles);
//       } else if (id === "multi-line-chart") {
//         const options = {
//           id: id,
//           dimension: keysXArray,
//           measures: keysYArray,
//           filters: [],
//         };
//         DrawMultiLineChart(options, dataToRender, multiLineChartStyles);
//       } else if (id === "calendar-chart") {
//         DrawCalendarChart(id, dataToRender);
//       }
//     } catch (error) {
//       console.error("Error rendering chart:", error);
//     }
//   };

//   useEffect(() => {
//     getCodeFromDB("SourceData")
//       .then((code) => {
//         if (code) {
//           setDropData(code);
//           setKeysXArray([])
//           setKeysYArray([])
//         } else {
//           console.log("Code not found for the given id:", id);
//         }
//       })
//       .catch((error) => {
//         console.error("Error retrieving code from IndexedDB:", error);
//       });
//   }, [id]);

//   useEffect(() => {
//     const DataToSend = {
//       xData: valuesXArray,
//       yData: valuesYArray,
//     };
//     const transformData = (xData: XDataEntry[], yData: YDataEntry[]) => {
//       const transformedData: any[] = [];
//       xData.forEach((xEntry) => {
//         for (let i = 0; i < xEntry[Object.keys(xEntry)[0]]?.length; i++) {
//           const combinedData: any = {};
//           Object.keys(xEntry).forEach((dimension) => {
//             combinedData[dimension] = xEntry[dimension][i];
//           });
//           yData.forEach((yObj) => {
//             const measure = Object.keys(yObj)[0];
//             const measureValues = yObj[measure];
//             if (measureValues && measureValues[i] !== undefined) {
//               combinedData[measure] = measureValues[i];
//             }
//           });
//           if (
//             Object.values(combinedData).every((value) => value !== undefined)
//           ) {
//             transformedData.push(combinedData);
//           }
//         }
//       });

//       return transformedData;
//     };
//     const transformedData = transformData(
//       DataToSend.xData,
//       DataToSend.yData
//     );

//     renderChart(transformedData);
//   }, [
//     id,
//     keysXArray,
//     keysYArray,
//     valuesXArray,
//     valuesYArray,
//     selectedFilterOption,
//     selectYValue,
//     getFValues,
//     yValue,
//     xValue,
//   ]);

//   return (
//     <Box className={classes.container}>
//       <Grid container className={classes.optionsContainer}>
//         <Grid item xs={6}>
//           <Typography fontSize={13}>Dimensions</Typography>
//         </Grid>
//         <Grid item xs={6}>
//           {dropData && dropData.columns ? (
//             <Grid item textAlign="right" mr={0}>
//               <Select
//                 multiple
//                 value={keysXArray}
//                 onChange={handleXAxisChange}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((value:any) => (
//                       <Chip key={value} label={value} sx={{ height: "20px" }} />
//                     ))}
//                   </Box>
//                 )}
//                 variant="outlined"
//                 size="small"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 sx={{ font: "12px", height: 30, width: "120px" }}
//               >
//                 {dropData.columns.map((item: string, i: number) => (
//                   <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           ) : (
//             <Grid item textAlign="right" mr={0}>
//               <Select
//                 multiple
//                 value={keysXArray}
//                 onChange={handleXAxisChange}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((value:any) => (
//                       <Chip key={value} label={value} />
//                     ))}
//                   </Box>
//                 )}
//                 variant="outlined"
//                 size="small"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 sx={{ font: "12px", height: 35, width: "120px" }}
//               >
//                 {defaultDataColumns?.columns?.map((item: string, i: number) => (
//                   <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           )}
//         </Grid>
//       </Grid>
//       <Grid container className={classes.optionsContainer} >
//         <Grid item xs={6}>
//           <Typography fontSize={13} variant="body1" component="p">
//             Measures
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           {dropData && dropData?.columns ? (
//             <Grid item textAlign="right" mr={0}>
//               <Select
//                 multiple
//                 value={keysYArray}
//                 onChange={handleYAxisChange}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((value:any) => (
//                       <Chip key={value} label={value} sx={{ height: "20px" }} />
//                     ))}
//                   </Box>
//                 )}
//                 variant="outlined"
//                 size="small"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 sx={{
//                   font: "12px",
//                   // height: "auto",
//                   minHeight: 50,
//                   width: "120px",
//                 }}
//               >
//                 {dropData?.columns.map((item: string, i: number) => (
//                   <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           ) : (
//             <Grid item textAlign="right">
//               <Select
//                 multiple
//                 value={keysYArray}
//                 onChange={handleYAxisChange}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((value:any) => (
//                       <Chip key={value} label={value} sx={{ height: "20px" }}/>
//                     ))}
//                   </Box>
//                 )}
//                 variant="outlined"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 size="small"
//                 sx={{ font: "12px", width: "120px" }}
//               >
//                 {defaultDataColumns?.columns?.map((item: string, i: number) => (
//                   <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           )}
//         </Grid>
//       </Grid>
//       <Grid container className={classes.optionsContainer}>
//         <Grid item xs={6}>
//           <Typography fontSize={13}>Filters</Typography>
//         </Grid>

//         <Grid item xs={6} textAlign="right">
//           <FormControl sx={{ mb: 1 }}>
//             {dropData && dropData?.columns ? (
//               <Select
//                 value={getFValues}
//                 // style={{ marginTop: "10px" }}
//                 onChange={handleFilterChange}
//                 labelId="filter-label"
//                 id="filtefvesdr"
//                 // label="Select a filter"
//                 variant="outlined"
//                 size="small"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 sx={{ font: "12px", height: 30, width: "120px" }}
//               >
//                 {dropData?.columns?.map((option: any) => (
//                   <MenuItem
//                     key={option}
//                     value={option}
//                     sx={{ fontSize: "12px" }}
//                   >
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             ) : (
//               <Select
//                 value={getFValues}
//                 // style={{ marginTop: "10px" }}
//                 onChange={handleFilterChange}
//                 labelId="filter-label"
//                 id="filtefvesdr"
//                 // label="Select a filter"
//                 variant="outlined"
//                 inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//                 size="small"
//                 sx={{ font: "12px", height: 30, width: "120px" }}
//               >
//                 {defaultDataColumns?.columns?.map((option: any) => (
//                   <MenuItem
//                     key={option}
//                     value={option}
//                     sx={{ fontSize: "12px" }}
//                   >
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           </FormControl>
//           <FormControl sx={{ my: 1 }}>
//             <InputLabel
//               id="filter-label"
//               size="small"
//               variant="outlined"
//               sx={{ fontSize: "13px" }}
//             >
//               Select a filter
//             </InputLabel>
//             <Select
//               value={selectedFilterOption}
//               onChange={handleChange}
//               labelId="filter-label"
//               id="filter"
//               label="Select a filter"
//               variant="outlined"
//               size="small"
//               inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//               sx={{ font: "8px", height: 30, width: "120px" }}
//             >
//               {Filteroptions?.map((option: any) => (
//                 <MenuItem
//                   key={option.value}
//                   value={option.value}
//                   disabled={option.disabled}
//                   sx={{ fontSize: "12px" }}
//                 >
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ mt: 1 }}>
//             <Select
//               value={selectYValue}
//               // style={{ marginTop: "10px" }}
//               onChange={handleYValueChange}
//               variant="outlined"
//               size="small"
//               inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
//               sx={{ font: "12px", height: 30, width: "120px" }}
//               // labelId="filter-label"
//               // id="filter"
//             >
//               {getFilterValues?.map((option: any) => (
//                 <MenuItem key={option} value={option} sx={{ fontSize: "12px" }}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DataComponent;

"use client";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { DrawScatterPlot } from "../../charts/ScatteredPlot";
import { DrawAreaChart } from "../../charts/AreaChart/index";
import AreaChartStyles from "../../charts/AreaChart/styles.json";
import columnChartStyles from "../../charts/ColumnChart/styles.json";
import { drawColumnChart } from "../../charts/ColumnChart/index";
import { DrawPieChart } from "../../charts/PieChart/index";
import { DrawMultiLineChart } from "../../charts/MultiLineChart";
// import { DrawCalendarChart } from "../../charts/CalendarChart/index";
// import { DrawRadarChart } from "../../charts/RadarChart/index"
import { DrawCalendarChart } from "../../charts/CalendarChart";
import { DrawGraphPlotChart } from "../../charts/GraphPlotChart";
import calendarChartStyles from "../../charts/CalendarChart/styles.json";
import graphChartStyles from "../../charts/GraphPlotChart/styles.json";
import scatterPlotStyles from "../../charts/ScatteredPlot/styles.json";
import pieChartStyles from "../../charts/PieChart/styles.json";
import multiLineChartStyles from "../../charts/MultiLineChart/styles.json";
// import radarChartStyles from "../../charts/RadarChart/styles.json"
import { useParams } from "next/navigation";
import { getCodeFromDB, saveCodeToDB } from "../../libs/db";
import { useAppDispatch, useAppSelector } from "../../libs/redux/redux-hooks";
import { chartConfigSliceActions } from "../../libs/redux/slices/chartConfigSlice";
import { FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from '@mui/material/Tooltip';
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";

interface IDataComponent {
  data?: any;
}

interface XDataEntry {
  [key: string]: string[];
}

interface YDataEntry {
  [key: string]: string[];
}

const useStyles = makeStyles({
  container: {
    transition: "margin-left 0.3s",
    overscrollBehavior: "contain",
    margin: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "#808080 transparent",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#808080",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
  optionsContainer: {
    padding: 20,
  },
});

const DataComponent: React.FC<IDataComponent> = ({ data }) => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [defaultData, setDefaultData] = useState(data);

  const allKeys = Array.from(
    new Set(data?.data?.flatMap((item: any) => Object.keys(item)))
  );
  const storedXArray = useAppSelector((state) => state.chartConfig.keysXArray);
  const storedYArray = useAppSelector((state) => state.chartConfig.keysYArray);
  // const currentSourceData=useAppSelector((state) => state.currentSource.data); 
  // const currentSourceFileName=useAppSelector((state) => state.currentSource.fileName); 
  
  const [xValue, setXValue] = useState<any>(["genre"]);
  const [yValue, setYValue] = useState<any>(["na_sales"]);
  const [dropData, setDropData] = useState<any>();
  const defaultDataLength = defaultData?.data && defaultData?.data?.length;
  const defaultDataColumns = defaultData?.data[defaultDataLength - 1];
  const [selectedFilterOption, setSelectedFilterOption] = useState<any>("");
  const [getFValues, setGetFValues] = useState<any>();
  const [getFilterValues, setGetFilterValues] = useState<any>();
  const [selectYValue, setSelectedYValue] = useState<any>();
  const [keysXArray, setKeysXArray] = useState<any[]>(["genre"]);
  const [keysYArray, setKeysYArray] = useState<any[]>(["na_sales"]);
  const [valuesXArray, setValuesXArray] = useState<any>([]);
  const [valuesYArray, setValuesYArray] = useState<any>([]);
  const [numericKeys,setNumericKeys]=useState<string[]>([]);
  const [alphabeticKeys,setAlphabeticKeys]=useState<string[]>([]);
  const [fileName,setFileName]=useState<string>("");


  useEffect(() => {
    setKeysXArray(storedXArray)
    setKeysYArray(storedYArray);
  }, [id])

  // let numericKeys: string[] = [];
  // let alphabeticKeys: string[] = [];

  const isNumeric = (defaultData: any) => {
    defaultData?.forEach((item: any) => {
      Object.entries(item).forEach(([key, value]: any) => {
        // Try to convert the value to a number
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          // If the value is a valid number, add it to numericKeys
          if (!numericKeys.includes(key)) {
            numericKeys.push(key);
          }
        } else if (typeof value === "string" && !alphabeticKeys.includes(key)) {
          // If it's a string, add to alphabeticKeys
          alphabeticKeys.push(key);
        }
      });
    });
  };

  // Assuming defaultData is your original data object
  if (dropData) {
    // isNumeric(dropData);

  } else {
    isNumeric(defaultData?.data);
  }

  useEffect(() => {
    if (id !== "no-chart") {  
      const newData = { ...data };
      newData.data = [...newData.data, { columns: allKeys }];

      setDefaultData(newData);
    }
  }, [id, data]);

  useEffect(() => {
    getCodeFromDB("selected-FilteredAxis")
      .then((yAxis: any) => {
        if (yAxis) {
          const uniqueYValuesSet = new Set(yAxis);

          const uniqueYValuesArray = Array.from(uniqueYValuesSet);
          setGetFilterValues(uniqueYValuesArray);
        } else {
          console.log("Code not found for the given id:", id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, [selectedFilterOption, id, getFValues]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;
    if (checked && keysXArray.length > 0) {
      toast.error("Please select only one dimesion");
    } else if (checked) {
      setKeysXArray((prevKeys) => [...prevKeys, name]);
    } else {
      setKeysXArray((prevKeys) => prevKeys.filter((key) => key !== name));
    }
  };

  const handleYCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;
    if (checked) {
      setKeysYArray((prevKeys) => [...prevKeys, name]);
    } else {
      setKeysYArray((prevKeys) => prevKeys.filter((key) => key !== name));
    }
  };

  useEffect(() => {
    if (dropData?.length > 0) {
      if (keysXArray?.length > 0) {
        const filteredXValues = keysXArray.map((key) => ({
          [key]: dropData
            .map((value: any) => value[key])
            .filter((v: any) => v !== undefined),
        }));
        setValuesXArray(filteredXValues);
      }
      if (keysYArray?.length > 0) {
        const filteredYValues = keysYArray.map((key) => ({
          [key]: dropData
            .map((value: any) => value[key])
            .filter((v: any) => v !== undefined),
        }));
        setValuesYArray(filteredYValues);
      }
    } else {
      if (keysXArray?.length > 0) {
        const filteredXValues = keysXArray.map((key) => ({
          [key]: defaultData?.data
            ?.map((value: any) => value[key])
            .filter((v: any) => v !== undefined),
        }));
        setValuesXArray(filteredXValues);
      }
      if (keysYArray?.length > 0) {
        const filteredYValues = keysYArray.map((key) => ({
          [key]: defaultData?.data
            ?.map((value: any) => value[key])
            .filter((v: any) => v !== undefined),
        }));
        setValuesYArray(filteredYValues);
      }
    }
    dispatch(chartConfigSliceActions.setKeysXArray(keysXArray));
    dispatch(chartConfigSliceActions.setKeysYArray(keysYArray));
  }, [keysXArray, keysYArray, dropData, defaultData]);


  const renderChart = (dataToRender: any) => {
    try {
      if (id === "area-chart") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        DrawAreaChart(options, dataToRender, AreaChartStyles);
      } else if (id === "column-chart") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        drawColumnChart(options, dataToRender, columnChartStyles);
      } else if (id === "scatter-plot") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        DrawScatterPlot(options, dataToRender, scatterPlotStyles);
      } else if (id === "pie-chart") {
        const seletctedXAixsPie = keysXArray.map((item: any) => ({
          name: item,
          hidden: false,
        }));
        const options = {
          id: id,
          dimension: seletctedXAixsPie,
          measures: keysYArray,
          filters: [],
        };
        const pieChartData= dataToRender.map((item:any)=>({
          ...item,
          hidden: false,
        }))
        DrawPieChart(options, pieChartData, pieChartStyles);
      } else if (id === "multi-line-chart") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filters: [],
        };
        DrawMultiLineChart(options, dataToRender, multiLineChartStyles);
      } else if (id === "calendar-chart") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filters: [],
        };
        console.log("options", options);
        DrawCalendarChart(options, dataToRender, calendarChartStyles);
      } else if (id === "graph-plot-chart") {
        const options = {
          id: id,
          dimension: keysXArray,
          measures: keysYArray,
          filters: [],
        };
        console.log("options", options);
        DrawGraphPlotChart(options, dataToRender, graphChartStyles);
      }
      //  else if (id === "radar-chart") {
      //   const options = {
      //     id: id,
      //     dimension: keysXArray,
      //     measures: keysYArray,
      //     filters: [],
      //   };
      //   DrawRadarChart(options, dataToRender, radarChartStyles); 

      // }
    } catch (error) {
      console.error("Error rendering chart:", error);
    }
  };

  useEffect(() => {
    getCodeFromDB("SourceData")
      .then((code) => {
        if (code) {
          setDropData(code);
          setKeysXArray([]);
          setKeysYArray([]);
        } else {
          console.log("Code not found for the given id:", id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, [id]);

  useEffect(() => {
    const DataToSend = {
      xData: valuesXArray,
      yData: valuesYArray,
    };
    const transformData = (xData: XDataEntry[], yData: YDataEntry[]) => {
      const transformedData: any[] = [];
      xData.forEach((xEntry) => {
        for (let i = 0; i < xEntry[Object.keys(xEntry)[0]]?.length; i++) {
          const combinedData: any = {};
          Object.keys(xEntry).forEach((dimension) => {
            combinedData[dimension] = xEntry[dimension][i];
          });
          yData.forEach((yObj) => {
            const measure = Object.keys(yObj)[0];
            const measureValues = yObj[measure];
            if (measureValues && measureValues[i] !== undefined) {
              combinedData[measure] = measureValues[i];
            }
          });
          if (
            Object.values(combinedData).every((value) => value !== undefined)
          ) {
            transformedData.push(combinedData);
          }
        }
      });

      return transformedData;
    };
    const transformedData = transformData(DataToSend.xData, DataToSend.yData);

    renderChart(transformedData);
  }, [
    id,
    keysXArray,
    keysYArray,
    valuesXArray,
    valuesYArray,
    selectedFilterOption,
    selectYValue,
    getFValues,
    yValue,
    xValue,
    numericKeys,
    alphabeticKeys,
  ]);

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const handleChanges = (
    event: React.ChangeEvent<{ value: unknown }>,
    selected: string | string[]
  ) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    setSelectedColumns(selectedArray);
  };

  const getAllDimensionsAndMeasures = async () => {
    try {
      const res = await fetch("/api/getXandYkeys", {
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
      }else{
        const responseData = await res.json();
        setFileName(responseData.fileName);
        setAlphabeticKeys(responseData.dimensions);
        setNumericKeys(responseData.measures)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(dropData){
      getAllDimensionsAndMeasures()
    }
  },[dropData])

  return (
    <Box className={classes.container}>
      

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dimensions-content"
          id="dimensions-header"
        >
          <Typography fontSize={14}>Source</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Tooltip title="Please go to source in profile to update the file">
            <p style={{ textAlign: "center" }}>{fileName.length>20 ? `${fileName.substring(0, 30)}...`:fileName  }</p>
          </Tooltip>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dimensions-content"
          id="dimensions-header"
        >
          <Typography fontSize={14}>Dimensions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            // (dropData && dropData.columns
            //   ? dropData.columns
            //   : defaultDataColumns?.columns
            // )
            alphabeticKeys?.map((item: string, i: number) => (
              <div
                style={{
                  display: "flex",
                  margin: "0",
                  flexDirection: "column",
                }}
                key={i}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={
                        keysXArray.length > 0 && !keysXArray.includes(item)
                      }
                      name={item}
                      checked={keysXArray.includes(item)}
                      onChange={handleCheckboxChange}
                      style={{ marginLeft: "10px" }}
                    />
                  }
                  label={<span style={{ fontSize: "14px" }}>{item}</span>}
                />
              </div>
            ))
          }
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="measures-content"
          id="measures-header"
        >
          <Typography fontSize={14} variant="body1" component="p">
            Measures
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {dropData && dropData?.columns ? (
            <FormGroup>
              {
                //dropData.columns
                numericKeys?.map((item: string, i: number) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        name={item}
                        checked={keysYArray.includes(item)}
                        onChange={handleYCheckboxChange}
                        style={{ marginLeft: "10px" }}
                      />
                    }
                    label={<span style={{ fontSize: "14px" }}>{item}</span>}
                  />
                ))
              }
            </FormGroup>
          ) : (
            <FormGroup>
              {
                //defaultDataColumns?.columns?
                numericKeys?.map((item: string, i: number) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        name={item}
                        checked={keysYArray.includes(item)}
                        onChange={handleYCheckboxChange}
                        style={{ marginLeft: "10px" }}
                      />
                    }
                    label={<span style={{ fontSize: "14px" }}>{item}</span>}
                  />
                ))}
            </FormGroup>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filters-content"
          id="filters-header"
        >
          <Typography fontSize={14}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Placeholder content for Filters */}
          <Typography>filter</Typography>
        </AccordionDetails>
      </Accordion>

      <Grid item xs={6} textAlign="right">
        {/* <FormControl sx={{ mb: 1 }}>
                        {dropData && dropData?.columns ? (
                            <Select
                                value={getFValues}
                                // style={{ marginTop: "10px" }}
                                onChange={handleFilterChange}
                                labelId="filter-label"
                                id="filtefvesdr"
                                // label="Select a filter"
                                variant="outlined"
                                size="small"
                                inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                                sx={{ font: "12px", height: 30, width: "120px" }}
                            >
                                {dropData?.columns?.map((option: any) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                        sx={{ fontSize: "12px" }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <Select
                                value={getFValues}
                                // style={{ marginTop: "10px" }}
                                onChange={handleFilterChange}
                                labelId="filter-label"
                                id="filtefvesdr"
                                // label="Select a filter"
                                variant="outlined"
                                inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                                sx={{ font: "12px", height: 30, width: "120px" }}
                            >
                                {defaultDataColumns?.columns?.map((option: any) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                        sx={{ fontSize: "12px" }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </FormControl> */}
      </Grid>

      {/* <Grid item xs={6}>
                    <FormControl sx={{ mb: 1 }}>
                        <InputLabel id="y-axis-label">Select Y-Axis</InputLabel>
                        <Select
                            labelId="y-axis-label"
                            id="y-axis"
                            value={selectYValue}
                            onChange={handleYAxisChange}
                            label="Select Y-Axis"
                            variant="outlined"
                            size="small"
                            inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                            sx={{ font: "12px", height: 30, width: "120px" }}
                        >
                            {dropData?.columns?.map((option: any) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    sx={{ fontSize: "12px" }}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> */}
    </Box>
  );
};
export default DataComponent;
