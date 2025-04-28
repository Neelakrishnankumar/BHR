import React, { useState, useEffect, createContext } from "react";
import {
    Autocomplete,
    CircularProgress,
    TextField,
  } from "@mui/material";
import PropTypes from "prop-types";

import axios from "axios";


import Checkbox from "@mui/material/Checkbox";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { FixedSizeList } from "react-window";

import { Select, MenuItem,   FormControl, InputLabel,  } from '@mui/material';

// Context for custom listbox
const LISTBOX_PADDING = 8; // Padding around the listbox
const OuterElementContext = createContext({});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Outer element for the listbox
const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Custom Listbox component
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};


export const Productautocomplete = ({
    value = null,
    onChange,
    url,
    height = 20,
    defaultValue,
    ...props
  }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!url) return;
        setLoading(true);
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: 
              //"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
             "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU"
            },
          });
          console.log(response,"cgheck-----------");
          const data = response.data.Data.rows || [];
          console.log(data,"cgheck-----------");
          setOptions(data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setOptions([]);
          setError("Failed to load. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  useEffect(()=>{
if(defaultValue){
  const defaultOption=options.find((option)=>option.Name ===defaultValue);
  if(defaultOption && !value){
    onChange(defaultOption);
  }
}
  },[options,defaultValue,onChange])
    return (
      <Autocomplete
        size="small"
        fullWidth
        limitTags={1}
        options={options}
        loading={loading}
        value={value}
        isOptionEqualToValue={(option, value) => option.Name === value.Name}
        onChange={(event, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option.Name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label || "Select Options"}
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    );
  };

//   function CustomAutocomplete({
//   value = [],
//   onChange,
//   url,
//   height = 20,
//   multiple = true,
//   ...props
// }) {
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false); // Control open state

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: process.env.REACT_APP_API_TOKEN,
//           },
//         });
//         setOptions(response.data.Data); // Assuming API response has a `Data` array
//       } catch (error) {
//         setOptions([]);
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   const handleChange = (event, newValue) => {
//     onChange(newValue); // Pass the updated array of selected objects
//   };

//   return (
//     <Autocomplete
//       limitTags={1}
//       multiple={multiple} // Enable multiple selections
//       size="small"
//       open={open} // Control open state
//       onOpen={() => setOpen(true)} // Open dropdown when clicking on input
//       onClose={() => setOpen(false)} // Close dropdown when clicking outside
//       fullWidth
//       options={options}
//       disableCloseOnSelect
//       disableListWrap
//       loading={loading}
//       value={value} // Pass array of selected objects
//       onChange={handleChange} // Update selected array
//       isOptionEqualToValue={(option, value) => option.Name === value.Name}
//       getOptionLabel={(option) => option.Name} // Label for each option
//       renderOption={(props, option, { selected }) => (
//         <li key={option.Name} {...props} style={{ height: height }}>
//           <Checkbox
//             icon={icon}
//             checkedIcon={checkedIcon}
//             style={{ marginRight: 8 }}
//             checked={selected} // Mark selected items
//           />
//           {option.Name}
//         </li>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={props.label || "Select Options"} // Default label
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//       {...props} // Spread the rest of the props
//     />
//   );
// }

// export default CustomAutocomplete;

export function MultiFormikTwoAutocomplete({
  value = [],
  onChange,
  url,
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ...",
          },
        });
        console.log("API Response:", response.data);
        const data = response?.data?.Data || [];
        setOptions(Array.isArray(data) ? data.map(item => ({
          ...item, ProdCatgName: item.ProdCatgName.trim()
        })) : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return (
    <Autocomplete
      sx={{ "& .MuiAutocomplete-tag": { maxWidth: "90px" } }}
      size="small"
      multiple={multiple}
      limitTags={1}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      onChange={onChange}
      options={options}
      isOptionEqualToValue={(option, value) => option?.RecordID && value?.RecordID && option.RecordID === value.RecordID}
      getOptionLabel={(option) => option?.ProdCatgName || ""}
      disableCloseOnSelect
      loading={loading}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", gap: 2, height: 50 }}>
          <Checkbox size="small" sx={{ marginLeft: -1 }} checked={selected} />
          {option.ProdCatgName}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={errors}
          helperText={helper}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
}
export function MultiFormikOptimizedAutocomplete({
  value = [],
  onChange,
  url,
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log("API Response:", response.data);
        const data = response?.data?.Data?.rows || [];  // Ensure it's always an array
        setOptions(Array.isArray(data) ? data : []);
        //setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [url]);
  
  return (
    <Autocomplete
      sx={{
        "& .MuiAutocomplete-tag": { maxWidth: "90px" },
      }}
      size="small"
      multiple={multiple}
      limitTags={1}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      onChange={onChange}
      options={options}
      isOptionEqualToValue={(option, value) => option?.RecordID === value?.RecordID}
      getOptionLabel={(option) => option?.Name || ""}
      disableCloseOnSelect
      loading={loading}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", gap: 2, height: 20 }}>
          <Checkbox size="small" sx={{ marginLeft: -1 }} checked={selected} />
          {option.Name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={errors}
          helperText={helper}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
}
// export const SingleFormikOptimizedAutocomplete = ({
//   value = null,
//   onChange = () => {},
//   url,
//   height = 20,
//   ...props
// }) => {
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
//           },
//         });
//         console.log('autocom',response);
        
//         const data = response.data.Data.rows || [];
//         setOptions(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // setOptions();
//         setError("Failed to load. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return (
//     <Autocomplete
//       size="small"
//       limitTags={1}
//       fullWidth
//       options={options}
//       loading={loading}
//       value={value}
      
//       isOptionEqualToValue={(option, value) => option.RecordID === value.RecordID}
//       onChange={onChange}
//       getOptionLabel={(option) => `${option.Name}`}
//       ListboxComponent={ListboxComponent} // Custom listbox component
//       renderInput={(params) => (
//         <TextField
//         variant="filled"
//         focused
//           {...params}
//           label={props.label || "Select Options"}
//           error={!!error}
//           helperText={error}
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//       {...props}
//     />
//   );
// };
 

export const SingleFormikOptimizedAutocomplete = ({
  value = null,
  onChange = () => {},
  url,
  height = 20,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log("autocom", response);

        const data = response.data.Data.rows || [];
        console.log(data, "--data");
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setOptions();
        // setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      // size="small"
      limitTags={1}
      fullWidth
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) =>
        option.RecordID === value.RecordID
      }
      onChange={onChange}
      getOptionLabel={(option) => `${option.Code} || ${option.Name}`}
      ListboxComponent={ListboxComponent} // Custom listbox component
      renderInput={(params) => (
        <TextField
          variant="standard"
          focused
          {...params}
          label={props.label || "Select Options"}
          error={!!error}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

  export const FormikProductautocomplete = ({
    value = null,
    onChange = () => {},
    url,
    height = 20,
    ...props
  }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.get(url, {
    //         headers: {
    //           Authorization: process.env.REACT_APP_API_TOKEN,
    //         },
    //       });
    //       setOptions(response.data.Data || []); // Assuming API response has `Data` array
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //       setOptions([]);
    //       setError("Failed to load. Please try again.");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchData();
    // }, [url]);
    useEffect(() => {
      const fetchData = async () => {
        if (!url) return;
        setLoading(true);
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
            },
          });
          const data = response.data.Data.rows || [];
          setOptions(data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setOptions([]);
          setError("Failed to load. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
    return (
      <Autocomplete
        size="small"
        limitTags={1}
        fullWidth
        options={options}
        loading={loading}
        value={value}
        // isOptionEqualToValue={(option, value) => option.Name === value.Name}
        onChange={onChange}
        // getOptionLabel={(option) => option.Name}
        isOptionEqualToValue={(option, value) => option.Name === value.Name}
        // onChange={(event, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option.Name}
        ListboxComponent={ListboxComponent} // Custom listbox component
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label || "Select Options"}
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    );
  };

  
export const Employeeautocomplete = ({
  value = null,
  onChange,
  url,
  height = 20,
  defaultValue,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setOptions([]);
        setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
//   useEffect(()=>{
// if(defaultValue){
//   const defaultOption=options.find((option)=>option.Name ===defaultValue);
//   if(defaultOption && !value){
//     onChange(defaultOption);
//   }
// }
//   },[options,defaultValue,onChange])
  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) => option.Name === value.Name}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.Name}
      renderInput={(params) => (
        <TextField
        focused
          variant="standard"
          {...params}
          label={props.label || "Select Options"}
          error={!!error}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};
