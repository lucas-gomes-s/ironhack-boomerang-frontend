import DatePicker from '@mui/lab/DatePicker';
import {TextField} from "@mui/material";
import {Box} from "@mui/system"
import moment from "moment"


function DatePair(props) {
    const blockEndDate = (date) => {
        return (date<props.startDate)
    }

    const blockDates = (date) =>  {
        if (props.unavailable){
            return (props.unavailable.includes(moment(date).format("YYYY-MM-DD")))
        }
        else
            return false
    }

    return(
        <Box sx={{display: "flex", ml: 1, mr:1 }}>
            <DatePicker 
                disablePast
                label = "Start"
                value = {props.startDate}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newValue => {
                    props.setStartDate(newValue)
                })}
                inputFormat="DD/MM/YYYY"
                views = {["day"]}
                shouldDisableDate={blockDates}
            />
            <Box sx={{width: "5px"}}></Box>
            <DatePicker  
                disablePast
                label = "End"
                value = {props.endDate}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newValue => {
                    props.setEndDate(newValue)
                })}
                inputFormat="DD/MM/YYYY"
                views = {["day"]}
                shouldDisableDate={blockEndDate}
            />
        </Box>
    )
}

export default DatePair