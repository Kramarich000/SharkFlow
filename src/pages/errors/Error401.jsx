import { FiShieldOff } from 'react-icons/fi';

import { ErrorPage } from '@common/ui';

export const Error401 = () => {
  return (
    <ErrorPage
      errorTitle="401"
      errorMessage="Для доступа к этой странице необходимо войти в систему."
      errorHint=""
      errorIcon={<FiShieldOff />}
    />
  );
};
