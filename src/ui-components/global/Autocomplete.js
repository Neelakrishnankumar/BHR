import React, { useState, useEffect, createContext } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import PropTypes from "prop-types";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

import Checkbox from "@mui/material/Checkbox";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { FixedSizeList } from "react-window";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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
const ListboxComponent = React.forwardRef(
  function ListboxComponent(props, ref) {},
);

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
  // console.log(options, "Productautocomplete auto options");
  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              //"eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log(response, "cgheck-----------");
        const data = response.data.Data.rows || [];
        console.log(data, "cgheck-----------");
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
  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.Name === defaultValue,
      );
      if (defaultOption && !value) {
        onChange(defaultOption);
      }
    }
  }, [options, defaultValue, onChange]);
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
          focused
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
export const CheckinAutocomplete = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

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
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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
//ITEM - HSN CATEGORY
export const HSNCategoryAutocomplete = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) =>
        option.HSNCategory === value.HSNCategory
      }
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.HSNCategory}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || "Select Options"}
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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

//ITEM - HSN MASTER
export const HSNMasterAutocomplete = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) =>
        option.HSNMaster === value.HSNMaster
      }
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.HSNMaster}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || "Select Options"}
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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
export const OrderItemAutocomplete = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      //isOptionEqualToValue={(option, value) => option.Name === value.Name && option.Price === value.Price}
      isOptionEqualToValue={(option, value) =>
        option.RecordID === value.RecordID
      }
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => (option ? `${option.Name}` : "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || "Select Options"}
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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
//For Levels
export const ProductautocompleteLevel = ({
  value = null,
  onChange,
  url,
  height = 20,
  defaultValue,
  payload = {},
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(options, "auto options");

  const fetchData = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      console.log(response, "check response");
      // const rawData = response?.data?.Data;
      // const data = Array.isArray(rawData) ? rawData : [];
      const data = response?.data?.Data || [];
      console.log(data, "data response");

      setOptions(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setOptions([]);
      setError("Failed to load. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, payload.EmployeeID, payload.Level]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.Name === defaultValue,
      );
      if (defaultOption && !value) {
        onChange(defaultOption);
      }
    }
  }, [options, defaultValue, onChange]);

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
          {...props}
          variant="standard"
          focused
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

//  export const CheckinAutocomplete = ({
//     value = null,
//     onChange,
//     url,
//     height = 20,
//     defaultValue,
//     ...props
//   }) => {
//     const [options, setOptions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       const fetchData = async () => {
//         if (!url) return;
//         setLoading(true);
//         try {
//           const response = await axios.get(url, {
//             headers: {
//               Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
//             },
//           });
//           const data = response.data.Data.rows || [];
//           setOptions(data);
//         } catch (err) {
//           setOptions([]);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, [url]);

//     return (
//       <Autocomplete
//         size="small"
//         fullWidth
//         limitTags={1}
//         options={options}
//         loading={loading}
//         value={value}
//         isOptionEqualToValue={(option, value) => option.Name === value.Name}
//         onChange={(event, newValue) => onChange(newValue)}
//         getOptionLabel={(option) => option.Name}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={props.label || "Select Options"}
//             // error={!!error}
//             // helperText={error}
//             {...props}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//         {...props}
//       />
//     );
//   };

//For Levels
// export const ProductautocompleteLevel = ({
//   value = null,
//   onChange,
//   url,
//   height = 20,
//   defaultValue,
//   payload = {}, // 👈 Accept payload as a prop
//   ...props
// }) => {
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
// console.log(options, "auto options");

//   const fetchData = async () => {
//     if (!url) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         url,
//         payload,
//         {
//           headers: {
//               Authorization:
//              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU"
//             },
//         }
//       );
//           console.log(response,"check response");

//       const data = response?.data?.Data || [];
//                 console.log(data,"data response");

//       setOptions(data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setOptions([]);
//       setError("Failed to load. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   useEffect(() => {
//     if (defaultValue) {
//       const defaultOption = options.find((option) => option.Name === defaultValue);
//       if (defaultOption && !value) {
//         onChange(defaultOption);
//       }
//     }
//   }, [options, defaultValue, onChange]);

//   return (
//     <Autocomplete
//       size="small"
//       fullWidth
//       limitTags={1}
//       options={options}
//       loading={loading}
//       value={value}
//       isOptionEqualToValue={(option, value) => option.Name === value.Name}
//       onChange={(event, newValue) => onChange(newValue)}
//       getOptionLabel={(option) => option.Name}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={props.label || "Select Options"}
//           error={!!error}
//           helperText={error}
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
export const SprintEmpAutocomplete = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) => option.Name === value.Name}
      onChange={onChange}
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
        setOptions(
          Array.isArray(data)
            ? data.map((item) => ({
                ...item,
                ProdCatgName: item.ProdCatgName.trim(),
              }))
            : [],
        );
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
      isOptionEqualToValue={(option, value) =>
        option?.RecordID &&
        value?.RecordID &&
        option.RecordID === value.RecordID
      }
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
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log("API Response:", response.data);
        const data = response?.data?.Data?.rows || []; // Ensure it's always an array
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
      variant="standard" // Set variant to "standard"
      focused
      isOptionEqualToValue={(option, value) =>
        option?.RecordID === value?.RecordID
      }
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
          variant="standard"
          focused
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

export function CusListRunGrpOptimizedAutocomplete1({
  value = [],
  onChange,
  url,
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  companyID, // <-- FIX ADDED
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = {
        CompanyID: companyID,
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        setOptions(response.data.Data || []);

        console.log(response.data.Data, "response.data.Data");
        console.log("OPTIONS:", options);

        setError(null); // clear previous error
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]); //  FIX: prevent undefined
        setError("Failed to load. Please try again.");
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
      // onInputChange={(event, newInputValue, reason) => {

      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      options={options}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      onChange={onChange}
      getOptionLabel={(option) => option?.Name || ""}
      disableCloseOnSelect
      disableListWrap
      loading={loading}
      ListboxComponent={ListboxComponent}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", gap: 2, height: 20 }}>
          <Checkbox size="small" sx={{ marginLeft: -1 }} checked={selected} />
          {option?.Name}
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

export function CusListRunGrpOptimizedAutocomplete({
  value = [],
  onChange,
  url,
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  companyID,
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = {
        CompanyID: companyID,
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        setOptions(response.data.Data || []);

        console.log(response.data.Data, "response.data.Data");
        console.log("OPTIONS:", options);

        setError(null); // clear previous error
      } catch (error) {
        console.error("Error fetching data:", error);
        setOptions([]); //  FIX: prevent undefined
        setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return (
    <Autocomplete
      multiple={multiple}
      size="small"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      options={options}
      loading={loading}
      disableCloseOnSelect
      getOptionLabel={(option) => option?.Name || ""}
      isOptionEqualToValue={(o, v) => o.RecordID === v.RecordID}
      onChange={(e, newValue) => onChange(newValue)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} size="small" />
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
                {loading && <CircularProgress size={20} />}
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

// export function MultiSelectDropdown({
//   data = [],
//   apiValue = "",
//   onChange,
// }) {
//   const [selectedValues, setSelectedValues] = useState([]);

//   // Convert API string → array ["All","Selected"]
//   useEffect(() => {
//     if (apiValue) {
//       const arr = apiValue.replace(/"/g, "").split(",");
//       setSelectedValues(arr);
//     }
//   }, [apiValue]);

//   const toggleSelect = (id) => {
//     let updated;

//     if (selectedValues.includes(id)) {
//       updated = selectedValues.filter((v) => v !== id);
//     } else {
//       updated = [...selectedValues, id];
//     }

//     setSelectedValues(updated);

//     // Convert array → API format: "All","Task"
//     const apiFormatted = updated.map((v) => `"${v}"`).join(",");
//     onChange(apiFormatted);
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", padding: 10, borderRadius: 6 }}>
//       <strong>Select Values:</strong>

//       <div style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
//         {data.map((item) => (
//           <label key={item.ID} style={{ marginBottom: 6 }}>
//             <input
//               type="checkbox"
//               checked={selectedValues.includes(item.ID)}
//               onChange={() => toggleSelect(item.ID)}
//             />
//             <span style={{ marginLeft: 8 }}>{item.Name}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }
// export function MultiSelectDropdown({ data = [], apiValue = "", onChange }) {
//   const [selectedValues, setSelectedValues] = useState([]);

//   // Convert API value -> array ["All", "Project"]
//   useEffect(() => {
//     if (apiValue) {
//       const arr = apiValue.replace(/"/g, "").split(",");
//       setSelectedValues(arr.filter((x) => x.trim() !== ""));
//     }
//   }, [apiValue]);

//   const handleSelectChange = (event) => {
//     const value = event.target.value; // array of IDs
//     setSelectedValues(value);

//     // Convert array -> `"All","Project"`
//     const apiFormatted = value.map((v) => `"${v}"`).join(",");
//     onChange(apiFormatted);
//   };

//   return (
//     <FormControl fullWidth size="small">
//       <InputLabel>Module</InputLabel>

//       <Select
//         multiple
//         value={selectedValues}
//         onChange={handleSelectChange}
//         input={<OutlinedInput label="Select Module" />}
//         renderValue={(selected) =>
//           selected
//             .map((id) => {
//               const match = data.find((x) => x.ID === id);
//               return match ? match.Name : id;
//             })
//             .join(", ")
//         }
//       >
//         {data?.map((item) => (
//           <MenuItem key={item.ID} value={item.ID}>
//             <Checkbox checked={selectedValues.includes(item.ID)} />
//             <ListItemText primary={item.Name} />
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }
export function MultiSelectDropdown1({
  id,
  name,
  data = [],
  apiValue = "",
  onChange,
}) {
  const [selectedValues, setSelectedValues] = useState([]);

  // Convert API string -> array (and remove empty values)
  // useEffect(() => {
  //   if (apiValue) {
  //     const arr = apiValue
  //       .replace(/"/g, "")   // remove quotes
  //       .split(",")          // split comma
  //       .map((v) => v.trim()) // trim spaces
  //       .filter((v) => v !== ""); // remove empty values

  //     setSelectedValues(arr);
  //   }
  // }, [apiValue]);
  useEffect(() => {
    if (apiValue && apiValue.trim() !== "") {
      const arr = apiValue
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "");

      setSelectedValues(arr); // ["1","2"]
    } else {
      setSelectedValues([]); // VERY IMPORTANT → clears previous ID
    }
  }, [apiValue]);

  // User selection -> send comma-separated string
  const handleSelectChange = (event) => {
    const value = event.target.value
      .map((v) => v.trim())
      .filter((v) => v !== ""); // prevent empty values

    setSelectedValues(value);

    const apiFormatted = value.join(","); // "1,2,5"
    onChange(apiFormatted);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-label`}>{name}</InputLabel>

      <Select
        id={id}
        name={name}
        labelId={`${id}-label`}
        multiple
        displayEmpty
        value={selectedValues}
        onChange={handleSelectChange}
        input={<OutlinedInput label={name} />}
        renderValue={(selected) => {
          if (selected.length === 0) return null;

          return selected
            .map((id) => {
              const match = data.find((x) => String(x.ID) === String(id));
              return match ? match.Name : id;
            })
            .join(", ");
        }}

        // renderValue={(selected) => {
        //   if (selected.length === 0) return null;

        //   return selected
        //     .map((id) => {
        //       const match = data.find((x) => x.ID === id);
        //       return match ? match.Name : id;
        //     })
        //     .join(", ");
        // }}
      >
        {data?.map((item) => (
          // <MenuItem key={item.ID} value={item.ID}>
          <MenuItem key={item.ID} value={String(item.ID)}>
            <Checkbox checked={selectedValues.includes(String(item.ID))} />

            {/* //<Checkbox checked={selectedValues.includes(item.ID)} /> */}
            <ListItemText primary={item.Name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function MultiSelectDropdown({
  id,
  name,
  data = [], // [{ RecordID, Code, Name }]
  apiValue = "", // "Attendance,Leave"
  onChange,
}) {
  const [selectedValues, setSelectedValues] = useState([]);

  // 1️⃣ Convert API → array of Codes
  useEffect(() => {
    if (!apiValue || apiValue.trim() === "") {
      setSelectedValues([]); // nothing selected
      return;
    }

    // Example: `"Attendance","Leave"` → ["Attendance","Leave"]
    const cleaned = apiValue
      .replace(/"/g, "")
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    setSelectedValues(cleaned); // ["Attendance","Leave"]
  }, [apiValue]);

  // 2️⃣ Convert selection back to comma string: "Attendance,Leave"
  const handleSelectChange = (event) => {
    const arr = event.target.value;

    const cleaned = arr.map((v) => v.trim()).filter((v) => v !== "");

    setSelectedValues(cleaned);

    onChange(cleaned.join(",")); // send to API
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-label`}>{name}</InputLabel>

      <Select
        id={id}
        name={name}
        multiple
        labelId={`${id}-label`}
        value={selectedValues}
        onChange={handleSelectChange}
        input={<OutlinedInput label={name} />}
        renderValue={(selected) =>
          selected
            .map((code) => {
              const match = data.find((x) => x.Code === code);
              return match ? match.Name : code;
            })
            .join(", ")
        }
      >
        {data?.map((item) => (
          <MenuItem key={item.Code} value={item.Code}>
            <Checkbox checked={selectedValues.includes(item.Code)} />
            <ListItemText primary={item.Name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function ModuleAutocomplete({
  value = [],
  onChange,
  url,
  options: externalOptions = [],
  label = "Select Options",
  multiple = true,
  errors,
  helper,
  ...props
}) {
  const [apiOptions, setApiOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url);
        const data = response?.data?.Data?.rows || [];
        setApiOptions(Array.isArray(data) ? data : []);
      } catch {
        setApiOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      multiple
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={value}
      onChange={onChange}
      // Correct options coming from Redux
      options={externalOptions.length > 0 ? externalOptions : apiOptions}
      // Fix label
      getOptionLabel={(option) => option?.label || option?.Name || ""}
      // Fix matching
      isOptionEqualToValue={(o, v) => o.value === v.value}
      disableCloseOnSelect
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export function MultiFormikScheduleOptimizedAutocomplete({
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
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        console.log("API Response:", response.data);
        const data = response?.data?.Data?.rows || []; // Ensure it's always an array
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
      isOptionEqualToValue={(option, value) =>
        option?.RecordID === value?.RecordID
      }
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
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
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
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
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

//ITEMGROUP
export const ItemGroupLookup = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) =>
        option.Itemgroup === value.Itemgroup
      }
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.Itemgroup}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || "Select Options"}
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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

//ITEM
export const ItemsLookup = ({
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
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data.rows || [];
        setOptions(data);
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={value}
      isOptionEqualToValue={(option, value) => option.Code === value.Code}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.Code}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || "Select Options"}
          // error={!!error}
          // helperText={error}

          {...props}
          variant="standard"
          focused
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

//BRR-GREEN SIGNAL LOOKUP
export const BRREmpLookup = ({ value = null, onChange, url }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });
        const data = response.data.Data?.rows || [];
        setOptions(data);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Autocomplete
      options={options}
      value={value}
      loading={loading}
      getOptionLabel={(option) => option?.Name || ""}
      isOptionEqualToValue={(o, v) => o.RecordID === v.RecordID}
      onChange={(e, newValue) => onChange(newValue)}

      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder=""
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,   // paper style
            style: {
              fontFamily: "Times New Roman",
              fontSize: "14px",
              padding: 0,
            },
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress size={16} color="inherit" />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              padding: 0,
              background: "transparent",
            },
          }}
        />
      )}
    />
  );
};