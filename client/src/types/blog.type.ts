export interface BlogRecord {
  id : number;
  title: string;
  post: string;
}

export interface ApiResponse {
  blog_records: BlogRecord[];
  message: string;
  statusText: string;
}

export interface SingleApiResponse {
  record: BlogRecord[];
  message: string;
  statusText: string;
}

export interface BlogRequest {
  title: string;
  post: string;
  image?: FileList;
};