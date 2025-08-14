import type { ApolloError } from "@apollo/client";
import React from "react";
import type { PropsWithChildren } from "react";

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown;
}

const QueryResult: React.FC<PropsWithChildren<QueryResultProps>> = ({
  loading,
  error,
  data,
  children,
}): React.ReactElement | null => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <>{children}</>;
  }

  return <p>Nothing to show...</p>;
};

export default QueryResult;
