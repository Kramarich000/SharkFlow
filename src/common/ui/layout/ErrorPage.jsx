import { Button } from '@common/ui/utilities/Button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorTitle, errorMessage, errorHint, errorIcon }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-full">
      {errorIcon && <div className="mb-4 text-6xl">{errorIcon}</div>}
      <h1 className="text-3xl sm:text-6xl font-bold">{errorTitle}</h1>
      <p className="text-lg sm:text-xl">{errorMessage}</p>
      <Button variant="primary" title="На главную" onClick={goHome}>
        На главную
      </Button>
      <Button variant="primary" title="Назад" onClick={goBack}>
        Назад
      </Button>
      {errorHint && <p className="mt-8 text-gray-500">{errorHint}</p>}
    </div>
  );
};

export default ErrorPage;
