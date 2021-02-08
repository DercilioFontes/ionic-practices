import React, { useRef, useState } from "react";
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  IonRow,
  IonLabel,
} from "@ionic/react";
import InputControl from "./components/InputControl";
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [bmiState, setBmiState] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [calcUnitsState, setCalcUnitsState] = useState<"m-kg" | "ft-lbs">(
    "m-kg"
  );
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    let enteredHeight = Number(heightInputRef.current?.value);
    let enteredWeight = Number(weightInputRef.current?.value);

    if (
      !Number.isNaN(enteredHeight) &&
      !Number.isNaN(enteredWeight) &&
      enteredHeight > 0 &&
      enteredWeight > 0
    ) {
      if (calcUnitsState === "ft-lbs") {
        const heightConversionFactor = 3.281;
        const weightConversionFactor = 2.205;
        enteredHeight = enteredHeight / heightConversionFactor;
        enteredWeight = enteredWeight / weightConversionFactor;
      }
      const bmi = enteredWeight / (enteredHeight * enteredHeight);
      setBmiState(bmi.toFixed(2));
    } else {
      setShowAlert(true);
    }
  };

  const resetInputs = () => {
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
    setBmiState(undefined);
  };

  const selectedCalcUnitsHandler = (selectValue: "m-kg" | "ft-lbs") => {
    setCalcUnitsState(selectValue);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert"}
          message={"Invalid inputs."}
          buttons={["OK"]}
        />
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl
                selectedValue={calcUnitsState}
                onCalcUnitsChange={selectedCalcUnitsHandler}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height ({calcUnitsState === "m-kg" ? "meters" : "feet"})
                </IonLabel>
                <IonInput type="number" ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Weight (
                  {calcUnitsState === "m-kg" ? "kilograms" : "pounds"})
                </IonLabel>
                <IonInput type="number" ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
          {bmiState && <BmiResult result={bmiState} />}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
