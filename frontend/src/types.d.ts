type img = {
  height: number;
  url: string;
  width: number;
};

export interface IPlaylist {
  id?: string;
  name?: string;
  img?: img;
  tracks?: any[];
}

export interface IUser {
  img?: string;
  name?: string;
}
