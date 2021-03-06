import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  List as ListIcon,
  XCircle as XCircleIcon,
  Briefcase as Briefcase,
  Clipboard as ClipboardIcon,
  Truck as TruckIcon,
  Coffee as coffee,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const user = {
  username: "Username",
  name: "Katarina Smith",
};

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  status: {
    fontSize: ".95em",
    fontWeight: 800,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  const ShowStatus = () => {
    let Status;
    if (["VIP", "DELIVERER", "CHEF", "MANAGER"].includes(role)) {
      Status = () => <span>{role}</span>;
    } else {
      Status = () => <span>REGULAR CUSTOMER</span>;
    }
    return (
      <div className={classes.status}>
        Status: <Status />
      </div>
    );
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const customerSidebar = (
    <List>
      <NavItem
        href="/customer/balance"
        key="Add Balance"
        title="Add Balance"
        icon={DollarSignIcon}
      />
      <NavItem
        href="/customer/orders"
        key="Order History"
        title="Order History"
        icon={ListIcon}
      />
      <NavItem href="/customer/info" key="Info" title="Info" icon={UserIcon} />
      <NavItem
        href="/customer/reservations"
        key="Reservations"
        title="Reservations"
        icon={CheckCircleIcon}
      />
      <NavItem
        href="/myReviews"
        key="Reviews"
        title="Reviews"
        icon={ListIcon}
      />
    </List>
  );

  const delivererSidebar = (
    <List>
      <NavItem
        href="/employee/jobs"
        key="Jobs"
        title="Job Center"
        icon={Briefcase}
      />

      <NavItem
        href="/employee/currentJobs"
        key="CurrentJobs"
        title="Accepted Jobs"
        icon={TruckIcon}
      />

      <NavItem
        href="/myReviews"
        key="Reviews"
        title="Reviews"
        icon={ListIcon}
      />

      <NavItem
        href="/employee/rateCustomer"
        key="RateCustomer"
        title="Rate a Customer"
        icon={StarIcon}
      />
    </List>
  );

  const chefSidebar = (
    <List>
      <NavItem
        href="/employee/createDish"
        key="Create Dish!"
        title="Create Dish!"
        icon={coffee}
      />
      <NavItem
        href="/employee/CookJobs"
        key="Cook Jobs"
        title="Cook Jobs"
        icon={coffee}
      />
    </List>
  );

  const managerSidebar = (
    <List>
      <NavItem
        href="/employee/users"
        key="All Users"
        title="All Users"
        icon={UsersIcon}
      />
      <NavItem
        href="/employee/taboo"
        key="Taboo Words"
        title="Taboo Words"
        icon={XCircleIcon}
      />
      <NavItem
        href="/employee/complaints"
        key="Complaints"
        title="Complaints"
        icon={ClipboardIcon}
      />
      <NavItem
        href="/employee/managerorders"
        key="Orders"
        title="Orders"
        icon={ListIcon}
      />
    </List>
  );

  const customerAvatar = (
    <Avatar
      className={classes.avatar}
      component={RouterLink}
      to={"/customer"}
    />
  );

  const employeeAvatar = (
    <Avatar
      className={classes.avatar}
      component={RouterLink}
      to={"/employee"}
    />
  );

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        {role === "MANAGER" || role === "CHEF" || role === "DELIVERER"
          ? employeeAvatar
          : customerAvatar}
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
          style={{ marginTop: "16px" }}
        >
          <ShowStatus />
        </Typography>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          Username: {username}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {role === "CUSTOMER" || role === "VIP"
          ? customerSidebar
          : role === "MANAGER"
          ? managerSidebar
          : role === "DELIVERER"
          ? delivererSidebar
          : role === "CHEF"
          ? chefSidebar
          : null}
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
