import React, { useState, useEffect, createContext } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import PropTypes from "prop-types";

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
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

export const AppraisalAutocompletePayload = ({
  value = null,
  onChange,
  url, // string or function: (state, params) => string
  params = {}, // dynamic params
  state = {}, // optional global state
  payload = {}, // POST payload
  label,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        // Resolve URL if function
        const resolvedUrl =
          typeof url === "function" ? url(state, params) : url;

        const response = await axios.post(resolvedUrl, payload, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        });

        // Extract rows from Data.rows
        const rows = response.data?.Data?.rows || [];
        setOptions(rows);

        // Prefill if value exists but only ID is set
        if (value) {
          const found = rows.find((r) => r.RecordID === value);
          if (found) setSelectedOption(found);
        }
      } catch (err) {
        console.error("Error fetching autocomplete data:", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
  if (value && options.length > 0) {
    const found = options.find(
      (r) =>
        r.RecordID === value ||
        r.RecordID === value?.RecordID
    );
    if (found) {
      setSelectedOption(found);
    } else if (value?.RecordID && value?.Name) {
      setSelectedOption(value);
    }
  } else {
    setSelectedOption(null);
  }
}, [value, options]);


  return (
    <Autocomplete
      size="small"
      fullWidth
      limitTags={1}
      options={options}
      loading={loading}
      value={selectedOption}
      isOptionEqualToValue={(option, value) =>
        option.RecordID === value?.RecordID
      }
      //onChange={(event, newValue) => onChange(newValue)}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
        onChange(newValue); // pass whole { RecordID, Name }
      }}
      getOptionLabel={(option) => option.Name || ""}
      renderInput={(paramsInput) => (
        <TextField
          {...paramsInput}
          label={label || "Select Option"}
          {...props}
          variant="standard"
          focused
          InputProps={{
            ...paramsInput.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {paramsInput.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export const SingleFormikSkillAutocompletePayload = ({
  value = null,
  onChange,
  url,
  height = 20,
  payload = {},
  defaultValue,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        const data = response.data.Data || [];
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

export const SingleFormikSkillAutocomplete = ({
  value = null,
  onChange,
  url,
  height = 20,
  defaultValue,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

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

export function MultiFormikSkillAutocomplete({
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
