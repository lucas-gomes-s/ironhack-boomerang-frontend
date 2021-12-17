import {Box} from "@mui/system"
import {useState} from "react"
//import {useMediaQuery, useTheme} from "@material-ui/core"


function ImageNavigator (props) {
    const [image, setImage] = useState(0) 
    //const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const handleClick = (event) => {
        setImage(event.target.id)
    }

    return(
        <>
        <Box sx = {{display: "flex", width:"auto", m:2, borderStyle: "solid"}}>
            <img
                src={props.images[image]}
                width= "100%"
                zIndex = "-1"
            />
            <Box 
            className = "flex-column" 
            height = "100px"
            width = "200px"
            sx={{position:"relative", zIndex:"1", float:"left", overflow: "auto", borderStyle: "solid"}
            }>
                {props.images.map((image, index) => {
                    return (
                        <img
                            id = {index}
                            key= {index}
                            src = {image}
                            onClick={handleClick}
                            width= "20%"
                            className = "hover-highlight"
                        />
                    )
                })
                
                }
            </Box>
        </Box>
        </>
    )
}

export default ImageNavigator