import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material"
import {Link} from "react-router-dom"
import { useTheme, useMediaQuery} from "@material-ui/core";
import {Box} from "@mui/system"

function CategoryCard(props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    return (
    <Box sx={{m: 2}}>
    <ImageList cols={isSmallScreen? 2 : 4}>
        {props.category.map(category => {
            return (
                <Link to={`/category/${category._id}`} className="clean-link" >
                    <ImageListItem>
                        <img
                            src = {category.imgLogo}
                            alt = {category.name}
                            loading = "lazy"
                        />
                        <ImageListItemBar
                            title = {category.name}
                        />
                    </ImageListItem>
                </Link>
            )
        })}
    </ImageList>
    </Box>
    )
}

export default (CategoryCard)