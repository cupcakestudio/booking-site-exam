import React, { useContext, useState } from "react";
import { Alert, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import styles from "../styles/Form.module.css";
import { formDataContext } from "@/contexts/bookingContext";
import RemoveButton from "./RemoveButton";
import AddButton from "./AddButton";

export default function OtherOptionsSection({ open, handleInfoClick }) {
  //consume the context
  const { formData, dispatch } = useContext(formDataContext);
  const [tents2Counter, setTents2Counter] = useState(0); // Counter for  tent
  const [tents3Counter, setTents3Counter] = useState(0);

  function incrementTents2() {
    const sleepingSpots = tents2Counter * 2 + tents3Counter * 3;
    if (formData.formData.ticketAmount >= sleepingSpots + 1) {
      const updatedCounter = tents2Counter + 1;
      setTents2Counter(updatedCounter);
      dispatch({
        action: "SET_TENTS2_AMOUNT",
        payload: { tents2Amount: updatedCounter },
      });
      dispatch({
        action: "UPDATE_FIELD",
        payload: { field: "tents2", value: updatedCounter },
      });
    }
  }

  function incrementTents3() {
    const sleepingSpots = tents2Counter * 2 + tents3Counter * 3;

    if (formData.formData.ticketAmount >= sleepingSpots + 1) {
      const updatedCounter = tents3Counter + 1;
      setTents3Counter(updatedCounter);
      dispatch({
        action: "SET_TENTS3_AMOUNT",
        payload: { tents3Amount: updatedCounter },
      });
      dispatch({
        action: "UPDATE_FIELD",
        payload: { field: "tents3", value: updatedCounter },
      });
    }
  }

  function removeTents2() {
    if (tents2Counter > 0) {
      const updatedCounter = tents2Counter - 1;
      setTents2Counter(updatedCounter);
      dispatch({
        action: "SET_TENTS2_AMOUNT",
        payload: { tents2Amount: updatedCounter },
      });
      dispatch({
        action: "UPDATE_FIELD",
        payload: { tents2: updatedCounter },
      });
    }
  }

  function removeTents3() {
    if (tents3Counter > 0) {
      const updatedCounter = tents3Counter - 1;
      setTents3Counter(updatedCounter);
      dispatch({
        action: "SET_TENTS3_AMOUNT",
        payload: { tents3Amount: updatedCounter },
      });
      dispatch({
        action: "UPDATE_FIELD",
        payload: { field: "tents3", value: updatedCounter },
      });
    }
  }

  return (
    <>
      <h2 className={styles.h2}>Other options</h2>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Green Option +249,-"
          //send a dispatch on changes
          onChange={(e) => {
            const { checked } = e.target;
            //modified with chatgpt
            dispatch({
              action: "UPDATE_FIELD",
              payload: { field: "green", value: checked },
            });
            dispatch({ action: "GREEN", payload: { isChecked: checked } });
          }}
        />{" "}
        <div className={styles.tentOption}>
          <FormControlLabel
            control={<Checkbox />}
            label="Tent setup"
            /* checked er en konstant som ser efter havd der bliver klikket på og dispatch sender staten med payloaden med check staten og ændre det i vores globale obj. */
            onChange={(e) => {
              const { checked } = e.target;
              dispatch({
                action: "TENT_SETUP",
                payload: { isTentChecked: checked },
              });
            }}
          />
          <div onClick={handleInfoClick} style={{ display: "inline-block" }}>
            <div>
              {/* open er en state(fra MainTicket) der tjekker om info beskeden er åben eller ej. && bruges til at render/bygge vores indhold. */}
              {!open && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              )}
            </div>
            {open && (
              <div>
                {/* Mui modal med besked om info og priser */}
                <Alert severity="info" sx={{ backgroundColor: "#DCF2C7" }}>
                  2-pers: +299,- <br /> 3-pers: +399,- <br />
                  OBS: Including the tent
                </Alert>
              </div>
            )}
          </div>

          {formData.formData.tent && (
            <div>
              {/* 2 personers telt */}
              <FormGroup>
                <div className={styles.addBtnWrapper}>
                  <p className={styles.btnText}>
                    {" "}
                    2 person tent x {formData.formData.tents2}
                  </p>
                  <div className={styles.tent_button_container}>
                    <button
                      className={styles.noStyleBtn}
                      value={formData.formData.tents2}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementTents2();
                      }}
                    >
                      <AddButton></AddButton>
                    </button>
                    <button
                      className={styles.noStyleBtn}
                      value={formData.formData.tents2}
                      onClick={(e) => {
                        e.preventDefault();
                        removeTents2();
                      }}
                    >
                      <RemoveButton></RemoveButton>
                    </button>
                  </div>
                </div>
              </FormGroup>

              {/* 3 personer telt */}
              <FormGroup>
                <div className={styles.addBtnWrapper}>
                  <p className={styles.btnText}>
                    3 person tent x {formData.formData.tents3}
                  </p>
                  <div className={styles.tent_button_container}>
                    <button
                      className={styles.noStyleBtn}
                      value={formData.formData.tents3}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementTents3();
                      }}
                    >
                      <AddButton></AddButton>
                    </button>
                    <button
                      className={styles.noStyleBtn}
                      value={formData.formData.tents3}
                      onClick={(e) => {
                        e.preventDefault();
                        removeTents3();
                      }}
                    >
                      <RemoveButton></RemoveButton>
                    </button>
                  </div>
                </div>
              </FormGroup>
            </div>
          )}
        </div>
        <p className={styles.p}>
          Total price:{" "}
          {/* check for if the price is 'not a number', then display 0, otherwise display current "total" ticketprice  */}
          {Number.isNaN(formData.formData.ticketPrice)
            ? 0
            : formData.formData.ticketPrice}
        </p>
      </FormGroup>
    </>
  );
}
