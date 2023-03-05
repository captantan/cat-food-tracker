export interface LoadingState {
  status: 'none' | 'loading' | 'error' | 'done';
  error: number | null;
}
