import React, { useState } from 'react';
import WritingFeedPresenter from './WritingPresenter';

function WritingFeedContainer() {
  const [content, setContent] = useState('');
  const onChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setContent(e.target.value);
  };

  return (
    <WritingFeedPresenter
      content={content}
      onChangeTextArea={onChangeTextArea}
    />
  );
}

export default WritingFeedContainer;
