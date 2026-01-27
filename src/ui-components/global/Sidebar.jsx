import * as React from "react";
import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  ListItem,
  Button,
  Icon,
  Chip,
  Stack,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
//import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PaymentsIcon from "@mui/icons-material/Payments";
//import AttributionIcon from '@mui/icons-material/Attribution';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { useHref, Link } from "react-router-dom";
// import avatar from "../../assets/img/avatar.jpg";
import { tokens } from "../../Theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import LgemsLogo from "../../assets/img/LgemsLogo.png";
// import LgemsLogo from "../../assets/img/Human_Resources-removebg-preview.png";
import BackOfficelogo from "../../assets/img/Backoffceimage.png";
// import BackOfficelogoV1 from "../../assets/img/BackOfficeImg _V1.png";
import BackOfficelogoV1 from "../../assets/img/B2025-ATM01.png";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AirlinesIcon from "@mui/icons-material/Airlines";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradeIcon from "@mui/icons-material/Grade";
import InventoryIcon from "@mui/icons-material/Inventory";
// import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DescriptionIcon from "@mui/icons-material/Description";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { ReactComponent as UomIcon } from "../../assets/icon/uom.svg";
import { ReactComponent as ProformaInvoiceIcon } from "../../assets/icon/proformainvoice.svg";
import { ReactComponent as SupplierIcon } from "../../assets/icon/supplier.svg";
import { ReactComponent as CustomerIcon } from "../../assets/icon/customer.svg";
import { ReactComponent as MaterialIcon } from "../../assets/icon/material.svg";
import { ReactComponent as BatchIcon } from "../../assets/icon/batch.svg";
import { ReactComponent as ProductIcon } from "../../assets/icon/products.svg";
import { ReactComponent as SubstanceIcon } from "../../assets/icon/substance.svg";
import {
  Accessibility,
  Assessment,
  AttachMoney,
  Details,
  Hail,
  Psychology,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FactoryIcon from "@mui/icons-material/Factory";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FenceIcon from "@mui/icons-material/Fence";
import { menuHeight } from "./utils";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BadgeIcon from "@mui/icons-material/Badge";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import store from "../..";
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import { logout } from "../../store/reducers/LoginReducer";
import { useDispatch } from "react-redux";
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';const child = {
  data: [
    {
      name: "Setup",
      id: 4,
      MenuID: "HR600",
      Tooltipname: "Setup",
      icon: (
        <Tooltip title="Setup">
          <RecentActorsIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Designation",
          id: 4578,
          url: "./TR122/Designation",
          icon: (
            <Tooltip title="Designation">
              <PersonIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR122",
        },
        {
          name: "Department",
          id: 3456,
          url: "./TR026/Department",
          icon: (
            <Tooltip title="Department">
              <DeveloperBoardIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR026",
        },
        {
          name: "Role",
          url: "./TR232/Role",
          id: 34578,
          icon: (
            <Tooltip title="Roles">
              <PeopleAltIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR232",
        },

        {
          name: "Personnel",
          url: "./TR027/Personnel",
          id: 5634,
          icon: (
            <Tooltip title="Personnel">
              <PeopleAltIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR027",
        },
        {
          name: "Project",
          id: 4346894,
          url: "./TR275/Project",
          icon: (
            <Tooltip title="Project">
              <SourceOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR275",
        },
        {
          name: "Functions",
          id: 567,
          url: "./TR121/Functions",
          icon: (
            <Tooltip title="Functions">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR121",
        },
        // {
        //   name: "Party",
        //   id: 4346895,
        //   url: "./TR243/Party",
        //   icon: (
        //     <Tooltip title="Party">
        //       <PersonSearchIcon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR243",
        // },
        {
          name: "Shift",
          id: 45689,
          url: "./TR265/Shift",
          icon: (
            <Tooltip title="Shift">
              <SafetyCheckIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR265",
        },
        {
          name: "Leave Type",
          id: 45680,
          url: "./TR213/Leave Type",
          icon: (
            <Tooltip title="Leave Type">
              <Hail color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR121",
        },
        {
          name: "Payroll",
          id: 46,
          url: "./TR027/Employee Payroll",
          icon: (
            <Tooltip title="Employees">
                <PeopleAltIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR027",
        },
        {
          name: "Overhead Type",
          id: 47,
          url: "./TR292/Overhead Type",
          icon: (
            <Tooltip title="Overhead Type">
              <SummarizeIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR292",
        },
        {
          name: "Overhead",
          id: 41,
          url: "./TR085/Overhead",
          icon: (
            <Tooltip title="Overhead">
              <RequestQuoteOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR085",
        },

        {
          name: "Holiday List",
          id: 54668,
          url: "./TR218/Holiday List",
          icon: (
            <Tooltip title="Leave Type">
              <FactCheckRoundedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR121",
        },

        {
          name: "Salary Component",
          id: 56796,
          url: "./TR205/Salary Component",
          icon: (
            <Tooltip title="Salary Component">
              <AttachMoneyIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR205",
        },

        {
          name: "Satuary Component",
          id: 4578,
          url: "./TR207/Satuary Component",
          icon: (
            <Tooltip title="Satuary Component">
              <AttachMoneyIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR207",
        },
      ],
    },
    {
      name: "CRM",
      id: 33,
      MenuID: "CRM1800",
      Tooltipname: "CRM",
      icon: (
        <Tooltip title="CRM">
          <SupportAgentOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [

        {
          name: "HSN",
          id: 43468,
          url: "./TR316/HSN Category",
          icon: (
            <Tooltip title="HSN">
              <QrCodeScannerOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR316",
        },
        {
          name: "Item",
          id: 43468,
          url: "./TR315/Item Group",
          icon: (
            <Tooltip title="Item">
              <InventoryOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR315",
        },
        {
          name: "Route",
          id: 43468,
          url: "./TR323/Route",
          icon: (
            <Tooltip title="Route">
              <RouteOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR323",
        },
        {
          name: "Party",
          id: 4346895,
          //  url: "./TR243/Party",
          url: "./TR321/Party",
          icon: (
            <Tooltip title="Party">
              <PersonSearchIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR321",
        },
        // {
        //   name: "Aging Report",
        //   id: 4346895,
        //   //  url: "./TR243/Party",
        //   url: "/Apps/Party/AgingReport",
        //   icon: (
        //     <Tooltip title="Aging Report">
        //       <ScaleOutlinedIcon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR321",
        // },
        //  {
        //   name: "Lead",
        //   id: 4346895,
        //   //  url: "./TR243/Lead",
        //   url: "./TR321/Lead",
        //   icon: (
        //     <Tooltip title="Lead">
        //       <PersonSearchIcon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR321",
        // },
        {
          name: "Order Enquiry",
          id: 4346899,
          url: "./TR313/Order Enquiry",
          icon: (
            <Tooltip title="Order Enquiry">
              <QueryStatsOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR313",
        },
        {
          name: "Lead Enquiry",
          id: 4346899,
          url: "./TR328/Lead Enquiry",
          icon: (
            <Tooltip title="Lead Enquiry">
              <QueryBuilderIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR328",
        },

         {
          name: "Audit",
          id: 4346899,
          url: "/Apps/TR260/EditAudit",
          icon: (
            <Tooltip title="Audit">
              <ArtTrackIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR328",
        },

      ],
    },
    {
      name: "Transaction",
      id: 97659,
      MenuID: "ST1600",
      Tooltipname: "Transaction",
      icon: (
        <Tooltip title="Transaction">
          <AssignmentTurnedInIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Check In",
          id: 5486,
          url: "./TR123/Check In",
          icon: (
            <Tooltip title="Check In">
              <ChecklistIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR123",
        },
        {
          name: "Check Out",
          id: 5589,
          url: "./TR124/Check Out",
          icon: (
            <Tooltip title="Check Out">
              <ChecklistRtlIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR124",
        },
        {
          name: "Employee Request",
          id: 5846,
          url: "./TR257/Employee Request",
          icon: (
            <Tooltip title="Requests">
              <PermContactCalendarIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR257",
        },
        // {
        //   name: "Approval",
        //   id: 5859,
        //   url: "./TR027/Approval",
        //   icon: (
        //     <Tooltip title="Approval">
        //       <TaskAltIcon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR258",
        // },
      ],
    },
    {
      name: "Agile",
      id: 45678,
      MenuID: "EM900",
      Tooltipname: "Agile",
      icon: (
        <Tooltip title="Agile">
          <GroupsOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Attendance(D)",
          url: "/Apps/TR260/Editdailyattendance",
          id: 5590,
          icon: (
            <Tooltip title="Daily Attendance">
              <AppRegistrationOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR260",
        },
        {
          name: "Attendance(M)",
          url: "/Apps/TR260/EditAttendance",
          id: 5580,
          icon: (
            <Tooltip title="Monthly Attendance">
              <AppRegistrationOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR260",
        },
        {
          name: "Attendance Register",
          url: "/Apps/TR259/EditAttendanceHistory",
          id: 5591,
          icon: (
            <Tooltip title="Attendance Register">
              <WorkHistoryOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR259",
        },
        {
          name: "Time Sheet",
          url: "/Apps/TR261/EditTimeSheet",
          id: 5592,
          icon: (
            <Tooltip title="Time Sheet">
              <PendingActionsOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR261",
        },
      ],
    },


    // {
    //   name: "Assessment",
    //   id: 4578,
    //   MenuID: "ST1600",
    //   Tooltipname: "Assessment",
    //   icon: (
    //     <Tooltip title="Assessment">
    //       <AssessmentOutlinedIcon sx={{ color: "#651fff" }} />
    //     </Tooltip>
    //   ),
    //   children: [
    //     {
    //       name: "Prepare",
    //       id: 5848,
    //       // url: "/Apps/SkillGlow/CategoryMain",
    //       url: "/Apps/TR278/List Of Categories",
    //       icon: (
    //         <Tooltip title="Prepare">
    //           <CategoryOutlinedIcon color="info" />
    //         </Tooltip>
    //       ),
    //       UGA_ADD: true,
    //       UGA_DEL: true,
    //       UGA_MOD: true,
    //       UGA_PRINT: true,
    //       UGA_PROCESS: true,
    //       UGA_VIEW: true,
    //       UGA_ACCESSIDS: "TR122",
    //     },
    //     {
    //       name: "Schedule",
    //       id: 5849,
    //       url: "/Apps/TR286/List of Employees",
    //       // url: "/Apps/SkillGlow/Assessment/Schedule/EmployeeSchedule",
    //       icon: (
    //         <Tooltip title="Schedule">
    //           <BadgeIcon color="info" />
    //         </Tooltip>
    //       ),
    //       UGA_ADD: true,
    //       UGA_DEL: true,
    //       UGA_MOD: true,
    //       UGA_PRINT: true,
    //       UGA_PROCESS: true,
    //       UGA_VIEW: true,
    //       UGA_ACCESSIDS: "TR122",
    //     },
    //     {
    //       name: "Insights",
    //       id: 5849,
    //       //url: "/Apps/TR286/List of Employees",
    //       url: "/Apps/SkillGlow/SkillInsights",
    //       // url: "/Apps/SkillGlow/Assessment/Schedule/EmployeeSchedule",
    //       icon: (
    //         <Tooltip title="Insights">
    //           <DashboardOutlinedIcon color="info" />
    //         </Tooltip>
    //       ),
    //       UGA_ADD: true,
    //       UGA_DEL: true,
    //       UGA_MOD: true,
    //       UGA_PRINT: true,
    //       UGA_PROCESS: true,
    //       UGA_VIEW: true,
    //       UGA_ACCESSIDS: "TR122",
    //     },

    //   ],
    // },

    // {
    //   name: "Assessment",
    //   id: 4579,
    //   MenuID: "ST1609",
    //   Tooltipname: "Assessment",
    //   icon: (
    //     <Tooltip title="Assessment">
    //       <AssessmentOutlinedIcon sx={{ color: "#651fff" }} />
    //     </Tooltip>
    //   ),
    //   url: "/Apps/TR299/List Of Assessment Type",
    //   UGA_ADD: true,
    //   UGA_DEL: true,
    //   UGA_MOD: true,
    //   UGA_PRINT: true,
    //   UGA_PROCESS: true,
    //   UGA_VIEW: true,
    //   UGA_ACCESSIDS: "TR122",

    // },
    {
      name: "Settings",
      id: 95689,
      MenuID: "ST1600",
      Tooltipname: "Settings",
      icon: (
        <Tooltip title="Settings">
          <SettingsIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Company",
          id: 5846,
          url: "./configuration",
          icon: (
            <Tooltip title="Configuration">
              <DisplaySettingsIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR252",
        },
        {
          name: "Approval",
          id: 58467,
          url: "./Approval",
          icon: (
            <Tooltip title="Approval">
              <EventAvailableIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR258",
        },
        {
          name: "Biometric",
          id: 58467,
          url: "./Biometric",
          icon: (
            <Tooltip title="Biometric">
              <FingerprintIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR252",
        },
        {
          name: "Geo Fencing",
          id: 58468,
          url: "./TR128/Location",
          icon: (
            <Tooltip title="Geofencing">
              <FenceIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR252",
        },
        {
          name: "Change Password",
          id: 5859,
          url: "./change Password",
          icon: (
            <Tooltip title="Change Password">
              <LockOpenIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR253",
        },
      ],
    },
    {
      name: "Company",
      id: 95689,
      MenuID: "ST1600",
      Tooltipname: "Company",
      icon: (
        <Tooltip title="Company">
          <AssuredWorkloadIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Company Details",
          id: 5846,
          url: "./ChangeyourPassword_2",
          icon: (
            <Tooltip title="Company Details">
              <DisplaySettingsIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR252",
        },
       
        {
          name: "Logo & GST Upload",
          id: 58467,
          url: "./ChangeyourPassword_4",
          icon: (
            <Tooltip title="Logo & GST Upload">
              <PermMediaIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR258",
        },
        {
          name: "Header & Footer Setup",
          id: 56667,
          url: "./ChangeyourPassword_5",
          icon: (
            <Tooltip title="Header & Footer Setup">
              <SettingsOverscanIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR258",
        },
         {
          name: "Activate My Subscription",
          id: 5846,
          url: "./ChangeyourPassword_3",
          icon: (
            <Tooltip title="Activate My Subscription">
              <UnsubscribeIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR252",
        },

      ],
    },
  ],
};

const Item = ({ title, to, icon, selected, setSelected, isChild }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);

  function cal() {
    setSelected(title);
    navigate(to);
  }

  return (
    <MenuItem
      style={{ marginLeft: isChild ? "-11px" : "" }}
      active={selected === title}
      icon={icon}
      onClick={cal}
    >
      <Typography style={{ marginLeft: isChild ? "16px" : "" }}>
        {title}
      </Typography>
    </MenuItem>
  );
};

const Sidebars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();   
  const [selected, setSelected] = useState("Product Category");
  // const ATMLogo = 'B2025-ATM01.png' 
  const [open, setOpen] = React.useState(false);
  // const companyLogo = sessionStorage.getItem("CompanyLogo");
  // console.log(companyLogo, "companyLogo");
  const firstLogin = sessionStorage.getItem("firstLogin");
  // const firstLogin = "Y";
  console.log(firstLogin, "firstLogin");
  const [logoSrc, setLogoSrc] = useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Always read latest values from sessionStorage
      const companyLogo = sessionStorage.getItem("CompanyLogo");
      const sessionLogo = sessionStorage.getItem("logoimage") || companyLogo;
      const newLogo = sessionLogo
        ? store.getState().globalurl.attachmentUrl + sessionLogo
        : BackOfficelogoV1;

      setLogoSrc((prev) => (prev !== newLogo ? newLogo : prev));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const company = sessionStorage.getItem("company");
  const year = sessionStorage.getItem("year");
  const Groupaccess = JSON.parse(sessionStorage.getItem("Groupaccess")) || [];

  const Modules = JSON.parse(sessionStorage.getItem("Modules")) || [];
  console.log(Modules, "Straaaaa");

  const handleClicks = (item) => {
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const [menu, setMenu] = useState({});
  const filteredMenuData =
    firstLogin === "Y"
      ? child.data.filter((menu) => menu.name === "Company")
      : child.data.filter((menu) => menu.name !== "Company");


  const handleMenu = (children, accessRow, isChild) => {
    return children.map(
      ({
        children,
        name,
        url,
        icon,
        Tooltipname,
        id,
        UGA_ACCESSIDS,
        MenuID,
      }) => {
        if (!children) {
          return accessRow.map(
            ({
              UGA_ADD,
              UGA_DEL,
              UGA_MOD,
              UGA_PRINT,
              UGA_PROCESS,
              UGA_VIEW,
              UGA_ACCESSID,
            }) => {
              if (
                UGA_ACCESSID === UGA_ACCESSIDS &&
                (UGA_ADD ||
                  UGA_DEL ||
                  UGA_MOD ||
                  UGA_PRINT ||
                  UGA_PROCESS ||
                  UGA_VIEW)
              ) {
                return (
                  <List component="div" disablePadding key={id}>
                    <ListItem
                      disableGutters
                      style={{ padding: "0px", height: menuHeight }}
                      key={id}
                    >
                      <Item
                        isChild={isChild}
                        title={name}
                        to={url}
                        icon={icon}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </ListItem>
                  </List>
                );
              }
            }
          );
        }

        return Modules.map(({ PPD, SM_PMENU }) => {
          if (PPD && SM_PMENU === MenuID) {
            return (
              <div key={id}>
                <ListItem
                  disableGutters
                  key={id}
                  style={{ height: menuHeight }}
                  onClick={() => handleClicks(name)}
                >
                  {!collapsed && (
                    <Tooltip title={Tooltipname}>
                      <ListItemButton style={{ height: menuHeight }}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name} />

                        {menu[name] ? (
                          <ExpandMore />
                        ) : (
                          <ChevronRightOutlinedIcon />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  )}
                  {collapsed && (
                    <ListItemButton style={{ height: menuHeight }}>
                      <ListItemIcon>
                        {icon}{" "}
                        {menu[name] ? (
                          <ExpandMore />
                        ) : (
                          <ChevronRightOutlinedIcon />
                        )}
                      </ListItemIcon>
                    </ListItemButton>
                  )}
                </ListItem>
                <Collapse
                  in={menu[name] ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  {handleMenu(children, Groupaccess, false)}
                </Collapse>
              </div>
            );
          }
        });

        //
        // }
      }
    );
  };
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  // const Expiryin = sessionStorage.getItem("Expiryin");
  const Expiryin = Number(sessionStorage.getItem("Expiryin")) || 0;
  console.log(Expiryin, "--in a sideBar Expiryin");

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        // height: menuHeight,
        top: 0,
        bottom: 0,
        zIndex: 7,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
        <Menu>
          <MenuItem
            icon={
              collapsed ? (
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              ) : undefined
            }
            style={{
              margin: "40px 0 3px 0",
              // margin: "10px 0 3px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              // ml="15px"
              >

                <img
                  src={logoSrc}
                  style={{ height: "60px", width: "180px", objectFit: "contain" }}
                  // onClick={() => navigate("./HR")}
                  onClick={() =>
                    firstLogin === "Y"
                      ? navigate("/Apps/ChangeyourPassword_1")
                      : navigate("./HR")
                  }
                />

                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="space-around"
              width="91%"
              height="67px"
              mt="16px"
              p="7px"
              ml="8px"
              borderRadius="4px"
              boxShadow="0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)"
            >
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">{company}</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">{year}</Typography>
              </Box>
            </Box>
          )}
          <Box></Box>
          <Box paddingBottom={3}>
            {/* {handleMenu(child.data, Groupaccess, true)} */}
            {handleMenu(filteredMenuData, Groupaccess, true)}

            <Tooltip title="Logout">
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  dispatch(logout());
                }}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon color="error" />
                </ListItemIcon>

                {!collapsed && <ListItemText primary="Logout" />}
              </ListItemButton>
            </Tooltip>

            <Divider sx={{ mt: 1 }} variant="middle" />

            <Grid mt={1} p={1} container direction={"column"} spacing={2}>
              {Expiryin < 10 ? (
                <Paper
                  elevation={3}
                  sx={{ padding: 2, maxWidth: 400, margin: "auto" }}
                >
                  <Box
                    sx={{
                      border: "1px solid red",
                      backgroundColor: "#ffebee",
                      padding: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1" color="error" fontWeight="bold">
                      ⚠ Warning: Your subscription will expire in {Expiryin}{" "}
                      days!
                    </Typography>
                  </Box>
                </Paper>
              ) : null}
            </Grid>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
