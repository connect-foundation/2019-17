import React, { useState } from 'react';
import WritingFeedPresenter from './WritingPresenter';
import {
  Scalars,
  EnrollFeedMutationHookResult,
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
      setFiles(props =>
        props.filter(file => {
          if (file.fileId === fileId) {
            window.URL.revokeObjectURL(file.fileUrl);
          }
          return file.fileId !== fileId;
        })
      );
    }
  };

  const ENROLL_FEED_MUTATION = gql`
    mutation enrollFeed($content: String!, $files: [Upload]) {
      enrollFeed(content: $content, files: $files)
    }
  `;

  const [writingFeedMutation] = useMutation<
    EnrollFeedMutationHookResult,
    EnrollFeedMutationVariables
  >(ENROLL_FEED_MUTATION);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const parseFiles = files.map(item => item.file);
    const {
      data: { enrollFeed }
    } = (await writingFeedMutation({
      variables: { content, files: parseFiles }
    })) as any;
    if (enrollFeed) alert('피드가 등록되었습니다.');
    setFiles([]);
    setContent('');
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
