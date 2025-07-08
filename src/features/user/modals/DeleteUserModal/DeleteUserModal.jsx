import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { motion, AnimatePresence } from 'framer-motion';

import { useModalsStore } from '@store/modalsStore';
import { deleteUser } from '@features/user';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { userVerify } from '@features/user';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

export function DeleteUserModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');

  const isDeleteUserModalOpen = useModalsStore(
    (state) => state.isDeleteUserModalOpen,
  );
  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );

  const sendEmailHandler = async () => {
    setLoad(true);
    try {
      const success = await userVerify();
      if (success) {
        setStep(2);
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
    } finally {
      setLoad(false);
    }
  };

  const deleteUserHandler = async () => {
    await confirmCodeSchema.validate({ confirmationCode });
    setLoad(true);
    try {
      await deleteUser(confirmationCode);
      setIsDeleteUserModalOpen(false);
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
    } finally {
      setLoad(false);
    }
  };

  const handleClose = () => {
    setIsDeleteUserModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setConfirmationCode('');
    }, 300);
  };

  return (
    <ModalBase
      open={isDeleteUserModalOpen}
      onClose={handleClose}
      disableOverlayClose={true}
    >
      <h2 className="text-3xl text-center mb-8">Удаление аккаунта</h2>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key={step}
            initial={{ opacity: 1, transform: 'translateX(0px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col gap-6 justify-center h-full"
          >
            <Step1 loading={load} onNo={handleClose} onYes={sendEmailHandler} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex flex-col gap-6 h-full justify-center"
          >
            <Step2
              loading={load}
              confirmationCode={confirmationCode}
              onCodeChange={(e) => setConfirmationCode(e.target.value)}
              onDelete={deleteUserHandler}
              onCancel={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalBase>
  );
}
