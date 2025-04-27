import styled, { css, keyframes } from "styled-components";

export default function ShadowButton({ children, disabled, ...rest }) {
  return (
    <Wrapper $disabled={disabled}>
      <button className="shadow__btn" disabled={disabled} {...rest}>
        {children}
      </button>
    </Wrapper>
  );
}

/* ---------- styles ---------- */
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px  rgba(0,140,255,.7),
                       0 0 25px rgba(0,140,255,.5),
                       0 0 50px rgba(0,140,255,.3),
                       0 0 100px rgba(0,140,255,.1); }
  50%      { box-shadow: 0 0 25px rgba(0,140,255,1),
                       0 0 50px rgba(0,140,255,.8),
                       0 0 100px rgba(0,140,255,.6),
                       0 0 140px rgba(0,140,255,.4); }
`;

const Wrapper = styled.div`
  .shadow__btn {
    padding: 10px 26px;
    border: none;
    font-size: 15px;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 2px;
    font-weight: 700;
    text-transform: uppercase;
    background: rgb(0, 140, 255);
    box-shadow: 0 0 25px rgb(0, 140, 255);
    transition: 0.35s;
    cursor: pointer;

    ${({ $disabled }) =>
      $disabled &&
      css`
        opacity: 0.45;
        cursor: not-allowed;
        box-shadow: none;
        background: rgb(110, 167, 219);
      `}
  }

  /* hover glow only when enabled */
  ${({ $disabled }) =>
    !$disabled &&
    css`
      .shadow__btn:hover {
        animation: ${glow} 1.2s ease-in-out infinite alternate;
      }
    `}
`;