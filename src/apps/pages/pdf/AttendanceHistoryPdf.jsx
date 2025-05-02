import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 5,
    fontSize: 6,
    flexDirection: "column",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  headerCell: {
    flex: 1,
    padding: 2,
    backgroundColor: "#eee",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold", // BOLD header text
  },
  headerCell1 : {
    flex: 0.5,
    padding: 2,
    backgroundColor: "#eee",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold", // BOLD header text
  },
  cell: {
    flex: 1,
    padding: 2,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  cell1 : {
    flex: 0.5,
    padding: 2,
    backgroundColor: "#eee",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold", // BOLD header text
  },
});

const paginateData = (data) => {
  if (!Array.isArray(data)) return [];
  const firstPage = data.slice(0, 20);
  const otherPages = [];

  for (let i = 20; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }

  return [firstPage, ...otherPages];
};

const AttendanceHistoryPDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
          {pageIndex === 0 && (
            <View style={styles.section}>
              <Text style={{ fontSize: 10, marginBottom: 4 }}>Attendance Report</Text>
              <Text>Month: {filters.Month}</Text>
              <Text>Year: {filters.Year}</Text>
            </View>
          )}
<View style={styles.table}>
  {/* Header Row */}
  <View style={styles.tableRow}>
    <Text style={styles.headerCell1}>SL.NO</Text>
    <Text style={styles.headerCell}>EMPLOYEE</Text>
    <Text style={styles.headerCell1}>1</Text>
    <Text style={styles.headerCell1}>2</Text>
<Text style={styles.headerCell1}>3</Text>
<Text style={styles.headerCell1}>4</Text>
<Text style={styles.headerCell1}>5</Text>
<Text style={styles.headerCell1}>6</Text>
<Text style={styles.headerCell1}>7</Text>
<Text style={styles.headerCell1}>8</Text>
<Text style={styles.headerCell1}>9</Text>
<Text style={styles.headerCell1}>10</Text>
<Text style={styles.headerCell1}>11</Text>
<Text style={styles.headerCell1}>12</Text>
<Text style={styles.headerCell1}>13</Text>
<Text style={styles.headerCell1}>14</Text>
<Text style={styles.headerCell1}>15</Text>
<Text style={styles.headerCell1}>16</Text>
<Text style={styles.headerCell1}>17</Text>
<Text style={styles.headerCell1}>18</Text>
<Text style={styles.headerCell1}>19</Text>
<Text style={styles.headerCell1}>20</Text>
<Text style={styles.headerCell1}>21</Text>
<Text style={styles.headerCell1}>22</Text>
<Text style={styles.headerCell1}>23</Text>
<Text style={styles.headerCell1}>24</Text>
<Text style={styles.headerCell1}>25</Text>
<Text style={styles.headerCell1}>26</Text>
<Text style={styles.headerCell1}>27</Text>
<Text style={styles.headerCell1}>28</Text>
<Text style={styles.headerCell1}>29</Text>
<Text style={styles.headerCell1}>30</Text>
<Text style={styles.headerCell1}>31</Text>
       <Text style={styles.headerCell}>Present</Text>
      <Text style={styles.headerCell}>Leave</Text>
      <Text style={styles.headerCell}>UNPAIDLEAVE</Text>
      <Text style={styles.headerCell}>Absent</Text>
      <Text style={styles.headerCell}>IRREGULAR</Text>
      <Text style={styles.headerCell}>HOLIDAYS</Text>
      <Text style={styles.headerCell}>Weekoff</Text>
      <Text style={styles.headerCell}>Total</Text>
  </View>

  {/* Table Body */}
  {pageData.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.tableRow}>
      <Text style={styles.cell1}>{row.SLNO}</Text>
      <Text style={styles.cell}>{row.Name}</Text>
      <Text style={styles.cell1}>{row.Day1}</Text>
<Text style={styles.cell1}>{row.Day2}</Text>
<Text style={styles.cell1}>{row.Day3}</Text>
<Text style={styles.cell1}>{row.Day4}</Text>
<Text style={styles.cell1}>{row.Day5}</Text>
<Text style={styles.cell1}>{row.Day6}</Text>
<Text style={styles.cell1}>{row.Day7}</Text>
<Text style={styles.cell1}>{row.Day8}</Text>
<Text style={styles.cell1}>{row.Day9}</Text>
<Text style={styles.cell1}>{row.Day10}</Text>
<Text style={styles.cell1}>{row.Day11}</Text>
<Text style={styles.cell1}>{row.Day12}</Text>
<Text style={styles.cell1}>{row.Day13}</Text>
<Text style={styles.cell1}>{row.Day14}</Text>
<Text style={styles.cell1}>{row.Day15}</Text>
<Text style={styles.cell1}>{row.Day16}</Text>
<Text style={styles.cell1}>{row.Day17}</Text>
<Text style={styles.cell1}>{row.Day18}</Text>
<Text style={styles.cell1}>{row.Day19}</Text>
<Text style={styles.cell1}>{row.Day20}</Text>
<Text style={styles.cell1}>{row.Day21}</Text>
<Text style={styles.cell1}>{row.Day22}</Text>
<Text style={styles.cell1}>{row.Day23}</Text>
<Text style={styles.cell1}>{row.Day24}</Text>
<Text style={styles.cell1}>{row.Day25}</Text>
<Text style={styles.cell1}>{row.Day26}</Text>
<Text style={styles.cell1}>{row.Day27}</Text>
<Text style={styles.cell1}>{row.Day28}</Text>
<Text style={styles.cell1}>{row.Day29}</Text>
<Text style={styles.cell1}>{row.Day30}</Text>
<Text style={styles.cell1}>{row.Day31}</Text>
      <Text style={styles.cell}>{row.Present}</Text>
      <Text style={styles.cell}>{row.Leave}</Text>
      <Text style={styles.cell}>{row.UNPAID_LEAVE}</Text>
      <Text style={styles.cell}>{row.Absent}</Text>
      <Text style={styles.cell}>{row.IRREGULAR}</Text>
      <Text style={styles.cell}>{row.HOLIDAYS}</Text>
      <Text style={styles.cell}>{row.Weekoff}</Text>
      <Text style={styles.cell}>{row.Total}</Text>
    </View>
  ))}
</View>

        </Page>
      ))}
    </Document>
  );
};

export default AttendanceHistoryPDF;