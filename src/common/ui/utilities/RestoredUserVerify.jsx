import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { RiMailSendLine } from 'react-icons/ri';
import { restoreUserVerify } from '@features/auth/api/restore/restoreUserVerify';
import { useState } from 'react';

export function RestoredUserVerify({ deletedUserEmail, setStep, restoreKey }) {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleRestoreAccountVerify = async () => {
    const success = await restoreUserVerify(confirmationCode, restoreKey);
    if (success && success.twoFactorEnabled) {
      setStep('restoredTotpVerify');
    }
  };

  return (
    <div className="flex flex-col mt-6 items-center justify-center bg-surface border-2 border-[var(--main-primary)] gap-6 p-8 rounded-2xl">
      <h2 className="text-4xl">
        На почту {deletedUserEmail} отправлен код подтверждения
      </h2>
      <RiMailSendLine size={150} />
      <div className="flex gap-6 w-full justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            required
            className="peer input-styles input-primary"
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <label className="label-styles !bg-[var(--main-surface)]">
            Код подтверждения
          </label>
        </div>
      </div>
      <Button
        variant="primary"
        className="!w-fit"
        onClick={() => handleRestoreAccountVerify()}
      >
        Отправить{' '}
      </Button>
    </div>
  );
}
