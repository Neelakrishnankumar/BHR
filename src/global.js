// import { createSlice } from "@reduxjs/toolkit";

// // var APIurl = "https://bos.beyondexs.com/api/"
// // var baseurl = "https://bos.beyondexs.com/"
// // var baseurlUAAM = "https://uaam.beyondexs.com/"

// var APIurl = "https://bosuat.beyondexs.com/api/"
// var baseurl = "https://bosuat.beyondexs.com/"
// var baseurlUAAM = "https://uaamuat.beyondexs.com/"
// // var essURL = "https://essuat.beyondexs.com/api/"

// // var APIurl ="https://dvmtapi.bexatm.com/hr/api/"
// // var baseurl = "https://dvmtapi.bexatm.com/"

// // var APIurl = "https://phpmigrationapi.bexatm.com/hr/api/"
// // var baseurl = "https://phpmigrationapi.bexatm.com/"

// const initialState = {
//   //hr
//   baseApiUrl: APIurl,
//   baseUrl: baseurl,
//   listViewurl: APIurl + 'wslistview_mysql.php',
//   loginUrl: APIurl + 'LController.php',
//   authUrl: APIurl + 'auth.php',
//   forgotPasswordUrl: APIurl + 'BOSForgetPasswordController.php',

//   comboUrl: APIurl + 'APIController.php',
//   apiUrl: APIurl + 'APIController.php',
//   imgUploadUrl: baseurl + 'imgup.php',
//   compdetailPostUrl: APIurl + 'CompanypostController.php',
//   //imgUploadUrl:baseurl + 'imgup6.php',
//   imageUrl: baseurl + 'uploads/images/',
//   imageUrlUAAM: baseurlUAAM + 'uploads/images/',
//   imageNameUpdateUrl: APIurl + 'CMController.php',
//   //attachmentUrl:baseurl + 'uploads/images/',
//   attachmentUrl: baseurl + 'uploads/images/',
//   attachmentSkilUrl: baseurl + 'uploads/attachments/',
//   fileUploadUrl: baseurl + 'fileupload.php',
//   pcdurl: APIurl + 'PCDController.php',
//   pdfurl: baseurl + 'tcpdf/',
//   indentUrl: APIurl + 'IndentController.php',
//   invoiceUrl: APIurl + 'InvoiceController.php',
//   commonUrl: APIurl + 'CommonController.php',
//   bomCopyUrl: APIurl + 'VersioningController.php',
//   bomHeaderUrl: APIurl + 'BOMController.php',
//   stockUrl: APIurl + 'StockController.php',
//   batchUrl: APIurl + 'BatchstructureController.php',
//   finalinvUrl: APIurl + 'FinalInvoiceController.php',
//   proformainvUrl: APIurl + 'ProfoinvoiceController.php',
//   orderUrl: APIurl + 'CustomerOrder.php',
//   stockReqUrl: APIurl + 'StockRequirement.php',
//   productUrl: APIurl + 'StockProcedure.php',
//   bomLkUrl: APIurl + 'BOMLeatherCountController.php',
//   designPUrl: APIurl + 'UomconversiongetController.php',
//   costingMatrialUrl: APIurl + 'BomcostController.php?',
//   conversionUrl: APIurl + 'UomconversiongetController.php',
//   userGroupUrl: APIurl + 'GroupaccessController.php',
//   dcTrackingUrl: APIurl + 'DctrackingController.php',
//   trackingUrl: APIurl + 'MaterialtrackingController.php',
//   supplierTrackUrl: APIurl + 'SuppliertrackingController.php',
//   materialsTrackingUrl: APIurl + 'MaterialTrackingChart.php',
//   supplytrackingUrl: APIurl + 'SupplierTrackingChart.php',
//   producttrackingUrl: APIurl + 'ProductpriceController.php?',
//   customerorderanalysisUrl: APIurl + 'CustomerOrderChart.php?',
//   prductorderanalysisUrl: APIurl + 'ProductOrderChart.php?',
//   mailContentGeturl: APIurl + 'EmailController.php',
//   mailSendUrl: APIurl + 'invoicemail.php',
//   materialUomCovUrl: APIurl + 'MaterialUOMConversionController.php',
//   decryptUrl: APIurl + 'HashtokenController.php',
//   costingLeatherUrl: APIurl + 'BomLeathercost.php',
//   customerLeatherUrl: APIurl + 'CustomerLeatherController.php',
//   getempdeploymentUrl: APIurl + 'getempdeployment.php?',
//   postempdeployment: APIurl + 'postempdeployment.php?',
//   matProcurementUrl: APIurl + 'MaterialProcurementChart.php',
//   stockorderUrl: APIurl + 'MaterialOrderReportController.php',
//   dcsummaryUrl: APIurl + 'getdcsummary.php',
//   dcpostsummaryUrl: APIurl + 'postdcsummary.php',
//   packinglistCbmUrl: APIurl + 'CbmCalculation.php',
//   searchUrl: APIurl + 'productSearch3.php',
//   // searchUrl:'http://localhost:8080/MYPROJECT/bgems-api/productSearch.php',
//   jobworkbomurl: APIurl + 'JobworkController.php',
//   alterNateMaterial: APIurl + 'AlterMaterialController.php',
//   PurchaseOrderParameterUrl: APIurl + 'APIController.php',
//   PurchaseorderratingUrl: APIurl + 'ParametergetController.php',
//   CustomerPriceorderQtyUrl: APIurl + 'InternalorderController.php',
//   apiweightageUrl: APIurl + 'HRWeightagesGetContoller.php',
//   weightagepostUrl: APIurl + 'HRWeightagesContoller.php',
//   employeeattendanceUrl: APIurl + "getempattendancehistory.php",
//   payrollattendanceUrl: APIurl + "PayrollAttendanceController.php",
//   attendanceUrl: APIurl + "getempattendance.php",
//   attendanceprocessUrl: APIurl + "EmpAttendanceHistoryController.php",
//   regularizationUrl: APIurl + "APIController.php?",
//   settingsgetUrl: APIurl + "HRSubscriptionCodeGetController.php",
//   settingsPostUrl: APIurl + "HRChangePasswordController.php",
//   //sprintget
//   SprintgetUrl: APIurl + "SprintHeaderandDetailController.php",
//   SprintPPGetUrl: APIurl + "SprintProjectPlanGetController.php",
//   regGetUrl: APIurl + 'RegularizationGetController.php',
//   //payrollattendanceUrl: APIurl + "PayrollAttendanceController.php",
//   leavelApprovalUrl: APIurl + "EmployeeRequestUpdateController.php",
//   requestAcknowledgeUrl: APIurl + "LeaveRequest.php",
//   monthlyattendanceUrl: APIurl + "GetdatewiseEmpattendance.php",
//   biometricgetUrl: APIurl + "BioMetricConfigrationGetContoller.php",
//   biometricPostUrl: APIurl + "BioMetricConfigrationUpdateContoller.php",
//   partyBankUrl: APIurl + "PartyBankGetController.php",
//   partyBankPostUrl: APIurl + "PartyBankUpdateController.php",
//   partyContactgetUrl: APIurl + "PartyContractGetControllerV1.php",
//   partyContactPostUrl: APIurl + "PartyContractUpdateControllerV1.php",
//   settingsapprovalGetUrl: APIurl + "getcompanyapprovals.php",
//   settingsapprovalPOSTtUrl: APIurl + "postcompanyapprovals.php",
//   getLeaveweeklyDataUrl: APIurl + "LeaveWeeklyController.php",
//   timesheetattendanceUrl: APIurl + "DailyTaskgetController.php",
//   timesheetreportattendanceUrl: APIurl + "Dailytask_getController.php",
//   timesheetdtUrl: APIurl + "DailyTaskpostController.php",
//   empAttachmentUrl: baseurl + "EmployeeAttachmentsController.php",
//   // empAttachmentUrl: baseurl + "EmployeeAttachmentsControllerV1.php",
//   empGetAttachmentUrl: APIurl + "getAttachmentsController.php",
//   getLeaveentryDataUrl: APIurl + "EmpLeaveConfigurationGetController.php",
//   geolocationgetUrl: APIurl + "EmpGeoLocationGet.php",
//   geolocationupdateUrl: APIurl + "EmpGeoLocationUpdate.php",
//   LeaveTypeurl: APIurl + "APIController.php",
//   subsNewUrl: APIurl + "SubscriptionPostController.php",
//   AssessmentAutoUrl: APIurl + "ScheduleAssessmentLookup.php",
//   InsightsUrl1: APIurl + "InsightGetController.php",
//   InsightsUrl2: APIurl + "InsightEmpPerformance.php",
//   ProjectCostingPDF: APIurl + "ProjectCostingReport.php",
//   ScheduleGetController: APIurl + "ScheduleGetController.php",
//   AppraisalScheduleGetcontroller: APIurl + "AppraisalScheduleGetcontroller.php",
//   Leadergeturl: APIurl + "LeaderGetController.php",
//   //VendorRegistration:  APIurl + "vendorregistration.php",
//   VendorRegistration: APIurl + "vendorregistrationV1.php",
//   VendorRegistrationGet: APIurl + "vendorregistrationGet.php",
//   VendorDefaultPUT: APIurl + "vendordefault.php",
//   VendorDefaultGET: APIurl + "vendordefaultGet.php",
//   DefaultProductDeliveryChargeGet: APIurl + "DefaultProductDeliveryChargeGet.php",
//   //OrderdetailReport:  APIurl + "OrderdetailReportV7.php",
//   OrderdetailReport: APIurl + "OrderdetailReport.php",
//   //OrderdetailReport:  APIurl + "OrderdetailReportMV1.php",
//   ItemMainMenu: APIurl + "ItemMainMenu.php",
//   ItemFlagMenu: APIurl + "ItemFlagMenu.php",
//   ItemMainGETFetchData: APIurl + "ItemMainMenuGet.php",
//   ItemFlagMenuGet: APIurl + "ItemFlagMenuGet.php",
//   ItemFlagMenuPut: APIurl + "ItemFlagMenu.php",
//   ItemStockMenuGet: APIurl + "ItemStockMenuGet.php",
//   ItemStockMenuPut: APIurl + "ItemStockMenu.php",
//   // VendorFilterController: APIurl + "VendorFilterController.php",
//   VendorFilterController: APIurl + "VendorFilterController.php",
//   // UserActivityUrl : essURL + "UserActivityController.php",
//   UserActivityUrl : APIurl + "UserActivityController.php",
// };

// export const getUrlSlice = createSlice({
//   name: "globalurl",
//   initialState,
//   reducers: {},
// });

// export default getUrlSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getConfig } from "./config";

const initialState = {
  baseApiUrl: "",
  baseUrl: "",
  listViewurl: "",
  loginUrl: "",
  authUrl: "",
  forgotPasswordUrl: "",

  comboUrl: "",
  apiUrl: "",
  imgUploadUrl: "",
  compdetailPostUrl: "",
  //imgUploadUrl:baseurl + 'imgup6.php',
  imageUrl: "",
  imageUrlUAAM: "",
  imageNameUpdateUrl: "",
  //attachmentUrl:baseurl + 'uploads/images/',
  attachmentUrl: "",
  attachmentSkilUrl: "",
  fileUploadUrl: "",
  designationImportUrl:"",
  pcdurl: "",
  pdfurl: "",
  indentUrl: "",
  invoiceUrl: "",
  commonUrl: "",
  bomCopyUrl: "",
  bomHeaderUrl: "",
  stockUrl: "",
  batchUrl: "",
  finalinvUrl: "",
  proformainvUrl: "",
  orderUrl: "",
  stockReqUrl: "",
  productUrl: "",
  bomLkUrl: "",
  designPUrl: "",
  costingMatrialUrl: "",
  conversionUrl: "",
  userGroupUrl: "",
  dcTrackingUrl: "",
  trackingUrl: "",
  supplierTrackUrl: "",
  materialsTrackingUrl: "",
  supplytrackingUrl: "",
  producttrackingUrl: "",
  customerorderanalysisUrl: "",
  prductorderanalysisUrl: "",
  mailContentGeturl: "",
  mailSendUrl: "",
  materialUomCovUrl: "",
  decryptUrl: "",
  costingLeatherUrl: "",
  customerLeatherUrl: "",
  getempdeploymentUrl: "",
  postempdeployment: "",
  matProcurementUrl: "",
  stockorderUrl: "",
  dcsummaryUrl: "",
  dcpostsummaryUrl: "",
  packinglistCbmUrl: "",
  searchUrl: "",
  // searchUrl:'http://localhost:8080/MYPROJECT/bgems-api/productSearch.php',
  jobworkbomurl: "",
  alterNateMaterial: "",
  PurchaseOrderParameterUrl: "",
  PurchaseorderratingUrl: "",
  CustomerPriceorderQtyUrl: "",
  apiweightageUrl: "",
  weightagepostUrl: "",
  employeeattendanceUrl: "",
  payrollattendanceUrl: "",
  attendanceUrl: "",
  attendanceprocessUrl: "",
  regularizationUrl: "",
  settingsgetUrl: "",
  settingsPostUrl: "",
  //sprintget
  SprintgetUrl: "",
  SprintPPGetUrl: "",
  regGetUrl: "",
  //payrollattendanceUrl: APIurl + "PayrollAttendanceController.php",
  leavelApprovalUrl: "",
  requestAcknowledgeUrl: "",
  monthlyattendanceUrl: "",
  biometricgetUrl: "",
  biometricPostUrl: "",
  partyBankUrl: "",
  partyBankPostUrl: "",
  partyContactgetUrl: "",
  partyContactPostUrl: "",
  settingsapprovalGetUrl: "",
  settingsapprovalPOSTtUrl: "",
  getLeaveweeklyDataUrl: "",
  timesheetattendanceUrl: "",
  timesheetreportattendanceUrl: "",
  timesheetdtUrl: "",
  empAttachmentUrl: "",
  // empAttachmentUrl: baseurl + "EmployeeAttachmentsControllerV1.php",
  empGetAttachmentUrl: "",
  getLeaveentryDataUrl: "",
  geolocationgetUrl: "",
  geolocationupdateUrl: "",
  LeaveTypeurl: "",
  subsNewUrl: "",
  AssessmentAutoUrl: "",
  InsightsUrl1: "",
  InsightsUrl2: "",
  ProjectCostingPDF: "",
  ScheduleGetController: "",
  AppraisalScheduleGetcontroller: "",
  Leadergeturl: "",
  //VendorRegistration:  APIurl + "vendorregistration.php",
  VendorRegistration: "",
  VendorRegistrationGet: "",
  VendorDefaultPUT: "",
  VendorDefaultGET: "",
  DefaultProductDeliveryChargeGet: "",
  //OrderdetailReport:  APIurl + "OrderdetailReportV7.php",
  OrderdetailReport: "",
  //OrderdetailReport:  APIurl + "OrderdetailReportMV1.php",
  ItemMainMenu: "",
  ItemFlagMenu: "",
  ItemMainGETFetchData: "",
  ItemFlagMenuGet: "",
  ItemFlagMenuPut: "",
  ItemStockMenuGet: "",
  ItemStockMenuPut: "",
  // VendorFilterController: APIurl + "VendorFilterController.php",
  VendorFilterController: "",
  // UserActivityUrl : essURL + "UserActivityController.php",
  UserActivityUrl: "",
  LeaveenquiryGetController: "",
  UserActivityGet: "",
  auditScreennameGet: "",
  EmployeeVendorGetController:"",
  OHPaymentUpdateController: "",
  PartyBydateByamtFilter: "",
  EmployeeVendorContactGet:"",
  ExcelFileDownload:"",
  ExcelFileUpload:"",
  Setup_MenuExcel:"",
  Parentposturl:"",
  Processposturl:"",
  PayslipGetController:"",
};

export const getUrlSlice = createSlice({
  name: "globalurl",
  initialState,
  reducers: {
    initGlobalUrl: (state) => {
      const config = getConfig();

      const APIurl = config.API_URL;
      const baseurl = config.BASE_URL;
      const baseurlUAAM = config.UAAM_URL;
      //const uaturl = "https://essuat.beyondexs.com"

      state.baseApiUrl = APIurl;
      state.baseUrl = baseurl;
      state.listViewurl = APIurl + "wslistview_mysql.php";
      state.loginUrl = APIurl + "LController.php";
      state.authUrl = APIurl + "auth.php";
      state.forgotPasswordUrl = APIurl + "BOSForgetPasswordController.php";

      state.comboUrl = APIurl + "APIController.php";
      state.apiUrl = APIurl + "APIController.php";
      state.imgUploadUrl = baseurl + "imgup.php";
      state.compdetailPostUrl = APIurl + "CompanypostController.php";
      //imgUploadUrl=baseurl + 'imgup6.php';
      state.imageUrl = baseurl + "uploads/images/";
      state.imageUrlUAAM = baseurlUAAM + "uploads/images/";
      state.imageNameUpdateUrl = APIurl + "CMController.php";
      //attachmentUrl=baseurl + 'uploads/images/';
      state.attachmentUrl = baseurl + "uploads/images/";
      state.attachmentSkilUrl = baseurl + "uploads/attachments/";
      state.fileUploadUrl = baseurl + "fileupload.php";
      // state.designationImportUrl = uaturl + "api/Excel_Upload.php";


      state.pcdurl = APIurl + "PCDController.php";
      state.pdfurl = baseurl + "tcpdf/";
      state.indentUrl = APIurl + "IndentController.php";
      state.invoiceUrl = APIurl + "InvoiceController.php";
      state.commonUrl = APIurl + "CommonController.php";
      state.bomCopyUrl = APIurl + "VersioningController.php";
      state.bomHeaderUrl = APIurl + "BOMController.php";
      state.stockUrl = APIurl + "StockController.php";
      state.batchUrl = APIurl + "BatchstructureController.php";
      state.finalinvUrl = APIurl + "FinalInvoiceController.php";
      state.proformainvUrl = APIurl + "ProfoinvoiceController.php";
      state.orderUrl = APIurl + "CustomerOrder.php";
      state.stockReqUrl = APIurl + "StockRequirement.php";
      state.productUrl = APIurl + "StockProcedure.php";
      state.bomLkUrl = APIurl + "BOMLeatherCountController.php";
      state.designPUrl = APIurl + "UomconversiongetController.php";
      state.costingMatrialUrl = APIurl + "BomcostController.php?";
      state.conversionUrl = APIurl + "UomconversiongetController.php";
      state.userGroupUrl = APIurl + "GroupaccessController.php";
      state.dcTrackingUrl = APIurl + "DctrackingController.php";
      state.trackingUrl = APIurl + "MaterialtrackingController.php";
      state.supplierTrackUrl = APIurl + "SuppliertrackingController.php";
      state.materialsTrackingUrl = APIurl + "MaterialTrackingChart.php";
      state.supplytrackingUrl = APIurl + "SupplierTrackingChart.php";
      state.producttrackingUrl = APIurl + "ProductpriceController.php?";
      state.customerorderanalysisUrl = APIurl + "CustomerOrderChart.php?";
      state.prductorderanalysisUrl = APIurl + "ProductOrderChart.php?";
      state.mailContentGeturl = APIurl + "EmailController.php";
      state.mailSendUrl = APIurl + "invoicemail.php";
      state.materialUomCovUrl = APIurl + "MaterialUOMConversionController.php";
      state.decryptUrl = APIurl + "HashtokenController.php";
      state.costingLeatherUrl = APIurl + "BomLeathercost.php";
      state.customerLeatherUrl = APIurl + "CustomerLeatherController.php";
      state.getempdeploymentUrl = APIurl + "getempdeployment.php?";
      state.postempdeployment = APIurl + "postempdeployment.php?";
      state.matProcurementUrl = APIurl + "MaterialProcurementChart.php";
      state.stockorderUrl = APIurl + "MaterialOrderReportController.php";
      state.dcsummaryUrl = APIurl + "getdcsummary.php";
      state.dcpostsummaryUrl = APIurl + "postdcsummary.php";
      state.packinglistCbmUrl = APIurl + "CbmCalculation.php";
      state.searchUrl = APIurl + "productSearch3.php";
      // searchUrl='http=//localhost=8080/MYPROJECT/bgems-api/productSearch.php';
      state.jobworkbomurl = APIurl + "JobworkController.php";
      state.alterNateMaterial = APIurl + "AlterMaterialController.php";
      state.PurchaseOrderParameterUrl = APIurl + "APIController.php";
      state.PurchaseorderratingUrl = APIurl + "ParametergetController.php";
      state.CustomerPriceorderQtyUrl = APIurl + "InternalorderController.php";
      state.apiweightageUrl = APIurl + "HRWeightagesGetContoller.php";
      state.weightagepostUrl = APIurl + "HRWeightagesContoller.php";
      state.employeeattendanceUrl = APIurl + "getempattendancehistory.php";
      // state.payrollattendanceUrl = APIurl + "PayrollAttendanceController.php";
      state.payrollattendanceUrl = APIurl + "EmpPayrollAttendanceController.php";
      state.attendanceUrl = APIurl + "getempattendance.php";
      state.attendanceprocessUrl =
        APIurl + "EmpAttendanceHistoryController.php";
      state.regularizationUrl = APIurl + "APIController.php?";
      state.settingsgetUrl = APIurl + "HRSubscriptionCodeGetController.php";
      state.settingsPostUrl = APIurl + "HRChangePasswordController.php";
      //sprintget
      state.SprintgetUrl = APIurl + "SprintHeaderandDetailController.php";
      state.SprintPPGetUrl = APIurl + "SprintProjectPlanGetController.php";
      state.regGetUrl = APIurl + "RegularizationGetController.php";
      //payrollattendanceUrl= APIurl + "PayrollAttendanceController.php";
      state.leavelApprovalUrl = APIurl + "EmployeeRequestUpdateController.php";
      state.requestAcknowledgeUrl = APIurl + "LeaveRequest.php";
      state.monthlyattendanceUrl = APIurl + "GetdatewiseEmpattendance.php";
      state.biometricgetUrl = APIurl + "BioMetricConfigrationGetContoller.php";
      state.biometricPostUrl =
        APIurl + "BioMetricConfigrationUpdateContoller.php";
      state.partyBankUrl = APIurl + "PartyBankGetController.php";
      state.partyBankPostUrl = APIurl + "PartyBankUpdateController.php";
      state.partyContactgetUrl = APIurl + "PartyContractGetControllerV1.php";
      state.partyContactPostUrl =
        APIurl + "PartyContractUpdateControllerV1.php";
      state.settingsapprovalGetUrl = APIurl + "getcompanyapprovals.php";
      state.settingsapprovalPOSTtUrl = APIurl + "postcompanyapprovals.php";
      state.getLeaveweeklyDataUrl = APIurl + "LeaveWeeklyController.php";
      state.timesheetattendanceUrl = APIurl + "DailyTaskgetController.php";
      state.timesheetreportattendanceUrl =
        APIurl + "Dailytask_getController.php";
      state.timesheetdtUrl = APIurl + "DailyTaskpostController.php";
      state.empAttachmentUrl = baseurl + "EmployeeAttachmentsController.php";
      // empAttachmentUrl= baseurl + "EmployeeAttachmentsControllerV1.php";
      state.empGetAttachmentUrl = APIurl + "getAttachmentsController.php";
      state.getLeaveentryDataUrl =
        APIurl + "EmpLeaveConfigurationGetController.php";
      state.geolocationgetUrl = APIurl + "EmpGeoLocationGet.php";
      state.geolocationupdateUrl = APIurl + "EmpGeoLocationUpdate.php";
      state.LeaveTypeurl = APIurl + "APIController.php";
      state.subsNewUrl = APIurl + "SubscriptionPostController.php";
      state.AssessmentAutoUrl = APIurl + "ScheduleAssessmentLookup.php";
      state.InsightsUrl1 = APIurl + "InsightGetController.php";
      state.InsightsUrl2 = APIurl + "InsightEmpPerformance.php";
      state.ProjectCostingPDF = APIurl + "ProjectCostingReport.php";
      state.ScheduleGetController = APIurl + "ScheduleGetController.php";
      state.AppraisalScheduleGetcontroller =
        APIurl + "AppraisalScheduleGetcontroller.php";
      state.Leadergeturl = APIurl + "LeaderGetController.php";
      //VendorRegistration=  APIurl + "vendorregistration.php";
      state.VendorRegistration = APIurl + "vendorregistrationV1.php";
      state.VendorRegistrationGet = APIurl + "vendorregistrationGet.php";
      state.VendorDefaultPUT = APIurl + "vendordefault.php";
      state.VendorDefaultGET = APIurl + "vendordefaultGet.php";
      state.DefaultProductDeliveryChargeGet =
        APIurl + "DefaultProductDeliveryChargeGet.php";
      //OrderdetailReport=  APIurl + "OrderdetailReportV7.php";
      state.OrderdetailReport = APIurl + "OrderdetailReport.php";
      //OrderdetailReport=  APIurl + "OrderdetailReportMV1.php";
      state.ItemMainMenu = APIurl + "ItemMainMenu.php";
      state.ItemFlagMenu = APIurl + "ItemFlagMenu.php";
      state.ItemMainGETFetchData = APIurl + "ItemMainMenuGet.php";
      state.ItemFlagMenuGet = APIurl + "ItemFlagMenuGet.php";
      state.ItemFlagMenuPut = APIurl + "ItemFlagMenu.php";
      state.ItemStockMenuGet = APIurl + "ItemStockMenuGet.php";
      state.ItemStockMenuPut = APIurl + "ItemStockMenu.php";
      // VendorFilterController= APIurl + "VendorFilterController.php";
      state.VendorFilterController = APIurl + "VendorFilterController.php";
      // UserActivityUrl = essURL + "UserActivityController.php";
      state.UserActivityUrl = APIurl + "UserActivityController.php";
      state.LeaveenquiryGetController = APIurl + "HrEmployeeLeaveGetController.php";
      state.OHPaymentUpdateController =
        APIurl + "OHPaymentUpdateController.php";
      state.PartyBydateByamtFilter =
        APIurl + "PartyBydateByamtFilter.php";
      state.UserActivityGet = APIurl + "UserActivityGetController.php";
      state.auditScreennameGet = APIurl + "ListviewHdrGetController.php";
      state.EmployeeVendorGetController = APIurl + "ParentGetController.php";
      state.EmployeeVendorContactGet = APIurl + "ParentContactGetController.php";
      state.ExcelFileDownload = APIurl + "ExcelFileDownload.php";
      state.ExcelFileUpload = APIurl + "ExcelFileUpload.php";
      state.Setup_MenuExcel = APIurl + "SetupMenu.php";
      state.Parentposturl = APIurl + "ParentpostController.php";
      state.Processposturl = APIurl + "EmpPayrollAttendancePostController.php"
      state.PayslipGetController = APIurl + "PayslipGetController.php";
    },
  },
});

export const { initGlobalUrl } = getUrlSlice.actions;
export default getUrlSlice.reducer;
