export interface BlogRecord {
  title: string;
  post: string;
}

export interface ApiResponse {
  blog_records: BlogRecord[];
  message: string;
  statusText: string;
}