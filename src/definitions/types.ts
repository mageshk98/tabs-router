export type Track = {
  __typename?: string;
  id: string;
  title: string;
  thumbnail: string;
  length: number;
  modulesCount: number;
  author?: Author | null;
};

export type Author = {
  __typename?: string;
  id: string;
  name: string;
  photo: string;
};

export interface TracksTableProps {
  data: Track[] | [];
}
