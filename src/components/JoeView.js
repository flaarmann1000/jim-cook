import React, { useState } from "react";
import { Button } from "./ui/Button";
import { TimePicker } from "react-ios-time-picker";

import "../styles/styles.css";

const JoeView = ({ setCurrentView }) => {
  const [value, setValue] = useState("12:00");

  const onChange = (timeValue) => {
    console.log("changed");
    setValue(timeValue);
  };

  const handleSave = () => {
    console.log("saved");
  };

  const onOpen = () => {
    console.log("opened");
  };

  const onClose = () => {
    console.log("closed");
  };

  const getTime = (offset) => {
    const [valueHours, valueMinutes] = value.split(":").map(Number);
    const [offsetHours, offsetMinutes] = offset.split(":").map(Number);
    // Add hours and minutes separately
    let totalHours = valueHours + offsetHours;
    let totalMinutes = valueMinutes + offsetMinutes;

    // Handle the case where minutes exceed 60
    if (totalMinutes >= 60) {
      totalMinutes -= 60;
      totalHours += 1;
    }

    // Handle the case where hours exceed 24
    if (totalHours >= 24) {
      totalHours -= 24;
    }

    // Format the result with leading zeros
    const formattedHours = String(totalHours).padStart(2, "0");
    const formattedMinutes = String(totalMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-3xl font-bold mb-4">
        {"Joe Semola Bread Calculator"}
      </h2>
      <p>starting time</p>

      <TimePicker
        onChange={onChange}
        value={value}
        popupClassName="popup"
        onSave={handleSave}
        onOpen={onOpen}
        onClose={onClose}
        // use12Hours
      />
      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("00:00") + " - "}</span>
        {"Sauerteig"}
      </h3>
      <div className="text-sm font-blue italic mb-1">
        {
          "30g Anstellgut, sehr aktiv | 30g Weizenmehl Type 1050 | 30g Wasser, 35°C"
        }
      </div>
      <div>
        Alle Sauerteig-Zutaten mischen und bei 28-29°C für 4 Stunden oder bis
        kurz vor den Peak reifen lassen.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("04:00") + " - "}</span>
        {"Fermentolyseteig"}
      </h3>
      <div className="text-sm font-blue italic mb-1">
        {"400g Weizenmehl Type 1050 | 80g Sauerteig | 240g Wasser, 12°C"}
      </div>
      <div>
        Den Fermentolyseteig grob mischen und bei einer Teigtemperatur von 21°C
        60 Minuten ruhen lassen.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("05:00") + " - "}</span>
        {"Hauptteig"}
      </h3>
      <div className="text-sm font-blue italic mb-1">
        {"Fermentolyseteig | 40g Wasser, 12°C | 9g Salz"}
      </div>
      <div>
        Zusätzliches Wasser und Salz zum Fermentolyseteig geben und 8-10 Minuten
        kneten. Die Teigtemperatur sollte bei 23°C liegen.
      </div>
      <div>
        6 Stunden bis zur Volumenverdopplung bei Raumtemperatur reifen lassen.
        Nach 30, 60 und 90 Minuten jeweils dehnen und falten.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("05:30") + " - "}</span>
        {"Falten 1"}
      </h3>
      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("06:00") + " - "}</span>
        {"Falten 2"}
      </h3>
      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("06:30") + " - "}</span>
        {"Falten 3"}
      </h3>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("11:00") + " - "}</span>
        {"Formen"}
      </h3>
      <div>
        Formen und mit Schluss nach oben im Gärkorb für 10-14 Stunden oder über
        Nacht im Kühlschrank ruhen lassen.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("23:00") + " - "}</span>
        {"Backen"}
      </h3>
      <div>
        Im vorgeheizten Backofen mit Topf oder Dampf und Hitzeschild bei 250°C
        15 Minuten backen.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("23:15") + " - "}</span>
        {"Deckel abnehmen"}
      </h3>
      <div>
        Den Deckel abnehmen bzw. Dampf ablassen und die Temperatur auf 220°C
        reduzieren. 30 Minuten fertig backen.
      </div>

      <br />
      <h3 className="text-2xl font-bold mb-4">
        <span className="font-light">{getTime("23:30") + " - "}</span>
        {"Fertig"}
      </h3>

      <br />
      <hr></hr>
      <br />

      {/* back to gallery */}
      <div className="mt-4 flex justify-between">
        <Button variant="secondary" onClick={() => setCurrentView("gallery")}>
          Back to Gallery
        </Button>
      </div>
    </div>
  );
};

export default JoeView;
