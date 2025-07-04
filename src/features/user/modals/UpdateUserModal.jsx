import { Fragment, useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { showToast } from '@utils/toast';

import { useModalsStore } from '@store/modalsStore';
import {
  updateUser,
  confirmUpdate,
  updateSchema,
  UpdateForm,
  UpdateConfirmation,
  useUserStore,
} from '@features/user';

import { IoCheckmarkCircle } from 'react-icons/io5';

export function UpdateUserModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState({
    confirmationCode: '',
  });

  const [newLogin, setNewLogin] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [originalLogin, setOriginalLogin] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setNewLogin(user.login);
      setNewEmail(user.email);
      setOriginalLogin(user.login || '');
      setOriginalEmail(user.email || '');
    }
  }, [user]);

  const { isUpdateUserModalOpen, setIsUpdateUserModalOpen } = useModalsStore(
    useShallow((state) => ({
      isUpdateUserModalOpen: state.isUpdateUserModalOpen,
      setIsUpdateUserModalOpen: state.setIsUpdateUserModalOpen,
    })),
  );

  const handleClose = () => {
    setIsUpdateUserModalOpen(false);
  };

  const sendEmailHandler = async () => {
    setLoad(true);
    try {
      const success = await confirmUpdate();
      if (success) {
        setStep(2);
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
    } finally {
      setLoad(false);
    }
  };

  const updateUserHandler = async () => {
    console.log('updateUserHandler called');
    const code = confirmationCode.confirmationCode;
    if (newLogin === originalLogin && newEmail === originalEmail) {
      showToast('Нет изменений для сохранения', 'info');
      return;
    }
    try {
      await updateSchema.validate({
        confirmationCode: code,
        email: newEmail,
        login: newLogin,
      });
    } catch (err) {
      showToast(err.message || 'Ошибка валидации', 'error');
      return;
    }

    try {
      setLoad(true);
      const success = await updateUser(code, {
        ...(newLogin?.trim() ? { login: newLogin.trim() } : {}),
      });
      if (success) {
        setStep(3);
        setTimeout(() => {
          handleClose();
          setStep(1);
        }, 4000);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition
      afterLeave={() => {
        setConfirmationCode({ confirmationCode: '' });
        setStep(1);
      }}
      appear
      show={isUpdateUserModalOpen}
      as={Fragment}
    >
      <Dialog
        onClose={() => {}}
        as="div"
        className="relative z-50"
        static={true}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <DialogPanel className="modal-base w-full border-2 max-w-xl transform overflow-hidden relative rounded-2xl p-6 text-left align-middle shadow-xl !transition-all">
              <h2 className="text-3xl text-center mb-8">Обновление данных</h2>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1-motion"
                    initial={{ opacity: 1, transform: 'translateX(0px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <UpdateConfirmation
                      onConfirm={sendEmailHandler}
                      onCancel={handleClose}
                      loading={load}
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2-motion"
                    initial={{
                      opacity: 0,
                      transform: 'translateX(50px)',
                    }}
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <UpdateForm
                      onUpdate={updateUserHandler}
                      onCancel={handleClose}
                      isLoading={load}
                      confirmationCode={confirmationCode}
                      setConfirmationCode={setConfirmationCode}
                      newLogin={newLogin}
                      setNewLogin={setNewLogin}
                      newEmail={newEmail}
                      setNewEmail={setNewEmail}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3-motion"
                    initial={{ opacity: 0, transform: 'translateX(50px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                  >
                    <div className="p-12 border-2 border-[var(--main-primary)] text-center mt-8 rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow">
                      <IoCheckmarkCircle
                        size={100}
                        className="text-[var(--main-primary)]"
                      />
                      <p className="text-[20px]">
                        Вы успешно обновили данные аккаунта
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
