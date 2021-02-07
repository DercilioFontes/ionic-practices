const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");
const calculateBtn = document.getElementById("calc-btn");
const resetBtn = document.getElementById("reset-btn");
const resultArea = document.getElementById("result");

const calculateBMI = () => {
  const enteredWeight = +weightInput.value;
  const enteredHeight = +heightInput.value;

  if (
    enteredHeight <= 0 ||
    enteredWeight <= 0 ||
    Number.isNaN(enteredHeight) ||
    Number.isNaN(enteredWeight)
  ) {
    const alert = document.createElement("ion-alert");
    // alert.cssClass = "my-custom-class";
    alert.header = "Alert";
    // alert.subHeader = "Subtitle";

    if (enteredHeight <= 0 || Number.isNaN(enteredHeight)) {
      alert.message = "Height must be a positive number.";
    } else {
      alert.message = "Weight must be a positive number.";
    }

    alert.buttons = ["OK"];

    document.body.appendChild(alert);
    return alert.present();
  }

  const bmi = enteredWeight / (enteredHeight * enteredHeight);
  const resultElement = document.createElement("ion-card");
  resultElement.innerHTML = `
        <ion-card-content>
            <h2>${bmi.toFixed(2)}</h2>
        </ion-card-content>
  `;

  resultArea.innerHTML = null;
  resultArea.appendChild(resultElement);
};

const resetInputs = () => {
  weightInput.value = null;
  heightInput.value = null;
  resultArea.innerHTML = null;
};

calculateBtn.addEventListener("click", calculateBMI);
resetBtn.addEventListener("click", resetInputs);
