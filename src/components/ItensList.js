import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material"
import {Link} from "react-router-dom"
import { useTheme, useMediaQuery} from "@material-ui/core";
import {Box} from "@mui/system"

function ItensList(props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    return (
    <Box sx={{m: 2, display:"flex", justifyContent: "center"}}>
    <ImageList cols={isSmallScreen? 2 : 4} sx={{width:"80vw"}}>
        {props.itens.map(item => {
            return (
                <Link to={`/${props.link}/${item._id}`} className="clean-link" key={item._id}>
                    <ImageListItem>
                        <img
                            src = {item.img}
                            alt = {item.name}
                            loading = "lazy"
                        />
                        <ImageListItemBar
                            title = {item.name}
                        />
                    </ImageListItem>
                </Link>
            )
        })}
    </ImageList>
    </Box>
    )
}

export default (ItensList)