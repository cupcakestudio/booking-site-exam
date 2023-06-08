import React, { useContext } from "react";
import { InputLabel, TextField, Select, MenuItem } from "@mui/material";
import styles from "../styles/Form.module.css";
import { formDataContext } from "@/contexts/bookingContext";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// import { startOfDay } from "date-fns";
export default function TicketsSection() {
  //context call for the child component
  const { formData, dispatch } = useContext(formDataContext);

  //set festival possible date range here
  const minDate = new Date("2023-07-10"); //format must be YYYY-MM-DD
  const maxDate = new Date("2023-07-24");
  //prefilled default value set to 'today's date'
  const startofFestival = dayjs("2023-07-10");
  const isOutofRange = (date) => {
    //this checks if the dates returned by dayjs are not inbetween given range (min and maxDate  (to incl the maxDate))
    return !dayjs(date).isBetween(minDate, maxDate, null, "[]"); // Disable dates outside the range
  };
  // const startOutOfRange = dayjs().startOf(minDate);

  // const lastMonday = dayjs().startOf("week");
  return (
    <>
      <h2 className={styles.h2}>Tickets</h2>
      <div className="datePickerContainer" style={styles.inputContainer}>
        {/* <TextField label="Choose a date"></TextField> */}
        {/* FROM MUI DOCS about DATEPICKER component and validation*/}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={` ${styles.MuiIconButtonRoot}`}
            required
            label="Choose a date "
            value={formData.date}
            defaultValue={startofFestival}
            // maxDate={maxDate}

            shouldDisableDate={isOutofRange} //shouldDisableDate bool
            views={["day"]} //which calendar views is available also how the calendar UI is.
            //register change in field and dispatch to the conText
            onChange={(e) => {
              //split the string on the time format: 2022-01-01T00:00:00.000
              const formattedDate = e.toISOString().split("T")[0];
              dispatch({
                //dispatch to the global formData obj. with new state value
                action: "UPDATE_FIELD",
                payload: { field: "date", value: formattedDate },
              });
            }}
            helperText="Choose a date between 10th July 2023 and 24th July 2023"
            renderInput={(params) => (
              <TextField {...params} value={formData.date} />
            )}
          />
        </LocalizationProvider>
      </div>
      {/* <DatePicker
        label="Choose a date"
        value={formData.date}
        onChange={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "UPDATE_FIELD",
            payload: { field: "date", value: e.target.value },
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            className={styles.inputField}
            helperText="Choose a date"
            required
          />
        )}
        minDate={minDate}
        maxDate={maxDate}
      /> */}

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
