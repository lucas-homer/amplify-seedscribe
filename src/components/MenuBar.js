import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerTitle: {
    padding: "1rem",
  },
  menuButton: {
    padding: "1rem",
  },
};

function MenuBar() {
  return (
    <div className={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={styles.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={styles.headerTitle}
          >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuBar;
