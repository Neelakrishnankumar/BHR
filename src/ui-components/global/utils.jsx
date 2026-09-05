export const dataGridHeight = "85vh";
export const dataGridRowHeight = 25;
export const dataGridRowHeight_v1 = 40;
export const dataGridHeaderFooterHeight = 30;
export const dataGridHeaderHeight_v1 = 35;
export const dataGridFooterHeight = 45;
export const dataGridPageSizeOption  = [20,50,100]
export const dataGridPageSize = 20
export const formGap = "10px"
export const menuHeight = 35

// ui-components/global/utils.js
const GRID_STATE_KEY = "listViewGridState";

export const getGridState = (accessID, defaults = { page: 0, pageSize: 10, search: "" }) => {
  try {
    const all = JSON.parse(sessionStorage.getItem(GRID_STATE_KEY) || "{}");
    return { ...defaults, ...(all[accessID] || {}) };
  } catch {
    return defaults;
  }
};

export const setGridState = (accessID, partialState) => {
  try {
    const all = JSON.parse(sessionStorage.getItem(GRID_STATE_KEY) || "{}");
    all[accessID] = { ...all[accessID], ...partialState };
    sessionStorage.setItem(GRID_STATE_KEY, JSON.stringify(all));
  } catch {
    // storage unavailable — fail silently
  }
};