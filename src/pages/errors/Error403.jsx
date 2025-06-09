import ErrorPage from '@components/main-components/ErrorPage';
import { IoHandLeft } from 'react-icons/io5';

const Error403 = () => {
  return (
    <ErrorPage
      errorTitle="403"
      errorMessage="У вас нет прав для доступа к этой странице."
      errorHint=""
      errorIcon={<IoHandLeft />}
    />
  );
};

export default Error403;
