import "./App.css";
import { Container} from "@mui/material";
import Dashboard from "./components/Dashboard";
import {Typography, AppBar} from '@mui/material';
import Hero from "./components/Hero";
function App() {
  return (
    <Container maxWidth={false}>
      <AppBar position="fixed" sx={{ p: 1, backgroundColor: "#69a832" }}>
        <Typography variant="h5" sx={{ px: 1, fontWeight: 700}}>LessonBuddy</Typography>
        <Typography variant="h7" sx={{ px: 1 }}>building lesson plans for educators</Typography>
      </AppBar>
      <Hero/>
     <Dashboard/>
    </Container>
  );
}

export default App;
