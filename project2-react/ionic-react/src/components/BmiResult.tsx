import { IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";
import React from "react";

const BmiResults: React.FC<{ result: string }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
            <h2>Your Body Mass Index (BMI)</h2>
            <h2 style={{fontSize:  "40px", margin: "5%"}}>{props.result}</h2>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResults;
