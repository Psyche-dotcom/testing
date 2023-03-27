import React from "react";

export const useGroupData = (data:any, size:number) => {
  const Data = [];
  data?.length &&
    data.forEach((element:any) => {
      if (!Data.length || Data[Data.length - 1].length === size) {
        Data.push([]);
      }
      Data[Data.length - 1].push(element);
    });
  return Data;
};
