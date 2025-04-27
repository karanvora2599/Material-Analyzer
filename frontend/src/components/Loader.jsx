import styled from "styled-components";

export default function Loader() {
  return (
    <Wrapper className="flex items-center justify-center">
      <div className="loader">
        <div className="cell d-0" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-2" />
        <div className="cell d-3" />
        <div className="cell d-3" />
        <div className="cell d-4" />
      </div>
    </Wrapper>
  );
}

/* ——— styled-components CSS ——— */
const Wrapper = styled.div`
  .loader {
    --cell-size: 52px;
    --cell-spacing: 1px;
    --cells: 3;
    --total-size: calc(
      var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing))
    );
    display: flex;
    flex-wrap: wrap;
    width: var(--total-size);
    height: var(--total-size);
  }
  .cell {
    flex: 0 0 var(--cell-size);
    margin: var(--cell-spacing);
    border-radius: 4px;
    background: transparent;
    animation: 1.5s ripple ease infinite;
  }
  .cell.d-1 {
    animation-delay: 100ms;
  }
  .cell.d-2 {
    animation-delay: 200ms;
  }
  .cell.d-3 {
    animation-delay: 300ms;
  }
  .cell.d-4 {
    animation-delay: 400ms;
  }
  .cell:nth-child(1) {
    --cell-color: #00ff87;
  }
  .cell:nth-child(2) {
    --cell-color: #0cfd95;
  }
  .cell:nth-child(3) {
    --cell-color: #17fba2;
  }
  .cell:nth-child(4) {
    --cell-color: #23f9b2;
  }
  .cell:nth-child(5) {
    --cell-color: #30f7c3;
  }
  .cell:nth-child(6) {
    --cell-color: #3df5d4;
  }
  .cell:nth-child(7) {
    --cell-color: #45f4de;
  }
  .cell:nth-child(8) {
    --cell-color: #53f1f0;
  }
  .cell:nth-child(9) {
    --cell-color: #60efff;
  }

  @keyframes ripple {
    0%,
    60%,
    100% {
      background: transparent;
    }
    30% {
      background: var(--cell-color);
    }
  }
`;