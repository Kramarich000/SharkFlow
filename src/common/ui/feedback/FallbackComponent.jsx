import { Link } from 'react-router-dom';

export function FallbackComponent() {
  return (
    <div className="flex flex-col mx-auto gap-6 items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-semibold text-red-600">
        Упс! Что-то пошло не так
      </h1>

      <p className="text-lg text-gray-700 max-w-lg">
        Возможно, произошла ошибка. Пожалуйста, попробуйте
        ещё раз или вернитесь на главную.
      </p>

      <div className="flex gap-4 mt-4 w-full ">
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Попробовать снова
        </button>

        <Link to="/" className="btn-primary !rounded-[8px] inline-block hover:!text-white">
          На главную
        </Link>
      </div>
    </div>
  );
}
