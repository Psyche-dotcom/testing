import SparkMD5 from "spark-md5";
import ChunkedFileReader from "chunked-file-reader";

export function getMD5Hash(file) {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new ChunkedFileReader();

    reader.subscribe("chunk", (e) => {
      spark.append(e.chunk);
    });

    reader.subscribe("end", (e) => {
      const rawHash = spark.end(true);
      const base64Hash = btoa(rawHash);

      resolve(base64Hash);
    });

    reader.readChunks(file);
  });
}
