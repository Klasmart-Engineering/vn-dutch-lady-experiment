import { Box, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";
import { pageLinks } from "./index";
import { getCurriculumData } from "./utils/api";
import vw from "./utils/vw.macro";

const useStyles = makeStyles({
  root: {
    backgroundColor: `#42BDFF`,
    width: `100vw`,
    height: `100vh`,
    backgroundImage: `url('${require(`@assets/stm/bg.jpg`)}')`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
  },
  title: {
    fontSize: vw(69),
    lineHeight: vw(86),
    paddingBottom: vw(54),
    fontFamily: `RooneySans, sans-serif`,
    fontWeight: 900,
    fontVariantNumeric: `lining-nums`,
    fontFeatureSettings: `tnum`,
    color: `#274EAF`,
  },
  itemContainer: {
    display: `flex`,
    alignItems: `stretch`,
    justifyContent: `center`,
    flexWrap: `wrap`,
    width: `100%`,
  },
  itemWrap: {
    display: `flex`,
    padding: `0 10px`,
    maxWidth: `calc(1/4 * 100% - 20px)`,
    width: `100%`,
  }
});

const IconButton = withStyles({
  root: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    width: `100%`,
    background: `#fff`,
    borderRadius: `50px 20px 50px 50px`,
    padding: `25px`,
    cursor: `pointer`,
    transition: `all 0.2s ease-in-out`,

    "& img": {
      maxHeight: `100%`,
      maxWidth: `100%`,
      borderRadius: `40px 15px 40px 40px`,
      // boxShadow: `0 0 10px rgba(0,0,0,0.1)`,
    },

    "&:hover": {
      transform: `scale(1.03)`,
      backgroundColor: `#fff`,
      borderColor: `none`,
      boxShadow: `none`,
    },

    "&:active": {
      boxShadow: `none`,
      backgroundColor: `none`,
      borderColor: `none`,
    },
  },
})(Button);

function CurriculumItem(props: { item: ICurriculumItem }) {
  const history = useHistory();
  return (
    <IconButton
      onClick={() => {
        history.push(pageLinks.level + `?curriculum=` + props.item.id);
      }}
    >
      <img src={props.item.thumbnail} alt={props.item.name}/>
    </IconButton>
  );
}

export default function SelectCurriculum() {
  const css = useStyles();
  const [curriculumData, setCurriculumData] = React.useState<ICurriculumItem[]>([]);
  React.useEffect(() => {
    getCurriculumData().then(data => setCurriculumData(data));
  }, [])
  return (
    <Box className={css.root}>
      <Typography className={css.title} variant="h3">
        Select your curriculum
      </Typography>
      <Box className={clsx(css.itemContainer)}>
          {curriculumData.map(item => (
            <Box className={clsx(css.itemWrap)} key={item.id}>
              <CurriculumItem item={item}/>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
