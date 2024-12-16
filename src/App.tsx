import "./App.css";

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
        <button onClick={() => activeFeatures("active_lines_buttons")}>
          Lines
        </button>
        <button onClick={() => activeFeatures("active_hover_inspect")}>
          Hover Inspect
        </button>
        <button>measure distance</button>
      </div>
    </div>
  );
}

export default App;
