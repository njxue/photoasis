declare module "backblaze-b2" {
  interface BackBlazeB2Options {
    applicationKey: string;
    applicationKeyId: string;
  }

  export interface BackBlazeAuthorization {
    authorizationToken: string;
    downloadUrl: string;
  }

  interface UploadUrlData {
    uploadUrl: string;
    authorizationToken: string;
  }

  interface DownloadAuthorizationData {
    authorizationToken: string;
  }

  interface BackBlazeResponse<T> {
    data: T;
  }

  export default class BackBlazeB2 {
    authorizationToken?: string;

    constructor(options: BackBlazeB2Options);

    authorize(): Promise<BackBlazeResponse<BackBlazeAuthorization>>;

    getUploadUrl(input: {
      bucketId: string;
    }): Promise<BackBlazeResponse<UploadUrlData>>;

    deleteFileVersion(input: {
      fileId: string;
      fileName: string;
    }): Promise<unknown>;

    getDownloadAuthorization(input: {
      bucketId: string;
      fileNamePrefix: string;
      validDurationInSeconds: number;
      b2ContentDisposition: string;
    }): Promise<BackBlazeResponse<DownloadAuthorizationData>>;
  }
}
