import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import hoistNonReactStatics from 'styled-components/dist/utils/hoist';
import { HouseRounded } from '@mui/icons-material';
import { AccessTime } from "@mui/icons-material"
import Rating from '@mui/material/Rating';
import { createTheme , ThemeProvider } from "@mui/material"
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { AccessTime } from "@mui/icons-material";
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        fontSize: 11,
                        backgroundColor:"blue"
                    },
                },
                {
                    props: {
                        variant: "body3",
                    },
                    style: {
                        fontSize: 9,
                    },
                },
            ],
        },
    },
});

const GardenCard = ({tour}) => {
    return (
        <Grid item xs={3}>
        <ThemeProvider theme={theme}>
            <Paper elevation={3}>
                <img src="Flower1.jpg" alt="Flower" className="img" />
                <Box paddingX={1}>
                    <Typography variant="subtitle1" component="h2">
                        Desert
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        marginTop={3}
                    >
                        <AccessTime sx={{ width: 12.5 }} />
                        <Typography variant="body2" component="p" marginLeft={0.5}>
                        {gardentour.duration} hours
                        <Rating
                            name="read-only"
                            value={tour.rating}
                            readOnly
                            precision={0.5}
                            size="small"
                        />
                        <Typography variant="body2" component="p" marginLeft={0.5}>
                            4.5
                        </Typography>
                        <Typography variant="body3" component="p" marginLeft={1.5}>
                            (655 reviews)
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6" component="h3" sx={{ marginTop: 1.5 }}>
                    Welcome
                </Typography>
                </Themeprovider>
            </Paper>
            </Grid>
        );
    }

export default GardenCard;