"use client";

import { Dialog, DialogContent, Grid } from "@mui/material";
import React from "react";

interface SavedChartsListComponentProps {
  onClose?: (view: boolean) => void;
  open?: boolean;
}

const SavedChartsListComponent: React.FC<SavedChartsListComponentProps> = ({
  onClose,
  open,
}) => {
  return (
    <React.Fragment>
      {open ? (
        <Dialog
          open={open}
          onClose={() => (onClose ? onClose(true) : "")}
          fullWidth
        >
          {/* <DialogTitle>Upload CSV</DialogTitle> */}
          {/* <DialogContent style={{ width: "46vw", height: "65vh" }}>
           
            
          </DialogContent> */}

          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: {
                xs: "column", // Apply column layout for extra small devices (mobile)
                sm: "row", // Apply row layout for small and larger devices
              },
              position: "relative",
            }}
          >
            {" "}
            <Grid item xs={12} mt={2} mb={15}>
              Saved Charts List Dialog box
            </Grid>
          </DialogContent>
        </Dialog>
      ) : (
        <Grid item xs={12} mt={2} mb={15}>
          Saved Charts List
        </Grid>
      )}
    </React.Fragment>
  );
};

export default SavedChartsListComponent;
