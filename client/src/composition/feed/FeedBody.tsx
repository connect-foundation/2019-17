import React from "react";
import styled from "styled-components";

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
`;

const FeedBody: React.FC = () => {
  return (
    <>
      <FeedContents>
        <FeedText>
          아르바이트 하실 분을 구합니다!! - 알바 내용 홍대입구근방에서 행사 관련
          판촉물을 수령한 이후, 일산쪽 행사장에서 행사 진행 보조 및 사진 촬영
        </FeedText>
      </FeedContents>
    </>
  );
};

export default FeedBody;
