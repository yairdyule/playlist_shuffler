type img = {
  height: number;
  url: string;
  width: number;
};

export interface ITrack {
  name: string;
  id: string;
  image: string;
  artists: string[];
  album: string;
}

export interface IPlaylist {
  id?: string;
  name?: string;
  img?: img;
  tracks?: ITrack[];
}

export interface IUser {
  img?: string;
  name?: string;
}
