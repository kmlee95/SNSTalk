export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const;

export interface UploadImageRequest {
  type: typeof UPLOAD_IMAGES_REQUEST;
  data: string;
}

export interface UploadImageSuccess {
  type: typeof UPLOAD_IMAGES_SUCCESS;
  data: string;
}

export interface UploadImageFailure {
  type: typeof UPLOAD_IMAGES_FAILURE;
  error: string;
}

export const uploadImageRequest = (data: string): UploadImageRequest => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
});

export const uploadImageSuccess = (data: string): UploadImageSuccess => ({
  type: UPLOAD_IMAGES_SUCCESS,
  data,
});

export const uploadImageFailure = (error: string): UploadImageFailure => ({
  type: UPLOAD_IMAGES_FAILURE,
  error,
});

export type UploadImage =
  | ReturnType<typeof uploadImageRequest>
  | ReturnType<typeof uploadImageSuccess>
  | ReturnType<typeof uploadImageFailure>;
