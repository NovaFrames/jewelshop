import React from "react";
import {
    Paper,
    BottomNavigation,
    BottomNavigationAction,
    Badge,
    Box,
} from "@mui/material";
import {
    HomeOutlined,
    CategoryOutlined,
    ShoppingBagOutlined,
    PersonOutline,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface MobileBottomNavProps {
    cartCount: number;
    onOpenDrawer: () => void;
    onProfileClick: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
    cartCount,
    onOpenDrawer,
    onProfileClick,
}) => {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    React.useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    return (
        <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1300,
                    borderTop: "1px solid #eee",
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_, newValue) => {
                        if (newValue !== "categories" && newValue !== "profile") {
                            setValue(newValue);
                        }
                    }}
                    sx={{
                        height: 64,
                        "& .MuiBottomNavigationAction-root": {
                            color: "#666",
                            minWidth: "auto",
                            padding: "6px 0",
                        },
                        "& .Mui-selected": {
                            color: "#832729 !important",
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "0.75rem",
                                fontWeight: 600,
                            },
                        },
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="/"
                        icon={<HomeOutlined />}
                        component={RouterLink}
                        to="/"
                    />
                    <BottomNavigationAction
                        label="Categories"
                        value="categories"
                        icon={<CategoryOutlined />}
                        onClick={onOpenDrawer}
                    />
                    <BottomNavigationAction
                        label="Cart"
                        value="/cart"
                        icon={
                            <Badge
                                badgeContent={cartCount}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        bgcolor: "#832729",
                                        color: "white",
                                        fontSize: "0.65rem",
                                        height: 16,
                                        minWidth: 16,
                                    },
                                }}
                            >
                                <ShoppingBagOutlined />
                            </Badge>
                        }
                        component={RouterLink}
                        to="/cart"
                    />
                    <BottomNavigationAction
                        label="Account"
                        value="profile"
                        icon={<PersonOutline />}
                        onClick={onProfileClick}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MobileBottomNav;
