import { Box, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import zoomInFilledIcon from "../../../assets/icons/zoom-in-filled.svg";
import zoomInIcon from "../../../assets/icons/zoom-in.svg";
import zoomOutFilledIcon from "../../../assets/icons/zoom-out-filled.svg";
import zoomOutIcon from "../../../assets/icons/zoom-out.svg";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const scrollbarWidth = 10;
const scrollbarHeight = 10;
const useStyles = makeStyles((theme) => ({
  zoomBar: {
    padding: "10px",
    width: "100%",
    display: "flex",
    gridGap: "10px",
    position: "absolute",
    zIndex: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomButton: {
    border: "none",
    borderRadius: "4px",
    width: "22px",
    padding: "3px",
    cursor: "pointer",
    "&:hover": {
      background: "#FFFFFF3D",
    },
  },
  assetsContent: {
     position: "absolute", 
    height: "calc(100%)",
    width: "100%",
    background: "rgb(82 86 89)",
    justifyContent: "center",
    overflowY: "auto",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: scrollbarWidth,
      height: scrollbarHeight,
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  pageCon: {
    backgroundColor: "rgb(82, 86, 89)",
    "& .react-pdf__Page__canvas": {
      width: "100%",
      margin: "0px auto",
    },
  },
  zoomIcons: {
    background: "rgb(0 0 0 / 65%)",
    borderRadius: "8px",
    padding: "6px",
    display: "flex",
    alignItems: "center",
  },
}));
interface file {
  src: string | undefined;
}

export default function PDFDisplay(props: file) {
  const css = useStyles();
  const [numPages, setNumPages] = useState<number>(1);
  const [scale, setScale] = useState(1);
  function onDocumentLoadSuccess(pdf: any) {
    setNumPages(pdf.numPages);
  }

  const [currentZoomType, setCurrentZoomType] = useState("width-fit");

  const containerRef = useRef<null | HTMLDivElement>(null);

  const maxScale = 4;
  const minScale = 0.5;

  const zoomIn = () => {
    setCurrentZoomType("zoom-in");
    if (scale <= maxScale) {
      setScale(scale + 0.1);
    }
  };
  const zoomOut = () => {
    setCurrentZoomType("zoom-out");
    if (scale >= minScale) {
      setScale(scale - 0.1);
    }
  };

  return (
    <>
      <div className={css.assetsContent} style={{ height: containerRef?.current?.offsetHeight }} ref={containerRef}>
        <Box className={css.zoomBar}>
          <Box mt={2} display="inline-block">
            <Typography className={css.zoomIcons} component="div">
              <Tooltip
                title={''}
              >
                {currentZoomType === "zoom-in" ? (
                  <img alt="zoom-in-filled" onClick={zoomIn} className={css.zoomButton} src={zoomInFilledIcon} />
                ) : (
                  <img onClick={zoomIn} alt="zoom-in" className={css.zoomButton} src={zoomInIcon} />
                )}
              </Tooltip>
              <Tooltip
                title={''}
              >
                {currentZoomType === "zoom-out" ? (
                  <img alt="zoom-out-filled" onClick={zoomOut} className={css.zoomButton} src={zoomOutFilledIcon} />
                ) : (
                  <img onClick={zoomOut} alt="zoom-out" className={css.zoomButton} src={zoomOutIcon} />
                )}
              </Tooltip>
            </Typography>
          </Box>
        </Box>
        <Document file={props.src} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              scale={scale}
              className={css.pageCon}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ))}
        </Document>
      </div>
    </>
  );
}
