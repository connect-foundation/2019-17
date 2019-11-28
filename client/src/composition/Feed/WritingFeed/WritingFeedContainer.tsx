import React, { useState } from 'react';
import WritingFeedPresenter from './WritingPresenter';
import {
  Scalars,
  EnrollFeedMutationResult,
  EnrollFeedMutationVariables
} from 'react-components.d';
import { Maybe } from 'react-components.d';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
      setFiles(props => [...props, { file, fileId, fileUrl }]);
      setFileId(fileId + 1);
      target.value = '';
    }
  };

  const deleteFile = (e: React.MouseEvent<SVGElement, MouseEvent>): void => {
    const { currentTarget } = e;
    let fileIdAttribute: string | null = currentTarget.getAttribute('fileid');
    let fileId: number;
    if (fileIdAttribute) {
      fileId = parseInt(fileIdAttribute);
      setFiles(props => props.filter(file => file.fileId !== fileId));
    }
  };

  const WRITING_FEED_MUTATION = gql`
    mutation enrollFeed($content: String!, $files: [Upload]) {
      enrollFeed(content: $content, files: $files)
    }
  `;

  const [writingFeedMutation] = useMutation<
    EnrollFeedMutationResult,
    EnrollFeedMutationVariables
  >(WRITING_FEED_MUTATION);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log('submit');
    const parseFiles = files.map(item => item.file);
    const result = await writingFeedMutation({
      variables: { content, files: parseFiles }
    });
    console.log(result);
  };

  return (
    <WritingFeedPresenter
      onSubmit={onSubmit}
      content={content}
      onChangeTextArea={onChangeTextArea}
      files={files}
      onChangeFile={onChangeFile}
      deleteFile={deleteFile}
    />
  );
}

export default WritingFeedContainer;
