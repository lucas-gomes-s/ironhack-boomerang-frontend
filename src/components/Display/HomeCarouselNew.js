import Carousel from 'react-material-ui-carousel'
import { Typography, Grid} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {Link} from "react-router-dom"


function HomeCarouselTwo (props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    return(
        <Carousel>
            {props.objects.map((current,index) => {
                let position = index%3
                return (
                    isSmallScreen ?
                        <Link to={`/category/${current._id}`} className="clean-link">
                            <Grid height="60vh" container className="bgc-0">
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="white" className="bgc-3" align="center">
                                        {current.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="flex-center">
                                    <img
                                        src = {current.img}
                                        alt = {current.name}
                                        width = "100%"
                                    />
                                </Grid>
                                <Typography color="#A56DFF" className="bgc-2 flex-row-center" align="center">
                                    {current.description}
                                </Typography>
                            </Grid>
                        </Link>

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