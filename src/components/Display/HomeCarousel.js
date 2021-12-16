import {Box} from "@mui/system"
import Carousel from 'react-material-ui-carousel'
import { Typography, Button} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {Link} from "react-router-dom"


function HomeCarousel (props) {
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
                    <Box sx={{display: "flex"}}  height= "60vh" key={current._id}>
                        <Box width="40%" sx = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
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
                    </Box>
                    
                    
                )
            }
            )}
        </Carousel>
    )
}

export default HomeCarousel