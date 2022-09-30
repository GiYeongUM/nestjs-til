import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponse } from '../interceptors/transform.interceptor';

export const ApiResponseDto = <T extends Type<any>>(data?: T) => {
  return applyDecorators(
    ApiExtraModels(CommonResponse),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponse) },
          {
            properties: {
              statusCode: {
                type: 'number',
              },
              message: {
                type: 'string',
              },
              data: {
                $ref: getSchemaPath(data) || 'string',
              },
            },
          },
        ],
      },
    }),
  );
};
