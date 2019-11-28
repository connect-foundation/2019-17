import React from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';

const Container = styled.div`
  position: relative;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borders.radius};
`;

const Overlay = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s linear;
  &:hover {
    opacity: 1;
  }
`;

const DeleteBtn = styled(IoIosClose)<{ fileid: number }>`
  position: absolute;
  top: 0px;
  right: 0px;
  color: white;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

interface IProps {
  fileUrl: string;
  fileId: number;
  deleteFile: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

function UploadPreviewImg({ fileUrl, fileId, deleteFile }: IProps) {
  return (
    <Container>
      <Image src={fileUrl} />
      <Overlay>
        <DeleteBtn fileid={fileId} onClick={deleteFile} />
      </Overlay>
    </Container>
  );
}

export default UploadPreviewImg;
