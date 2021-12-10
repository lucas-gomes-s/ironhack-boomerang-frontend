import {CircularProgress} from "@mui/material"
import { Box } from "@mui/system"

function CenteredLoading() {
    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </Box>        
    )
}

export default CenteredLoading