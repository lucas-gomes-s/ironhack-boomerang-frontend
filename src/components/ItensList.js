import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material"
import {Link} from "react-router-dom"
import { useTheme, useMediaQuery} from "@material-ui/core";
import {Box} from "@mui/system"

function ItensList(props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    return (
    <Box>
        <ImageList cols={isSmallScreen? 2 : 4} variant="woven">
            {props.itens.map((item,index) => {
                
                return (
                    index < props.display ?
                    <Link to={`/${props.link}/${item._id}`} className="clean-link" key={item._id}>
                        <ImageListItem>
                            <img
                                src = {item.img}
                                alt = {item.name}
                                loading = "lazy"
                                width = "50%"
                                maxHeight = "100%"
                            />
                            <ImageListItemBar
                                title = {item.name}
                                subtitle = {props.subtitle? item[props.subtitle] : null}
                            />
                        </ImageListItem>
                    </Link>
                    : 
                    null
                )
            })}
        </ImageList>
    </Box>
    )
}

export default (ItensList)