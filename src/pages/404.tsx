import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/')
  }, [])
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1 style={{ marginTop: "500px", marginLeft: "700px", fontSize: "50px" }}>
        Not Found ...
      </h1>
    </div>
  );
};

export default NotFound;
