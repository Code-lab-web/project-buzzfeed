import SGG from './SGG.png';
import './App.css';
import GardenCard from "./components/GardenCard"
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
function App() {
    return (
        <div className="App">
            <SearchAppBar />
            <Container sx={{ margin: 5 }}></Container>
            <Container sx={{ margin: 5 }}>
                <Grid container spacing={5}>
                    <GardenCard />
                    <GardenCard />
                    <GardenCard />
                    <GardenCard />
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={5}>
                    <GardenCard />
                </Grid>
            </Container>
            <header>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                    <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Special Garden Group
                    </a>
                </p>
            </header>
        </div>
    )
}
export default App;