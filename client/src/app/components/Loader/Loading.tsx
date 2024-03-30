import React from "react";
import Loader from "./Loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface LoadingProps {
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  children: React.ReactNode;
}

const Loading = ({ isLoading, error, children }: LoadingProps) => {
  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default Loading;
