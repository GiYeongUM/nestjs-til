import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerDiskOptions = {
  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = uploadURL();
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(
        null,
        `${Math.floor(Math.random() * 101)}${Date.now()}${extname(
          file.originalname,
        )}`,
      );
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const uploadURL = (): string => process.env.src;
export const uploadPathURL = (path: string): string => process.env.src + path;
