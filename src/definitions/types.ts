export type Track = {
  __typename?: string;
  id: string;
  title: string;
  thumbnail?: string | null;
  length?: number | null;
  modulesCount?: number | null;
  author?: Author | null;
};

export type Author = {
  __typename?: string;
  id: string;
  name: string;
  photo?: string | null;
};

export interface TracksTableProps {
  data: Track[] | [];
}
