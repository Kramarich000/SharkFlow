import ErrorPage from '@components/main-components/ErrorPage';
import { MdDoNotDisturb } from 'react-icons/md';

const Error400 = () => {
  return (
    <ErrorPage
      errorTitle="400"
      errorMessage="Ваш запрос не может быть обработан. Проверьте введённые данные."
      errorHint=""
      errorIcon={<MdDoNotDisturb />}
    />
  );
};

export default Error400;
