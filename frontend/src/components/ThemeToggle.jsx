import styled from "styled-components";
import { useTheme } from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <Wrapper title="Toggle dark mode">
      <label className="switch">
        <span className="sun">
          {/* sun icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="#ffd43b">
              <circle r="5" cx="12" cy="12" />
              <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zm-12.02 12.02a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zm6.36-14.36a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm-5.66-14.66a1 1 0 0 1-.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29zm12.02 12.02a1 1 0 0 1-.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.24z"/>
            </g>
          </svg>
        </span>

        <span className="moon">
          {/* moon icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
        </span>

        <input
          type="checkbox"
          className="input"
          checked={theme === "dark"}
          onChange={toggle}
        />
        <span className="slider" />
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
.switch{font-size:17px;position:relative;display:inline-block;width:64px;height:34px}
.switch input{opacity:0;width:0;height:0}
.slider{cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0;
        background:#73c0fc;border-radius:30px;transition:.4s}
.slider:before{content:"";position:absolute;height:30px;width:30px;border-radius:20px;
        left:2px;bottom:2px;background:#e8e8e8;transition:.4s;z-index:2}
.sun svg{position:absolute;top:6px;left:36px;width:24px;height:24px;z-index:1}
.moon svg{fill:#73c0fc;position:absolute;top:5px;left:5px;width:24px;height:24px;z-index:1}
.input:checked + .slider{background:#183153}
.input:focus + .slider{box-shadow:0 0 1px #183153}
.input:checked + .slider:before{transform:translateX(30px)}
`;