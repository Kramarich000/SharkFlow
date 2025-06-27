import { MdDoNotDisturb } from 'react-icons/md';

import ErrorPage from '@common/ui';

export const Error400 = () => {
  return (
    <ErrorPage
      errorTitle="400"
      errorMessage="Ваш запрос не может быть обработан. Проверьте введённые данные."
      errorHint=""
      errorIcon={<MdDoNotDisturb />}
    />
  );
};
