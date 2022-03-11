# playlist_shuffler

a web app to shuffle songs in ur playlists

# usage

- in `/backend`, `npm run start`
- in `/frontend`, `npm run start`

# development

the frontend of the application uses localstorage to track login status (i.e. whether the user has clicked 'authorize us with spotify'), so beware

# breaking change

this was probably ham-fisted but I was desperate

within node_modules, i had to change a type declaration for spotify-web-api-node.

specifically, I changed the type of the `tracks` param of `removeTracksFromPlaylist(...)`

from

```
    removeTracksFromPlaylist(playlistId: string, tracks: ReadonlyArray<Track>, options: SnapshotOptions, callback: Callback<SpotifyApi.RemoveTracksFromPlaylistResponse>): void;

    removeTracksFromPlaylist(playlistId: string, tracks: ReadonlyArray<Track>, options?: SnapshotOptions): Promise<Response<SpotifyApi.RemoveTracksFromPlaylistResponse>>;
```

to

```
type uri = {
  uri: string
}

    removeTracksFromPlaylist(playlistId: string, tracks: ReadonlyArray<uri>, options: SnapshotOptions, callback: Callback<SpotifyApi.RemoveTracksFromPlaylistResponse>): void;

    removeTracksFromPlaylist(playlistId: string, tracks: ReadonlyArray<uri>, options?: SnapshotOptions): Promise<Response<SpotifyApi.RemoveTracksFromPlaylistResponse>>;

```
