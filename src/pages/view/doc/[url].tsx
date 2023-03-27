import { useEffect, useRef, useState } from "react";
// Import the main component
import { ProgressBar, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { GetServerSideProps } from "next";

interface Props {
  pdf_uri: string
}

export default function PDFViewer({ pdf_uri }: Props) {
  const [kit, setKit] = useState();
  const containerRef = useRef(null);
  // Your render function
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdf_uri}
          renderLoader={(percentages: number) => (
            <div style={{ width: '240px', height: '100vh', paddingTop: "50vh" }}>
              <ProgressBar progress={Math.round(percentages)} />
            </div>
          )}
          plugins={[defaultLayoutPluginInstance]}
          theme="auto"
        />
      </Worker>
      {/*<object*/}
      {/*  data="https://vreel-storage.nyc3.cdn.digitaloceanspaces.com/amarsh/images/LADA_Clickers_Post-Activity11%20%283%29.pdf"*/}
      {/*  type="application/pdf"*/}
      {/*  width="100%"*/}
      {/*  height="100%"*/}
      {/*>*/}
      {/*  <a>Hello World!</a>*/}
      {/*</object>*/}
    </div>
  );
}


export const getServerSideProps: GetServerSideProps<Props> = ({ params, res }): any => {
  const { url } = params;
  if (!url) res.writeHead(301, "/");
  return {
    props: {
      pdf_uri: decodeURIComponent(url as string)
    }
  }
}