import { AppBar, Toolbar, Typography, Button, IconButton,Box,useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";


import {  
   useMediaQuery
  
  } from "@mui/material";
const Navbar = (props) => {
  // const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));    
    const userdata=JSON.parse(localStorage.getItem('Profile'))
    const navigate=useNavigate()
    const handleLogout = (e) => {
      // dispatch(setUser(null))
      localStorage.removeItem('Profile');

      navigate('/Login')
    };


    const handleHistory = (e) => {

      let userdata=JSON.parse(localStorage.getItem('Profile'))

      if(userdata!==null){

      navigate('/History')
      }
      else{
        navigate('/Login')
      }
    };

    
  return (
    <AppBar position="static" sx={{
      width: isMobile ? "180%" : isTablet ? "135%" : isLargeScreen ? "100%" : "100%",
      margin: "0 auto",
    }}>
      <Toolbar>
       
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ChatBot
          </Typography>

          {/* Search and Status Select */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        

{ (userdata!==null) ?


            <Button size="small" onClick={handleHistory} variant="contained">
              History
            </Button>:''

}
         <Button size="small" onClick={handleLogout} variant="contained">
          Logout
         </Button>
         </Box>
        
              </Toolbar>
    </AppBar>
  );
};

export default Navbar;