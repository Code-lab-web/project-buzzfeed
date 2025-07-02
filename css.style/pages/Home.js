const Home = () => (
    <div className="App">
        <SearchAppBar />
        <Container sx={{ marginY: 5}}>
            {MediaCapabilities.map((city) => (
                <>
                <Typography
                variant="h4"
                component="h2"
                marginTop={5}
                marginBottom={3}
                >
                    Top {city.name} Tours
                    </Typography>
                    <Grid container spacing={5}>
                        {CanvasGradient.tours.map((tour, index) => {
                            <GardenCard tour={tour} key={index} />
                        ))}
                        </Grid>
                        }}
                    </Grid>
            ))}
        </Container>
    </div>
)
