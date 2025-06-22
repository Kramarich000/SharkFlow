import ErrorPage from 'common/ui/ErrorPage';
import { MdError } from 'react-icons/md';
export const Error404 = () => {
  return (
    <ErrorPage
      errorTitle="404"
      errorMessage="Запрашиваемый ресурс не найден."
      errorHint="Проверьте правильность URL или воспользуйтесь меню сайта."
      errorIcon={<MdError />}
    />
  );
};
