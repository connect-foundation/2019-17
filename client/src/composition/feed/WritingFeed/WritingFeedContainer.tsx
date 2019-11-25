import React, { useState } from 'react';
import WritingFeedPresenter from './WritingPresenter';
import { Scalars } from '../../../react-components.d';
import Maybe from 'graphql/tsutils/Maybe';

function WritingFeedContainer() {
  const [content, setContent] = useState('');
  const onChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setContent(e.target.value);
  };

  const [fileId, setFileId] = useState(0);
  const [files, setFiles] = useState<Maybe<Scalars['Upload']>[]>([]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setFiles(props => [...props, { ...file, fileId, fileUrl }]);
      setFileId(fileId + 1);
    }
  };

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { currentTarget } = e;
    const fileId = currentTarget.getAttribute('fileId');
    setFiles(props => props.filter(file => file.fileId !== fileId));
  };

  return (
    <WritingFeedPresenter
      content={content}
      onChangeTextArea={onChangeTextArea}
      files={files}
      onChangeFile={onChangeFile}
      deleteFile={deleteFile}
    />
  );
}

export default WritingFeedContainer;
