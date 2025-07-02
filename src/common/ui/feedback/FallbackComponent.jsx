import { Link } from 'react-router-dom';
import { Button } from '@common/ui/utilities/Button';

export function FallbackComponent() {
  return (
    <div className="flex flex-col mx-auto gap-6 items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-semibold text-red-600">
        Упс! Что-то пошло не так
      </h1>

      <p className="text-lg text-gray-700 max-w-lg">
        Возможно, произошла ошибка. Пожалуйста, попробуйте ещё раз или вернитесь
        на главную.
      </p>

      <div className="flex gap-4 mt-4 w-full ">
        <Button onClick={() => window.location.reload()} variant="primary">
          Попробовать снова
        </Button>

        <Button
          asChild
          variant="primary"
          className="!rounded-[8px] inline-block hover:!text-white"
        >
          <Link to="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
