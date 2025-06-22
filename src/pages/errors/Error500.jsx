import ErrorPage from 'common/ui/ErrorPage';
import { LuServerOff } from 'react-icons/lu';

export const Error500 = () => {
  return (
    <ErrorPage
      errorTitle="500"
      errorMessage="Ошибка сервера. Пожалуйста, попробуйте позже."
      errorHint=""
      errorIcon={<LuServerOff />}
    />
  );
};

