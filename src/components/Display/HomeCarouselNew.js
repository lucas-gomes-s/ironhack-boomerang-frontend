import {Box} from "@mui/system"
import Carousel from 'react-material-ui-carousel'
import { Typography, Button, Grid} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {Link} from "react-router-dom"


function HomeCarouselTwo (props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const bgc = [
        "#F5F5F5",
        "#A56DFF",
        "#0E153A"
    ]

    const titleColor = [
        "#D32F7D",
        "#22252C",
        "white"
    ]

    const textColor = [
        "#A56DFF",
        "#F5F5F5",
        "#D32F7D"
    ]


    return(
        <Carousel>
            {props.objects.map((current,index) => {
                let position = index%3
                return (
                    isSmallScreen ?
                    
                        <Box height="60vh" sx={{backgroundColor: bgc[position], display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <Typography variant="h5" color={titleColor[position]} align="center">
                                {current.name}
                            </Typography>
                            <Box sx={{mx: "auto", display: "flex", justifyContent:"center"}}>
                                <img
                                    src = {current.img}
                                    alt = {current.name}
                                    width = "80%"
                                    maxHeight="10vh"
                                />
                            </Box>
                            <Typography color={textColor[position]} align="center">
                                {current.description}
                            </Typography>
                            <Box sx={{display: "flex", justifyContent:"center"}}>
                                <Link to = {`/category/${current._id}`} className="clean-link" style={{color: titleColor[position], textAlign: "center"}}  > 
                                        Check it Out    
                                </Link>
                            </Box>

                        </Box>

                    :
                    <Link to={`/category/${current._id}`} className="clean-link">
                        {position === 0?
                            <Grid container height= "60vh" key={current._id}> 
                                <Grid item xs={4} className="bgc-0 flex-row-center">
                                    <img
                                        src = {current.img}
                                        alt = {current.name}
                                        width = "100%"
                                        style={{margin: "auto"}}
                                    />
                                </Grid>

                                <Grid item xs={4} sx = {{p:2}} className="flex-row-center bgc-3">
                                    <Typography variant="h3" color="white" align="center">
                                        {current.name}
                                    </Typography>

                                </Grid>

                                <Grid item xs={4} sx = {{p:2}} className="flex-row-center bgc-2">
                                    <Typography variant="h5" color="#A56DFF" align="center">
                                        {current.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            :
                            position === 1 ?
                                <Grid container height= "60vh" key={current._id}> 
                                    <Grid item xs={4} sx = {{p:2}} className="bgc-3 flex-row-center">
                                        <Typography variant="h3" color="white" align="center">
                                            {current.name}
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={4} className="flex-row-center bgc-0">
                                        <img
                                            src = {current.img}
                                            alt = {current.name}
                                            width = "100%"
                                            style={{margin: "auto"}}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx = {{p:2}} className="flex-row-center bgc-2">
                                        <Typography variant="h5" color="#A56DFF" align="center">
                                            {current.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container height= "60vh" key={current._id}> 
                                    <Grid item xs={4} sx = {{p:2}} className="flex-row-center bgc-3">
                                        <Typography variant="h3" color="white" align="center">
                                            {current.name}
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={4} sx = {{p:2}} className="bgc-2 flex-row-center">
                                        <Typography variant="h5" color="#A56DFF" align="center">
                                            {current.description}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4} className="flex-row-center bgc-0">
                                        <img
                                            src = {current.img}
                                            alt = {current.name}
                                            width = "100%"
                                            style={{margin: "auto"}}
                                        />
                                    </Grid>
                                </Grid>
                        }
                            </Link>

                    
                )
            }
            )}
        </Carousel>
    )
}

export default HomeCarouselTwo