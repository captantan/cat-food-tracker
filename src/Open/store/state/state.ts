import { LoadingState } from "../../../loading.state";

export interface FileEntry {
  id: string;
  name: string;
}

export interface ContentState {
  folders: string[];
  files: FileEntry[];
}

export interface OpenState {
  loading: LoadingState;
  content: ContentState;
}
