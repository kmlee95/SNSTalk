import React, { useRef, useCallback, memo } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { UploadWrapper, UploadButton, Preview } from './styled';

interface ImageUploadProps {
  addUploadImages: (imgSrc: string[]) => void;
  removeUploadImage: (index: number) => () => void;
  uploadImages: string[];
}

const ImageUpload = memo(({ addUploadImages, removeUploadImage, uploadImages }: ImageUploadProps) => {
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

  return (
    <div>
      <input type="file" multiple hidden ref={imageInput} onChange={onChangeImageUpload} />
      <UploadWrapper>
        {uploadImages.map((v, i) => (
          <Preview key={v} imgSrc={v}>
            <CloseOutlined onClick={removeUploadImage(i)} />
          </Preview>
        ))}
        <UploadButton onClick={onClickImageUpload}>
          <PlusOutlined />
          <div>업로드</div>
        </UploadButton>
      </UploadWrapper>
    </div>
  );
});

export default ImageUpload;
