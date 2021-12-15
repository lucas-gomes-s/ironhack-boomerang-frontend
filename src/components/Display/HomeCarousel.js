import {Box} from "@mui/system"
import Carousel from 'react-material-ui-carousel'
import { Typography} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core";


function HomeCarousel (props) {
    const bgc = [
        "#F5F5F5",
        "#A56DFF",
        "#0E153A"
    ]

    const titleColor = [
        "#D32F7D",
        "#22252C",
        "#A56DFF"
    ]

    const textColor = [
        "#A56DFF",
        "#D32F7D",
        "#22252C"
    ]


    return(
        <Carousel height="100%">
            {props.objects.map((current,index) => {
                let position = index%3
                return (
                    <Box sx={{display: "flex"}} key={current._id}>
                            <>
                                <Box width="30vw" sx = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img
                                        src = {current.img}
                                        alt = {current.name}
                                        width = "100%"
                                    />
                                </Box>

                                <Box sx = {{backgroundColor: bgc[0], p:2, display: "flex", alignItems: "center", justifyContent: "center"}} width="30vw">
                                    <Typography variant="h3" color={titleColor[0]} align="center">
                                        {current.name}
                                    </Typography>
                                </Box>

                                <Box sx = {{backgroundColor: bgc[1], display: "flex", alignItems: "end", p:2}} width="30vw">
                                    <Typography variant="h5" color={titleColor[1]} align="center">
                                        {current.description}
                                    </Typography>
                                </Box>
                            </>

                        
                    </Box>
                    
                )
            }
            )}
        </Carousel>
    )
}

export default HomeCarousel