import React from 'react'
import { Paper, Typography,Box} from "@mui/material";
import Image from "../images/hero.jpg";
function Hero() {
  return (
    <Box  sx={{backgroundColor: 'black', width: 1}}>
    <Paper sx={{ display:"flex",justifyContent: "center",alignItems: "center",textAlign: "center",verticalAlign: "middle",
     backgroundImage: `url(${Image})`, height:"800px",backgroundSize: 'cover',backgroundPosition: 'center'}}>
    <Box>
      <Typography variant="h3" sx={{color:"white",backgroundColor:"black"}}>AI - powered customized learning plans</Typography>
      <Typography variant="h5" sx={{fontWeight: 'bold',letterSpacing: 6,backgroundColor:"white"}}>stay ahead of the curve</Typography>
    </Box>  
    </Paper>
    </Box>
  )
}

export default Hero;