import { LuServerOff } from 'react-icons/lu';

import ErrorPage from '@common/ui';

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
