import React from 'react';
import styled from "styled-components";

const NameStyle = styled.div`
  font-size: 23px;
  text-align: center;
  margin-bottom: 15px;
`;

const Name = (props) => {
  return (
    <NameStyle>
      {props.children}
    </NameStyle>
  );
};

export default Name;