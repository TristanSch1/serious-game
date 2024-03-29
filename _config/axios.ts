import axios from "axios";
import { TFilesData } from "../_common/_utils/fileUtils";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SG_API,
  timeout: 1000
});

export const fetchUtils = {
  get: <T>(url: string) => httpClient.get<T>(url),
  post: <T>(url: string, data?: any) => httpClient.post<T>(url, data),
  patch: <T>(url: string, data?: any) => httpClient.patch<T>(url, data),
  delete: <T>(url: string) => httpClient.delete<T>(url),

  createBodyWithFiles: (jsonData: Record<string, any>, files: TFilesData) => {
    let filesPathIndexes: { [path: string]: number[][] } | undefined = undefined;
    const body = new FormData();
    body.append("data", JSON.stringify(jsonData));
    files.forEach(({ path, blob, indexes }) => {
      body.append("files." + path, blob, blob.name);
      if (indexes) {
        filesPathIndexes = filesPathIndexes || {};
        filesPathIndexes[path] = filesPathIndexes[path] || [];
        filesPathIndexes[path].push(indexes);
      }
    });
    if (filesPathIndexes) {
      body.append("filesPathIndexes", JSON.stringify(filesPathIndexes));
    }
    return body;
  }
};

export const fetcher = fetchUtils.get;

export default httpClient;
