import PI_Formtab from "../components/PI_Formtab";
import styles from "../styles/Form.module.css";
import { FormControl, CardContent } from "@mui/material";
import BackButton from "./BackButton";
import { useContext, useState } from "react";
import { formDataContext } from "@/contexts/bookingContext";

export default function PersonalInfo({ currentStepSetter, timerValue }) {
  if (timerValue === null) {
    return <p>The timer value is null.</p>;
  }
  const { formData, dispatch } = useContext(formDataContext);
  const [tents2Counter, setTents2Counter] = useState(0); // Counter for 2-person tent
  const [tents3Counter, setTents3Counter] = useState(0);

  function handlePreviousFormComponent() {
    dispatch({
      action: "RESET_TICKET_PRICE",
    });
    dispatch({ action: "PREVIOUS" });

    currentStepSetter(0); //change current step

    /* Resetter counteren på telte, her sættes counteren til 0 */
    setTents2Counter(0);
    setTents3Counter(0);

    /* reset tents2 i dispatch med action og payload*/
    dispatch({ action: "SET_TENTS2_AMOUNT", payload: { tents2Amount: 0 } });

    /* reset tents3 dispatch */
    dispatch({ action: "SET_TENTS3_AMOUNT", payload: { tents3Amount: 0 } });

    /* reset tents checked så den er lukket når der trykkes tilbage */
    dispatch({ action: "TENT_SETUP", payload: { isTentChecked: false } });
  }
  //inline style object to override vercels css
  const inlineStyle = {
    display: "grid",
    placeContent: "center",
  };
  return (
    <>
      <div className={styles.btn_container}>
        <BackButton onClick={handlePreviousFormComponent}>Back</BackButton>
      </div>
      <h1 className={styles.h1}>Personal Infomation</h1>

      <FormControl variant="outlined" style={inlineStyle}>
        <CardContent>
          <PI_Formtab setNextStep={currentStepSetter}></PI_Formtab>
        </CardContent>
      </FormControl>
    </>
  );
}
