import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { restoreUserConfirm } from '@features/auth/api/restore/restoreUserConfirm';

export function UserHasBeenDeleted({
  deletedUserLogin,
  deletedUserEmail,
  deletedUserAvatar,
  restoreKey,
  setStep,
}) {
  const handleRestoreAccount = async () => {
    const success = await restoreUserConfirm(restoreKey);

    if (success) {
      setStep('restoredUserEmail');
    }
  };

  return (
    <div className="flex flex-col mt-6 items-center justify-center bg-surface border-2 border-[var(--main-primary)] gap-6 p-8 rounded-2xl">
      <h2 className="text-4xl">Это вы?</h2>
      <div className="flex flex-col">
        {deletedUserAvatar ? (
          <img
            src={deletedUserAvatar}
            alt="Фото профиля"
            className="w-60 h-60 object-cover border-2 !border-[var(--main-primary)] rounded-full mx-auto mb-8"
          />
        ) : (
          <MdAccountCircle className="w-60 h-60 mx-auto flex items-center justify-center border-2 mb-8 !border-[var(--main-primary)] rounded-full text-[var(--main-button-text)]" />
        )}
        <p className="text-2xl">{deletedUserLogin}</p>
        <p className="text-2xl">{deletedUserEmail}</p>
      </div>
      <div className="flex gap-6 w-full justify-center">
        <Button variant="primary" onClick={() => setStep('login')}>
          Нет
        </Button>
        <Button variant="primary" onClick={() => handleRestoreAccount()}>
          Да
        </Button>
      </div>
    </div>
  );
}
