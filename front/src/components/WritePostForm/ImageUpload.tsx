import React, { useRef, useCallback, memo } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import axios from 'axios';
import { UploadWrapper, UploadButtonWrapper, PreviewWrapper } from './styled';

interface Props {
  addUploadImages: (imgSrc: string[]) => void;
  removeUploadImage: (index: number) => () => void;
  uploadImages: string[];
}

const ImageUpload = memo(({ addUploadImages, removeUploadImage, uploadImages }: Props) => {
  const imageInput = useRef<HTMLInputElement>();

  const onChangeImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });

      const result = await axios.post('/post/images', imageFormData, { withCredentials: true });
      addUploadImages(result.data);
    },
    [uploadImages],
  );

  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  // console.log(uploadImages);
  return (
    <div>
      <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImageUpload} />
      <UploadWrapper>
        {uploadImages.map((v, i) => (
          <PreviewWrapper key={v} imgSrc={`http://localhost:3065/${v}`}>
            <CloseOutlined onClick={removeUploadImage(i)} />
          </PreviewWrapper>
        ))}
        <UploadButtonWrapper onClick={onClickImageUpload}>
          <PlusOutlined />
          <div>업로드</div>
        </UploadButtonWrapper>
      </UploadWrapper>
    </div>
  );
});

export default ImageUpload;
