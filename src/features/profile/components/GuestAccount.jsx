import { ToggleTheme } from '@features/user/components/ToggleTheme';

export const GuestAccount = () => {
  return (
    <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
      <div>
        <p className="text-4xl mb-4">Гостевой аккаунт</p>
        <p className="text-xl">
          Это гостевой аккаунт, войдите или зарегистрируйтесь в течении 24 часов
          чтобы сохранить данные
        </p>
      </div>
      <ToggleTheme />
    </div>
  );
};
