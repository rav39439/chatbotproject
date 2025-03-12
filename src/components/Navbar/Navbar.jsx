import { AppBar, Toolbar, Typography, Button, IconButton,Box,useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// import { addTask,getTask,setUser } from "../../redux/Actioins";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setTask } from "../../redux/Actioins";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns"; // Import format from date-fns

import {  Dialog,

  //  DialogActions,
  //  DialogContent,
  //  DialogTitle,
  //  TextField,
  //  MenuItem,
  //  Select,
  //  FormControl,
   useMediaQuery
  
  } from "@mui/material";
const Navbar = (props) => {
  // const dispatch = useDispatch();
  const allstatus = ["Completed","In Progress","Started"]; // Categories for the dropdown
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const priorities = ["Medium", "High", "Low"]; // Categories for the dropdown
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ taskTitle: '',priority:'Medium',duedate:'', taskdetails:'',taskstartedAt:new Date().toLocaleString(),taskendedAt:'', taskprogress:0,taskstatus:'Started',taskCategories:'',username:'',userid:'' });
    
    const handleClose = () => setOpen(false);
    const userdata=JSON.parse(localStorage.getItem('Profile'))

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    

    const handletitleChange = (e) => {
      // dispatch(setUser(null))
      // dispatch(getTask(userdata))
      if(e.target.value!==""){
        let taskupdated=props.duptasks.filter(d=>d.taskTitle.includes(e.target.value))
        // dispatch(setTask(taskupdated))
      }
      else{
        // dispatch(setTask(props.duptasks))

      }
    };



    const getId=()=>{
      let ids= props.tasks.map(d=>d.id)
      return Math.max(...ids)

    }
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