import "./App.css";
import { ACTIONS } from "./utils/constants";

function App() {
  const activeFeatures = (message: string) => {
    chrome.runtime.sendMessage({ action: message }, (response) => {
      console.log("Response from background:", response);
    });
  };

  return (
    <div className="popup-container">
      <h1 className="popup-title">Pixel Perfect Extension</h1>

      <span className="buttons-title">Buttons to active features</span>
      <div className="buttons-container">
        <button onClick={() => activeFeatures(ACTIONS.activeLinesButton)}>
          Lines
        </button>
        <button onClick={() => activeFeatures(ACTIONS.activeHoverInspect)}>
          Hover Inspect
        </button>
        <button onClick={() => activeFeatures(ACTIONS.activeMeasureDistance)}>
          Measure Distance
        </button>
      </div>
    </div>
  );
}

export default App;
