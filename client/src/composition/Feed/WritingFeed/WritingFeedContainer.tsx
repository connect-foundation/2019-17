import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import WritingFeedPresenter from './WritingPresenter';
import { Scalars, useMeQuery, useEnrollFeedMutation } from 'react-components.d';
import { Maybe } from 'react-components.d';
import { ENROLL_WRITING_FEED, GET_WRITING_FEED } from 'cache/writingFeed.query';
import { DEFAULT } from 'Constants';

const FEED_MAX_LENGTH = 1500;
const IMAGE_VALID_EXTENSION = /image\/(jpg|jpeg|png|gif|bmp)$/;

function WritingFeedContainer() {
  const { data: { writingFeedContent = null } = {} } = useQuery(
    GET_WRITING_FEED
  );
  const [writingFeedDataMutation] = useMutation(ENROLL_WRITING_FEED);
  const [fileId, setFileId] = useState(0);
  const [files, setFiles] = useState<Maybe<Scalars['Upload']>[]>([]);
  const [content, setContent] = useState(writingFeedContent || '');

  const contentCursor = useRef<HTMLTextAreaElement>(null);
  const [enrollFeedMutation] = useEnrollFeedMutation();
  const { data: { me = null } = {} } = useMeQuery();

  useEffect(() => {
    if (contentCursor.current) {
      const { length } = contentCursor.current.value;
      contentCursor.current.focus();
      contentCursor.current.setSelectionRange(length, length);
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

  const checkFeedContent = () => {
    if (!content) {
      alert('피드 내용을 입력해주세요.');
      if (contentCursor.current) contentCursor.current.focus();
      return false;
    }
    if (content.length >= FEED_MAX_LENGTH) {
      alert(`피드 글자수 제한(${FEED_MAX_LENGTH}자)`);
      return false;
    }
    return true;
  };

  const reset = async () => {
    await writingFeedDataMutation({ variables: { content: '' } });
    setFiles([]);
    setContent('');
  };

  const onSubmit = _.debounce(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      if(!checkFeedContent()) return;
      const parseFiles = files.map(item => item.file);
      const { data } = await enrollFeedMutation({
        variables: { content, files: parseFiles }
      });
      if (data && data.enrollFeed) {
        alert('피드가 등록되었습니다.');
      }
      reset();
    },
    1000
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <WritingFeedPresenter
      thumbnail={(me && me.thumbnail) || DEFAULT.PROFILE}
      contentCursor={contentCursor}
      onSubmit={handleSubmit}
      content={content}
      onChangeTextArea={onChangeTextArea}
      files={files}
      onChangeFile={onChangeFile}
      deleteFile={deleteFile}
    />
  );
}

export default WritingFeedContainer;
