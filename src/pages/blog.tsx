import { useParams } from "react-router";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import QueryResult from "../components/queryresult";
import { useTabs } from "../hooks/useTabs";

export const GetTrack = gql(`
  query GetTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      description
      numberOfViews
      modules {
        id
        title
        length
        content
        videoUrl
      }
    }
  }
`);

export default function Blog() {
  const { openTab } = useTabs();
  const { trackId } = useParams();
  const { loading, error, data } = useQuery(GetTrack, {
    variables: { trackId: trackId! },
    skip: !trackId,
  });

  if (!trackId) {
    return <div>No track ID provided</div>;
  }

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {data?.track && (
        <div style={{ padding: "20px" }}>
          <button onClick={() => openTab("blogs", "Blogs", "/blogs")}>
            Back to Blogs
          </button>
          <h1>{data.track.title}</h1>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            {data.track.thumbnail && (
              <img
                src={data.track.thumbnail}
                alt={data.track.title}
                style={{ width: "200px", height: "auto", objectFit: "contain" }}
              />
            )}
            <div>
              <h3>Author: {data.track.author.name}</h3>
              <p>Length: {data.track.length} minutes</p>
              <p>Modules: {data.track.modulesCount}</p>
              <p>Views: {data.track.numberOfViews}</p>
              {data.track.description && (
                <p>
                  <strong>Description:</strong> {data.track.description}
                </p>
              )}
            </div>
          </div>

          {data.track.modules && data.track.modules.length > 0 && (
            <div>
              <h2>Modules</h2>
              {data.track.modules.map((module) => (
                <div
                  key={module.id}
                  style={{
                    margin: "10px 0",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  <h4>{module.title}</h4>
                  <p>Length: {module.length} minutes</p>
                  {module.content && <p>{module.content}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </QueryResult>
  );
}
