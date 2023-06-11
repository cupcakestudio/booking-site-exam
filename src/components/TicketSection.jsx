import React, { useContext } from "react";
import { InputLabel, TextField, Select, MenuItem } from "@mui/material";
import styles from "../styles/Form.module.css";
import { formDataContext } from "@/contexts/bookingContext";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/da";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc); //dayjs extends with utc functionality package

export default function TicketsSection() {
  //context call for the child component
  const { formData, dispatch } = useContext(formDataContext);

  //set festival possible date range here

  const minDate = dayjs("2023-07-10").utc().startOf("day"); //account for timezome with utc() and begiining / end of day;

  const maxDate = dayjs("2023-07-24").utc().endOf("day");

  const isOutofRange = (date) => {
    //this checks if the dates returned by dayjs are not inbetween given range (min and maxDate  (to incl the maxDate))
    return (
      !dayjs(date).isBetween(minDate, maxDate, null, "[]") &&
      !dayjs(date).isSame(maxDate, "day")
    ); // Disable dates outside the range, only exclude the maxDate if it is not selected as choosen date
  };

  return (
    <>
      <h2 className={styles.h2}>Tickets</h2>
      <div className="datePickerContainer" style={styles.inputContainer}>
        {/* FROM MUI DOCS about DATEPICKER component and validation*/}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="da">
          <DatePicker
            className={` ${styles.inputField}`}
            required
            label="Choose a date"
            value={formData.date}
            defaultValue={dayjs("2023-07-10")} //write in format: YYYY-MM-DD
            shouldDisableDate={isOutofRange} //shouldDisableDate bool
            views={["day"]}
            //register change in field and dispatch to the context
            onChange={(e) => {
              //split the string on the time format: weekday, date, month, time 20:00:00
              const formattedDate = e.toLocaleString("daDK").split("20")[0]; //split to excl. time
              dispatch({
                //dispatch to the global formData obj. with new state value
                action: "UPDATE_FIELD",
                payload: { field: "date", value: formattedDate },
              });
              console.log(formattedDate);
            }}
            renderInput={(params) => (
              <TextField {...params} value={formData.date} />
            )}
          />
        </LocalizationProvider>
      </div>

      <InputLabel
        id="dropdown-label"
        label="ticket-type"
        placeholder="Ticket-type"
        className={styles.dropdownLabel}
        style={{ position: "relative" }}
      >
        Choose ticket type
      </InputLabel>
      <Select
        style={{ position: "relative" }}
        className={styles.inputField}
        labelId="ticket-type"
        id="dropdown"
        label="Ticket-Type"
        value={formData.ticketType}
        required
        onBlur={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "SET_TICKET_TYPE",
            payload: { ticketType: e.target.value },
          })
        }
      >
        <MenuItem value="Regular">Regular 799,-</MenuItem>
        <MenuItem value="VIP">VIP 1299,-</MenuItem>
      </Select>
      <br />
      <TextField
        className={styles.ticketNumber}
        type="number"
        label="Number of tickets"
        value={formData.ticketAmount}
        required
        onBlur={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "SET_TICKET_AMOUNT",
            payload: { ticketAmount: e.target.value },
          })
        }
        inputProps={{ min: 0 }}
      />
    </>
  );
}
