import { useState, type ChangeEvent } from "react";
import { BlogsTable } from "../components/blogsTable";
import { BlogsComponent } from "../components/blogsList";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import QueryResult from "../components/queryresult";

/** GET_TRACKS query to retrieve all tracks */
const GET_TRACKS = gql(`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`);

export default function Blogs() {
  const [viewType, setViewType] = useState<"list" | "table">("table");
  const { loading, error, data } = useQuery(GET_TRACKS);
  const onViewChange = (e: ChangeEvent<HTMLInputElement>) => {
    setViewType(e.target.value as "list" | "table");
  };
  return (
    <QueryResult error={error} loading={loading} data={data}>
      <div>
        <h1>Blogs</h1>
        <span>
          <input
            type="radio"
            name="viewType"
            value="list"
            id="view-list"
            checked={viewType === "list"}
            onChange={onViewChange}
          />
          <label htmlFor="view-list">List</label>
        </span>
        <span style={{ marginLeft: 12 }}>
          <input
            type="radio"
            name="viewType"
            value="table"
            id="view-table"
            checked={viewType === "table"}
            onChange={onViewChange}
          />
          <label htmlFor="view-table">Table</label>
        </span>

        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            overflow: "auto",
            height: "600px",
          }}
        >
          {viewType === "list" ? (
            <BlogsComponent data={data?.tracksForHome ?? []} />
          ) : (
            <BlogsTable data={data?.tracksForHome ?? []} />
          )}
        </div>
      </div>
    </QueryResult>
  );
}
