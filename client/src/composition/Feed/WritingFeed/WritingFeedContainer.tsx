import React, { useState, useRef } from 'react';
import WritingFeedPresenter from './WritingPresenter';
import {
  Scalars,
  useMeQuery,
  useEnrollFeedMutation,
  Image
} from 'react-components.d';
import { Maybe } from 'react-components.d';
import { IFeedItem } from '../feed.type';

interface IProps {
  setFeeds: React.Dispatch<React.SetStateAction<IFeedItem[]>>;
}

function WritingFeedContainer({ setFeeds }: IProps) {
  const [content, setContent] = useState('');
  const contentCursor = useRef<HTMLTextAreaElement>(null);
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

  const [enrollFeedMutation] = useEnrollFeedMutation();
  const { data } = useMeQuery();

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
      const {
        enrollFeed: { searchUser, feedId, feed, totallikes, hasLiked }
      } = data;
      let imglist: Image[] = [];
      imglist = files.map(file => ({ url: file.fileUrl }));
      setFeeds(
        props =>
          [
            { searchUser, feedId, feed, totallikes, hasLiked, imglist },
            ...props
          ] as any
      );
      alert('피드가 등록되었습니다.');
    }
    setFiles([]);
    setContent('');
  };

  return (
    <WritingFeedPresenter
      thumbnail={
        data && data.me && data.me.thumbnail
          ? data.me.thumbnail
          : process.env.PUBLIC_URL + '/images/profile.jpg'
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
