import { useContext } from "react";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#B388EB" }}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink href="/" passHref>
          <Link underline="none">
            <Typography variant="h6" noWrap color="#4381C1">
              Open Jira
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
