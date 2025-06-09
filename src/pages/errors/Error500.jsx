import ErrorPage from '@components/main-components/ErrorPage';
import { LuServerOff } from 'react-icons/lu';

const Error500 = () => {
  return (
    <ErrorPage
      errorTitle="500"
      errorMessage="Ошибка сервера. Пожалуйста, попробуйте позже."
      errorHint=""
      errorIcon={<LuServerOff />}
    />
  );
};

export default Error500;
