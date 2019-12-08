import React, { useState, useRef } from 'react';
import WritingFeedPresenter from './WritingPresenter';
import { Scalars, useMeQuery, useEnrollFeedMutation } from 'react-components.d';
import { Maybe } from 'react-components.d';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  enrollWritingFeedData,
  getWritingFeedData
} from 'cache/writingFeed.gql';
import { useEffect } from 'react';

function WritingFeedContainer() {
  const { data: { writingFeedContent = null } = {} } = useQuery(
    getWritingFeedData
  );
  const [writingFeedDataMutation] = useMutation(enrollWritingFeedData);
  const [fileId, setFileId] = useState(0);
  const [files, setFiles] = useState<Maybe<Scalars['Upload']>[]>([]);
  const [content, setContent] = useState(writingFeedContent || '');

  const contentCursor = useRef<HTMLTextAreaElement>(null);
  const [enrollFeedMutation] = useEnrollFeedMutation();
  const { data: { me = null } = {} } = useMeQuery();

  useEffect(() => {
    if (contentCursor.current) {
      const len = contentCursor.current.value.length;
      contentCursor.current.focus();
      contentCursor.current.setSelectionRange(len, len);
    }
  }, []);

  const onChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const {
      target: { value: content }
    } = e;
    setContent(content);
    writingFeedDataMutation({ variables: { content } });
  };

  const IMAGE_VALID_EXTENSION = /image\/(jpg|jpeg|png|gif|bmp)$/;
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    if (target.files && target.files.length) {
      const file = target.files[0];
      if (!file.type.match(IMAGE_VALID_EXTENSION)) {
        alert('해당 파일은 이미지 파일이 아닙니다.');
      } else {
        const fileUrl = URL.createObjectURL(file);
        setFiles(props => [...props, { file, fileId, fileUrl }]);
        setFileId(fileId + 1);
      }
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

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!content) {
      alert('피드 내용을 입력해주세요.');
      if (contentCursor.current) contentCursor.current.focus();
      return;
    }
    const parseFiles = files.map(item => item.file);
    const { data } = await enrollFeedMutation({
      variables: { content, files: parseFiles }
    });
    if (data && data.enrollFeed) {
      alert('피드가 등록되었습니다.');
    }
    writingFeedDataMutation({ variables: { content: '' } });
    setFiles([]);
    setContent('');
  };

  return (
    <WritingFeedPresenter
      thumbnail={
        (me && me.thumbnail) || process.env.PUBLIC_URL + '/images/profile.jpg'
      }
      contentCursor={contentCursor}
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
