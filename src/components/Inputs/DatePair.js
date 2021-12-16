import DatePicker from '@mui/lab/DatePicker';
import {TextField, Grid} from "@mui/material";
import {Box} from "@mui/system"
import moment from "moment"


function DatePair(props) {
    const blockEndDate = (date) => {
        return (
            !props.showCalendar
            ||
            date<props.startDate
            ||
            props.offdays.includes(moment(date).day())
            ||
            (props.unavailable.filter(value => {
                return moment(value, "YYYY-MM-DD").format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")  
            }).length > 0)
            )
    }

    const blockDates = (date) =>  {
        return (
            !props.showCalendar
            ||
            props.unavailable.includes(moment(date).format("YYYY-MM-DD"))
            ||
            props.offdays.includes(moment(date).day())
            ||
            (props.unavailable.filter(value => {
                return moment(value, "YYYY-MM-DD").format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")  
            }).length > 0)
            )
    }

    return(
        <Grid container spacing={2} sx={{mb: 1}}>
            <Grid item xs={6} >
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
            </Grid>
            <Grid item xs={6} >
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
            </Grid>
        </Grid>
    )
}

export default DatePair