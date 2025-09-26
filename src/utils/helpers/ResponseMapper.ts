interface ResponseMapperOptions {}

export interface ResponseMetadataInterface {
  total: number;
  currentPage: number;
  totalPages: number;
}
export interface ResponseInterface<T> {
  data: T[];
  metadata: ResponseMetadataInterface;
}
export default class ResponseMapper {
  static mapResponse<T>(
    data: T[],
    metadata: ResponseMetadataInterface,
    options: ResponseMapperOptions = {}
  ): ResponseInterface<T> {
    return {
      data,
      metadata,
    };
  }
}
