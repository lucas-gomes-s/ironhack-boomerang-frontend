import {Box} from "@mui/system"
import Carousel from 'react-material-ui-carousel'

function ImageCarousel (props) {

    return(
        <Carousel>
            {props.images.map((current,index) => {
                return (
                    <Box key= {index}>
                        <img
                            id = {index}
                            src = {current}
                            width = "100%"
                            alt = {index}
                        />
                    </Box>
                )
            }
            )}
        </Carousel>
    )
}

export default ImageCarousel