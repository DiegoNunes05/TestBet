import React from "react";
import "../styles/switch.css"

interface SwitchProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({darkMode, setDarkMode}) => {
  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="theme-switch__checkbox"
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144 55"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447..."
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            {darkMode ? (
              <div className="theme-switch__moon">
                <div
                  className="theme-switch__spot"
                  style={{top: "4px", left: "4px"}}
                ></div>
                <div
                  className="theme-switch__spot"
                  style={{top: "8px", right: "4px"}}
                ></div>
                <div
                  className="theme-switch__spot"
                  style={{bottom: "4px", left: "6px"}}
                ></div>
              </div>
            ) : (
              <div className="theme-switch__sun"></div>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default Switch;
