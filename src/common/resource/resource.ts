import * as fs from 'fs';
import { extname } from 'path';
import { uploadPathURL } from './multer.options';
import { CommonResponse } from '../interceptors/transform.interceptor';
import { ApiExceptions } from '../exceptions/api.exceptions';
import { BadRequestException } from '@nestjs/common';
import { rmdirSync } from 'fs';

export class Resource {
  // public uploadFileDisk(files: File[]): string[] {
  //   return files.map((file: any) => {
  //     //파일 이름 반환
  //     return uploadPathURL(file.filename);
  //   });
  // }

  public uploadFileDisk(path: string, files: File[]): FileDto[] {
    try {
      const uploadFilePath = uploadPathURL(path);

      if (!fs.existsSync(uploadFilePath)) {
        fs.mkdirSync(uploadFilePath, { recursive: true });
      }

      return files.map((file: any) => {
        const fileName = `${Math.floor(
          Math.random() * 101,
        )}${Date.now()}${extname(file.originalname)}`;

        fs.writeFileSync(uploadFilePath + '/' + fileName, file.buffer);

        const fileDto = new FileDto();

        fileDto.fileName = file.originalname;
        fileDto.fileUrl = uploadPathURL(path + '/' + fileName);

        return fileDto;
      });
    } catch (e) {
      if (fs.existsSync(uploadPathURL(path))) {
        fs.rmdirSync(uploadPathURL(path), { recursive: true });
      }
      console.log(e);
      throw new BadRequestException('파일 업로드에 실패하였습니다.');
    }
  }

  public deleteFile(path: string) {
    try {
      fs.rmSync(uploadPathURL(path), { recursive: true });
    } catch (e) {
      console.log(e);
      throw new BadRequestException('파일 삭제에 실패하였습니다.');
    }
  }

  public deleteDir(path: string) {
    try {
      if (fs.existsSync(uploadPathURL(path))) {
        fs.rmdirSync(uploadPathURL(path), { recursive: true });
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException('파일 삭제에 실패하였습니다.');
    }
  }
}

export class FileDto {
  fileName: string;
  fileUrl: string;
}
