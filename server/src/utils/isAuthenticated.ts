export default req => {
  if (!req.email) {
    throw Error('유저를 찾을 수 없습니다.');
  }
};
