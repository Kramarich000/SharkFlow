import { Fragment, useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import { updateUser } from '@api/http/users/update/updateUser';
import { confirmUpdate } from '@api/http/users/update/updateUserConfirm';
import { updateSchema } from '@validators/updateSchema';
import { AnimatePresence, motion } from 'framer-motion';
import { showToast } from '@utils/toast/showToast';
import useUserStore from '@store/userStore';
import UpdateConfirmation from './update-user-components/UpdateConfirmation';
import UpdateForm from './update-user-components/UpdateForm';
import { useShallow } from 'zustand/shallow';

export default function UpdateUserModal() {
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
    setNewLogin(user.login);
    setNewEmail(user.email);
    setOriginalLogin(user.login || '');
    setOriginalEmail(user.email || '');
  }, [user]);

  const { isUpdateUserModalOpen, setIsUpdateUserModalOpen } = useModalsStore(
    useShallow((state) => ({
      isUpdateUserModalOpen: state.isUpdateUserModalOpen,
      setIsUpdateUserModalOpen: state.setIsUpdateUserModalOpen,
    })),
  );

  const handleClose = () => {
    setConfirmationCode({ confirmationCode: '' });
    setStep(1);
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

    setLoad(true);
    try {
      const success = await updateUser(code, {
        ...(newLogin?.trim() ? { login: newLogin.trim() } : {}),
      });
      if (success) {
        handleClose();
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition appear show={isUpdateUserModalOpen} as={Fragment}>
      <Dialog
        onClose={() => {}}
        as="div"
        className="relative z-50"
        static={true}
      >
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full border-2 overflow-hidden max-w-4xl transform relative rounded-2xl rounded-b-none bg-white p-4 md:p-6 text-left align-middle shadow-xl !transition-all">
                <div className="max-w-[700px] mx-auto h-full">
                  <h2 className="text-3xl text-center mb-8">
                    Обновление данных
                  </h2>
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
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
                          isLoading={load}
                        />
                      </motion.div>
                    ) : (
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
                  </AnimatePresence>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
