export type TErrorCode = {
  statusCode: number;
  message: string;
};

export const ApiErrorCode = {
  UNAUTHORIZED_EXCEPTION: {
    statusCode: 401,
    message: '권한이 없습니다.',
  },

  FORBIDDEN_EXCEPTION: {
    statusCode: 403,
    message: '접근 불가합니다.',
  },

  DUPLICATE_EMAIL: { statusCode: 409, message: '이미 존재하는 이메일입니다.' },
  DUPLICATE_ID: { statusCode: 409, message: '이미 존재하는 아이디입니다.' },
  NOT_VERIFY_EMAIL_CODE: {
    statusCode: 400,
    message: '인증코드가 일치하지 않습니다.',
  },
  NOTFOUND_EMAIL: { statusCode: 400, message: '존재하지 않는 이메일 입니다.' },
  EXPIRED_EMAIL_VERIFY: {
    statusCode: 400,
    message: '인증코드가 만료되었습니다.',
  },
  NOT_VERIFY_EMAIL: {
    statusCode: 400,
    message: '인증되지 않은 이메일입니다.',
  },
  MISMATCH_PHONE: {
    statusCode: 400,
    message: '전화번호가 올바르지 않습니다',
  },
  NOT_FOUND_ID: {
    statusCode: 400,
    message: '존재하지 않는 아이디 입니다.',
  },
  NOT_FOUND_USER: {
    statusCode: 400,
    message: '존재하지 않는 회원입니다.',
  },
  ALREADY_APPROVED: {
    statusCode: 400,
    message: '이미 승인 처리 하였습니다.',
  },
  ALREADY_DENIED: {
    statusCode: 400,
    message: '이미 반려 처리 하였습니다.',
  },
  MISMATCH_PASSWORD: {
    statusCode: 400,
    message: '비밀번호가 일치하지 않습니다',
  },
};
