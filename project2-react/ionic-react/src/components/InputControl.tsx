import React from "react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

const InputControl: React.FC<{
  selectedValue: "m-kg" | "ft-lbs";
  onCalcUnitsChange: (value: "m-kg" | "ft-lbs") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onCalcUnitsChange(event.detail.value);
  };
  return (
    <IonSegment
      value={props.selectedValue}
      onIonChange={inputChangeHandler}
    >
      <IonSegmentButton value="m-kg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ft-lbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
