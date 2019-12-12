import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

const ModalFrame = styled.div`
  background-color: white;
  height: 80%;
  position: fixed;
  z-index: 2000;
  display: flex;
`;

const ImageContent = styled.div`
  flex: 1;
`;

const TextContent = styled.div`
  flex: 0.5;
`;
const ModalBackgroud = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
`;

const CloseModal = styled.p`
  color: white;
  float: right;
  margin: 1rem;
  font-size: 1rem;
  cursor: pointer;
`;
interface IProps {
  textChildren?: ReactNode;
  imageChildren?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Commonmodal({
  onClick,
  textChildren,
  imageChildren,
  className
}: IProps) {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  return isOpen ? (
    <>
      <ModalBackgroud>
        <CloseModal onClick={closeModal}>X</CloseModal>
      </ModalBackgroud>

      <ModalFrame onClick={onClick} className={className}>
        {imageChildren && <ImageContent>{imageChildren}</ImageContent>}
        <TextContent>{textChildren}</TextContent>
      </ModalFrame>
    </>
  ) : (
    <></>
  );
}

export default Commonmodal;
