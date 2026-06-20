import React, { useMemo,useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Checkbox,
  Button,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
const companygroupflag = sessionStorage.getItem("companygroupflag");
const companygroup =
  JSON.parse(sessionStorage.getItem("companygroup") || "[]");
console.log(companygroup, companygroupflag, "companygroupflag.....");
// Replace with your real company list (Redux state / API). Kept static for now per the design brief.
const DEFAULT_COMPANIES = [
  { CompanyID: "1", CompanyName: "Sunrise Public School", City: "Chennai" },
  { CompanyID: "2", CompanyName: "Greenfield International Academy", City: "Coimbatore" },
  { CompanyID: "3", CompanyName: "Maple Leaf High School", City: "Bengaluru" },
  { CompanyID: "4", CompanyName: "Horizon Global School", City: "Madurai" },
  { CompanyID: "5", CompanyName: "Silver Oak Convent", City: "Hyderabad" },
  { CompanyID: "6", CompanyName: "Crescent Moon Academy", City: "Trichy" },
  { CompanyID: "7", CompanyName: "Bluebell Senior Secondary", City: "Salem" },
  { CompanyID: "8", CompanyName: "Pinewood Education Trust", City: "Vellore" },
];

const ACCENT = "#0f766e";
const ACCENT_SOFT = "#f0fdfa";

/**
 * eventCategory: the row passed from the grid (params.row) — needs at least RecordID, Category, AcademicYearID
 * onConfirm: async (selectedCompanyIds: string[]) => void — parent does the dispatch loop + Swal + refetch
 */
export default function PublishEventCategoryDialog({
  open,
  onClose,
  eventCategory,
  companies = companygroup,
  initiallySelectedIds = [],
  onConfirm,
}) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  useEffect(() => {
    if (open) {
      setSelectedIds(companies.map((c) => c.comid));
    }
  }, [open, companies]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(
      (c) =>
        c.companyname.toLowerCase().includes(q)
    );
  }, [companies, query]);

  const allSelected = companies.length > 0 && selectedIds.length === companies.length;

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : companies.map((c) => c.comid));
  };

  const handlePublishClick = async () => {
    if (selectedIds.length === 0) return;
    setIsPublishing(true);
    try {
      await onConfirm(selectedIds);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isPublishing ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: ACCENT_SOFT,
                border: "1px solid #ccfbf1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ApartmentOutlinedIcon sx={{ color: ACCENT, fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "text.disabled",
                  mb: 0.25,
                }}
              >
                {eventCategory?.Category ?? "Event category"}
              </Typography>
              <Typography sx={{ fontSize: 17, fontWeight: 600, color: "text.primary", lineHeight: 1.2 }}>
                Publish Event Category
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={onClose} disabled={isPublishing}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            gap: 1,
            bgcolor: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: 2,
            px: 1.5,
            py: 1,
          }}
        >
          <WarningAmberOutlinedIcon sx={{ color: "#d97706", fontSize: 18, mt: "1px" }} />
          <Typography sx={{ fontSize: 12.5, color: "#92400e", lineHeight: 1.5 }}>
            Events can't be edited in any company once this category is published.
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search companies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button size="small" onClick={toggleAll} sx={{ color: ACCENT, whiteSpace: "nowrap", fontWeight: 600 }}>
          {allSelected ? "Clear all" : "Select all"}
        </Button>
      </Box>

      <Divider />

      <DialogContent sx={{ p: 0, maxHeight: 340 }}>
        {filtered.map((c) => {
          const checked = selectedIds.includes(c.comid);
          return (
            <Box
              key={c.comid}
              onClick={() => toggleOne(c.comid)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                py: 1.25,
                cursor: "pointer",
                borderLeft: "4px solid",
                borderLeftColor: checked ? ACCENT : "transparent",
                bgcolor: checked ? ACCENT_SOFT : "background.paper",
                borderBottom: "1px solid #f1f5f9",
                "&:hover": { bgcolor: checked ? ACCENT_SOFT : "#f8fafc" },
              }}
            >
              <Checkbox
                checked={checked}
                onChange={() => toggleOne(c.comid)}
                onClick={(e) => e.stopPropagation()}
                sx={{ p: 0, color: "#cbd5e1", "&.Mui-checked": { color: ACCENT } }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: "text.primary" }} noWrap>
                  {c.companyname}
                </Typography>
              </Box>
            </Box>
          );
        })}
        {filtered.length === 0 && (
          <Box sx={{ py: 5, textAlign: "center" }}>
            <Typography sx={{ fontSize: 13, color: "text.disabled" }}>
              No companies selected
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
          <Box component="span" sx={{ fontWeight: 700, color: ACCENT }}>
            {selectedIds.length}
          </Box>
          of {companies.length} Companies Selected
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={onClose} disabled={isPublishing} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={selectedIds.length === 0 || isPublishing}
            onClick={handlePublishClick}
            startIcon={isPublishing ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : null}
            sx={{ bgcolor: ACCENT, "&:hover": { bgcolor: "#0c5e52" }, textTransform: "none", fontWeight: 600 }}
          >
            PUBLISH
            {/* {isPublishing
              ? "Publishing\u2026"
              : selectedIds.length === 0
                ? "Publish"
                : `Publish to ${selectedIds.length} ${selectedIds.length === 1 ? "company" : "companies"}`} */}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
