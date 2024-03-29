import { UserNotify } from '../reducers/user';
import { NOTIFY_REQUEST_FRIEND, NOTIFY_WELCOME, NOTIFY_POST_COMMENTS } from '../reducers/user/values';

export default (notify: UserNotify) => {
  switch (notify.notifyType) {
    case NOTIFY_REQUEST_FRIEND:
      return {
        title: '팔로잉 요청',
        contents: `${notify.requestor.familyName}${notify.requestor.firstName}님이 팔로잉하길 원합니다.`,
      };

    case NOTIFY_WELCOME:
      return {
        title: '가입 축하',
        contents: '가입을 축하합니다!',
      };

    case NOTIFY_POST_COMMENTS:
      return {
        title: '댓글을 달았습니다',
        contents: `${notify.requestor.familyName}${notify.requestor.firstName}}님이 게시글에 댓글을 달았습니다.`,
      };

    default:
      return {};
  }
};
