import { useTabs } from "../hooks/useTabs";
import type { TracksTableProps } from "../definitions/types";

export function BlogsComponent({ data }: TracksTableProps) {
  const { openTab } = useTabs();

  return (
    <>
      {data.map((track) => (
        <div
          key={track.id}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ddd",
          }}
          onClick={() => openTab(track.id, track.title, `/blogs/${track.id}`)}
        >
          <h3>{track.title}</h3>
          <p>Author: {track.author?.name}</p>
          <p>Length: {track.length} minutes</p>
          <p>Modules: {track.modulesCount}</p>
        </div>
      ))}
    </>
  );
}
