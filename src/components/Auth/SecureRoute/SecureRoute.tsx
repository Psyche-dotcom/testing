import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

const SecureRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const authenticated = useSelector(
      (state: RootState) => state.userAuth.userAuthenticated
    );
    const [cookies, setCookie, removeCookie] = useCookies(['userAuthToken']);

    if (typeof window !== 'undefined') {
      const token = cookies.userAuthToken;
      if (!token || !authenticated) {
        router.replace({
          pathname: '/login',
          query: { from: router.asPath },
        });
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default SecureRoute;
