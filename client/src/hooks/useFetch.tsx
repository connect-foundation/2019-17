import React, { useEffect } from "react";

const doFetch = async (url: string, options: object) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return [false, data, null];
  } catch (error) {
    return [false, null, error];
  }
};

export default doFetch;
