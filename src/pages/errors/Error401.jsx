import ErrorPage from '@components/main-components/ErrorPage';
import { FiShieldOff } from 'react-icons/fi';

const Error401 = () => {
  return (
    <ErrorPage
      errorTitle="401"
      errorMessage="Для доступа к этой странице необходимо войти в систему."
      errorHint=""
      errorIcon={<FiShieldOff />}
    />
  );
};

export default Error401;
