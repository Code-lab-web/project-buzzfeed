import SGG from './SGG.png';
import './App.css';
import GardenCard from "./components/GardenCard"
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import gardens from "./data.json"
import Typography from '@mui/material/Typography';
function App() {
    return (
        <div className="App">
            <SearchAppBar />
            <Container sx={{ marginY: 5 }}></Container>
            <Container sx={{ margin: 5 }}>
            {garden.map((garden) => (
                <Typography
                variant="h4"
                component="h2"
                marginTop={5}
                marginBottom={3}
                Top {garden.name} Tours
                </Typography>
                />
            ))>

            ))}
            )
                <Grid container spacing={5}>
                    {garden.tours.map((tour) => <GardenCard tour={tour} key={index}/>/)>})
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