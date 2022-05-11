import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Button, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import MenuIcon from '@mui/icons-material/Menu';

import { IPublicClientApplication } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const pages = [{label: "Services", path: "/services"}, 
               {label: "Appointments", path: "/appointments"},
               {label: "Pets", path: "/pets"}];

const settings = [{label: "Profile", path: "/profile"},
                  {label: "Logout", path: "/logout"}];

//todo: move to separate compoenent
const handleLogin = (instance : IPublicClientApplication) => {
    instance.loginPopup(loginRequest).catch((e : any)=> {
        console.error(e);
    });
}

const handleLogout = (instance : IPublicClientApplication) => {
  instance.logoutPopup().catch((e : any)=> {
      console.error(e);
  });
}

const Header = () => {
  const {instance} = useMsal();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            noWrap
            component={Link}
            to={"/"}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
          <IconButton title="eVetClinic">
            <PetsIcon></PetsIcon>
          </IconButton>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.label.toLowerCase()} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  ><Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton title="eVetClinic">
              <PetsIcon></PetsIcon>
            </IconButton>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label.toLowerCase()}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={page.path}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}

              onClose={handleCloseUserMenu}
            >
              <UnauthenticatedTemplate>
                <MenuItem 
                  key="signIn"
                  onClick={() => {handleLogin(instance); handleCloseUserMenu();}}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>                
              </UnauthenticatedTemplate>
              <AuthenticatedTemplate>
                <MenuItem 
                    key="profile"
                    component={Link}
                    to="/profile"
                    onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>                 
                <MenuItem 
                    key="signOut"
                    onClick={() => { handleLogout(instance); handleCloseUserMenu();}}>
                    <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>             
              </AuthenticatedTemplate>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
