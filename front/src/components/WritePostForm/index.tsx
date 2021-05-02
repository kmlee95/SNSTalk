import React, { useCallback, useState, useEffect, useRef, memo } from 'react';
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { addPostRequest } from '@reducers/post/addPost';
import { uploadImageRequest } from '@reducers/post/upLoadImage';
import { FormWrapper } from './styled';
import { RootState } from '@reducers/.';
import ImageUpload from './ImageUpload';

const PostForm = memo(() => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [imageUploadVisible, setImageUploadVisible] = useState<boolean>(false);
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state: RootState) => state.post);

  const imageInput = useRef();

  const handleImageUpload = useCallback(() => {
    setImageUploadVisible(!imageUploadVisible);
  }, [imageUploadVisible]);

  const addUploadImages = useCallback(
    (imgSrc: string[]) => {
      setUploadImages([...uploadImages, ...imgSrc]);
    },
    [uploadImages],
  );
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append('image', p); //req.body.image
      });
      formData.append('content', text); //req.body.content
      return dispatch(addPostRequest({ Images: String(formData.get('image')), content: String(formData.get('text')) }));
    },
    [text, imagePaths],
  );

  const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback(
    (e) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      dispatch(uploadImageRequest(String(imageFormData)));
    },
    [dispatch],
  );

  const onRemoveImage = useCallback(
    (index: number) => () => {
      const uploadImagesArr = [...uploadImages];
      uploadImagesArr.splice(index, 1);
      setUploadImages(uploadImagesArr);
    },
    [dispatch],
  );

  return (
    <FormWrapper style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmit}>
      <Input.TextArea maxLength={140} value={text} onChange={onChangeText} />
      <div className="post-form-button">
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={handleImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>
          작성
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}

        {imageUploadVisible && (
          <ImageUpload
            uploadImages={uploadImages}
            addUploadImages={addUploadImages}
            removeUploadImage={onRemoveImage}
          />
        )}
      </div>
    </FormWrapper>
  );
});

export default PostForm;
