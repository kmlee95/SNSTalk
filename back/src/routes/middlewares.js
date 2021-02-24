//주소로 직접 접근했을 때 체크

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //passport에서 로그인했는지 체크하는걸 제공
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //passport에서 로그인했는지 체크하는걸 제공(인자가 없을 떄 체크)
    next();
  } else {
    res.status(401).send('로그인이 상태입니다.');
  }
};
