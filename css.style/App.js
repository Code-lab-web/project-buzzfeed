import SGG.png from './SGG.png';
import './App.css';
import GardenCard from "./components/GardenCard"
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid"
import { Container, Grid }from "@mui/material"
function App() {
    return (
        <div className="App">
            <SearchAppBar />
            <Container margin sx = margin {5}>
                <Grid container spacing={(5>
                    <GardenCard />
                    <GardenCard/>
                    <GardenCard/>
                    <GardenCard/>
                    </Grid>
                )}
            
            <Container>
                <Garden container spacing={5}>
                    <GardenCard />
                    </Grid>
                </Garden>
            </Container>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</</code> and save to reload.
                    </p>
                    <a
                    className="App-link"
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