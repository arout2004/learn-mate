import { Options } from "@material-table/core";

export const MuiTblOptions = () => {
  const options: Options<any> = {
    headerStyle: {
      fontFamily: "inherit",
    },
    rowStyle: {
      backgroundColor: "#fff",
      color: "#000000",
      fontWeight: "500",
      fontSize: "1rem",
    },

    actionsColumnIndex: -1,
    addRowPosition: "first",
    pageSize: 5,
    detailPanelColumnAlignment: "right",
    exportAllData: true,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({
      color: "secondary",
    }),
    // exportMenu: [
    //   {
    //     label: "Export All Data In CSV",
    //     exportFunc: (cols: any, data: any) => ExportCsv(cols, data, "AllData"),
    //   },
    //   {
    //     label: "Export All Data In PDF",
    //     exportFunc: (cols: any, data: any) => ExportPdf(cols, data, "AllData"),
    //   },
    // ],
  };
  return options;
};
