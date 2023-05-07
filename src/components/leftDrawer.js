import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import styled from "@emotion/styled";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { logout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { BoyOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";

const Container = styled.div`
  .MuiTypography-body1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
`;

export const MenuContainer = styled.div`
  background: #000000;
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const FeedContainer = styled.div`
  background: #3549ff;
  border-radius: 3.75px;
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Border = styled.div`
  margin-top: 20px;
  border-bottom: 0.5625px solid #c6c6c6;
  height: 0;
`;

export const IconsContainer = styled.div`
  background: #ffffff;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 3px -22.5px 36px rgba(51, 51, 51, 0.1);
`;

export const IconContainer = styled.div`
  background: #f4f8f9;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40px;
  height: 40px;
  margin: 5px 0;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const NewsOrg = styled.img`
  width: 100px;
  margin: 20px 0;
`;

const Category = styled.h3`
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 15px;

  /* identical to box height, or 83% */

  color: #000000;
  padding-left: 20px;
`;

const ListI = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
`;

const Account = styled.div`
  height: 60px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DrawerContainer = styled.div`
  .MuiDrawer-paper {
    padding: 0px !important;
  }
  .MuiPaper-root {
    padding: 0 !important;
  }
`;

const Img = styled.img`
  height: 40px;
  display: block;
  margin-left: 10px;
`;

const Name = styled.h6`
  color: #ffffff;
`;
export default function LeftDrawer({ state, setState }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const toggleDrawer = () => (event) => {
    setState(!state);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const ListA = (anchor) => (
    <Box
      sx={{ width: 250, cursor: "pointer" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Account>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ width: "100%", marginLefr: "0", marginTop: "0" }}
        >
          <Grid sm={3} xs={3}>
            <Img
              src="https://lh3.googleusercontent.com/a/AGNmyxY9RiRcvXurFSefCpIZl_loDW8VUJREU3Aej0a_Efd8qSmw7o4vzK-Uq88VQZ16JnBnBCxdBWuhwwQVD5q6hQ=s288"
              alt=""
            />
          </Grid>
          <Grid sm={6} xs={6}>
            <Name>{user && user.username}</Name>
          </Grid>
          <Grid sm={3} xs={3}>
            <ChevronRightOutlinedIcon style={{ color: "#FFFFFF" }} />
          </Grid>
        </Grid>
      </Account>
      <Container>
        <ListI>
          <AccountBalanceWalletOutlinedIcon style={{ width: "60px" }} /> My
          Balance
        </ListI>
        <ListI onClick={() => handleLogout()}>
          <LogoutIcon style={{ width: "60px" }} /> Logout
        </ListI>
        <ListI>
          <BoyOutlined style={{ width: "60px" }} /> Find People
        </ListI>
        <ListI>
          <SportsEsportsOutlinedIcon style={{ width: "60px" }} /> How to Play
        </ListI>
        <ListI>
          <GroupsOutlinedIcon style={{ width: "60px" }} /> Champions Club
        </ListI>
        <ListI>
          <SettingsOutlinedIcon style={{ width: "60px" }} />
          My Info & Settings
        </ListI>
        <ListI>
          <MoreHorizOutlinedIcon style={{ width: "60px" }} />
          more
        </ListI>
        <ListI>
          <HelpOutlineOutlinedIcon style={{ width: "60px" }} />
          Help & Support
        </ListI>
      </Container>
    </Box>
  );

  return (
    <React.Fragment>
      <DrawerContainer>
        <Drawer
          open={state}
          onClose={toggleDrawer(false)}
          style={{ padding: "0 !important" }}
        >
          <ListA />
        </Drawer>
      </DrawerContainer>
    </React.Fragment>
  );
}
