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
  const minDate = new Date("2023-06-05");
  // const maxDate = new const today = dayjs();
  const today = dayjs();
  return (
    <>
      <h2 className={styles.h2}>Tickets</h2>
      <div className="datePickerContainer" style={styles.inputContainer}>
        {/* <TextField label="Choose a date"></TextField> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={formData.date}
            defaultValue={today}
            views={["year", "month", "day"]}
            onChange={(e) => {
              const formattedDate = e.toISOString().split("T")[0];
              dispatch({
                //dispatch to the global formData obj. with new state value
                action: "UPDATE_FIELD",
                payload: { field: "date", value: formattedDate },
              });
            }}
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
{
  /* <TextField
        className={styles.inputField}
        type="date"
        helperText="Choose a date"
        value={formData.date}
        required
        onChange={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "UPDATE_FIELD",
            payload: { field: "date", value: e.target.value },
          })
        }
     
      /> */
}
{
  /* <DatePicker
        label="Select Date"
        value={formData.date}
        onChange={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "UPDATE_FIELD",
            payload: { field: "date", value: e.target.value },
          })
        }
        renderInput={(params) => <TextField {...params} />}
        minDate={minDate}
        maxDate={maxDate}
      > */
}
