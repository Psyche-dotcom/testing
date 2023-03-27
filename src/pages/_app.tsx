// import 'rsuite/dist/rsuite.min.css'
import "@sass/main.scss";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/graphql";
import PlausibleProvider from "next-plausible";
import { store } from "@redux/store/store";
import AuthProvider from "@auth/SecureRoute/AuthProvider";
import GeneralMenu from "@shared/Menu/GeneralMenu/GeneralMenu";
import AccountMenu from "@shared/Menu/AccountMenu/AccountMenu";
import ToastNotification from "@shared/ToastNotification/ToastNotification";
import QR from "@sections/Sliders/HeroSlider/HelperComps/QR";
import Share from "@sections/Sliders/HeroSlider/HelperComps/Share/Share";
import Info from "@sections/Sliders/HeroSlider/HelperComps/Info";
import "react-drag-reorder/dist/components/draggableChildren/draggableChild.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const customDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN;
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider customDomain={customDomain} domain={domain}>
      <Head>
        <title>VReel</title>

        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <script
          defer
          data-domain="vreel.page"
          src="https://analytics.vreel.media/js/plausible.js"
        ></script>
      </Head>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <AuthProvider>
              <GeneralMenu />
              <AccountMenu />
              <ToastNotification />
              <QR />
              <Share />
              {/* <Info /> */}
              <Component {...pageProps} />
            </AuthProvider>
          </Provider>
        </ApolloProvider>
      </CookiesProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
// nothing
