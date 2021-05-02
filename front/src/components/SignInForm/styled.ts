import styled from 'styled-components';

export const FormWarraper = styled.form`
  position: relative;
  top: 20%;
  left: 20%;
  width: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.LIGHT_GREY};
  padding: 60px 120px;
  & > button {
    height: 50px;
    font-weight: 900;
  }
  & > div:last-child {
    align-self: flex-end;
    & a {
      color: ${(props) => props.theme.DARK_GREY};
      font-size: 12px;
      font-weight: 900;
    }
    & a:hover {
      color: ${(props) => props.theme.PRIMARY_COLOR};
    }
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.PC}px) {
    left: 0%;
    border: none;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.TABLET}px) {
    left: 0%;
    top: 20px;
  }
`;

export const InputWrapper = styled.div<{ focus: boolean }>`
  border: 1px solid ${(props) => (props.focus ? props.theme.INPUT_FOCUS_COLOR : props.theme.LIGHT_GREY)};
  padding: 10px 14px;
  margin-bottom: 14px;
  background-color: ${(props) => props.theme.WHITE_COLOR};
  & > input {
    width: 100%;
    height: 28px;
    border: none;
    cursor: pointer;
  }
`;
