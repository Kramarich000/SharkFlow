import { Fragment, useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import { updateUser } from '@api/http/users/update/updateUser';
import { confirmUpdate } from '@api/http/users/update/updateUserConfirm';
import { updateSchema } from '@validators/updateSchema';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@utils/toast/showToast';
import useUserStore from '@store/userStore';

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

  // useEffect(() => {
  //   if (step === 2) {
  //     showToast(
  //       'Пожалуйста, убедитесь, что вы указали правильную почту. В случае ошибки вы можете потерять доступ к аккаунту. Навсегда',
  //       'warning',
  //       10000,
  //     );
  //   }
  // }, [step]);

  const isUpdateUserModalOpen = useModalsStore(
    (state) => state.isUpdateUserModalOpen,
  );

  const setIsUpdateUserModalOpen = useModalsStore(
    (state) => state.setIsUpdateUserModalOpen,
  );

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
        // ...(newEmail ? { email: newEmail } : {}),
      });
      if (success) {
        setIsUpdateUserModalOpen(false);
        setStep(1);
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
      setLoad(false);
      // setIsUpdateUserModalOpen(false);
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
              <DialogPanel className="w-full border-2 overflow-hidden max-w-4xl h-[440px] md:h-[350px] transform relative rounded-2xl  rounded-b-none bg-white p-4 md:p-6 text-left align-middle shadow-xl !transition-all">
                <div className="max-w-[700px] mx-auto h-full">
                  <h2 className="text-3xl text-center">Обновление данных</h2>{' '}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key={step}
                        initial={{ opacity: 1, transform: 'translateX(0px)' }}
                        animate={{ opacity: 1, transform: 'translateX(0px)' }}
                        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-6 h-full justify-center"
                      >
                        <h2 className="text-center text-2xl sm:text-3xl mb-4">
                          Вы уверены что хотите обновить данные аккаунта?
                        </h2>
                        <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                          <button
                            className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                            disabled={load}
                            onClick={() => {
                              setConfirmationCode({ confirmationCode: '' });
                              setStep(1);
                              setIsUpdateUserModalOpen(false);
                            }}
                          >
                            Нет
                          </button>
                          <button
                            className={`primary-btn order-[-1] md:order-1 items-center justify-center flex ${load ? '!bg-gray-600 pointer-events-none' : ''}`}
                            onClick={() => {
                              sendEmailHandler();
                            }}
                            disabled={load}
                          >
                            {load ? (
                              <AiOutlineSync
                                className="animate-spin"
                                size={24}
                              />
                            ) : (
                              <>Да, отправить код на почту</>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {step === 2 && (
                      <div className="flex flex-col justify-between h-full">
                        <motion.div
                          key={step}
                          initial={{
                            opacity: 0,
                            transform: 'translateX(50px)',
                          }}
                          animate={{ opacity: 1, transform: 'translateX(0px)' }}
                          exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="flex flex-col gap-5 h-full justify-center mb-4"
                        >
                          <div className="">
                            <h2 className="text-center text-2xl sm:text-3xl mb-4">
                              Введите код и новые данные:
                            </h2>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                className="peer input-styles"
                                value={confirmationCode.confirmationCode}
                                onChange={(e) =>
                                  setConfirmationCode({
                                    confirmationCode: e.target.value,
                                  })
                                }
                                disabled={load}
                                placeholder=" "
                              />
                              <label className="label-styles">
                                Введите код подтверждения
                              </label>
                            </div>
                          </div>
                          <div className="">
                            <div className="relative">
                              <input
                                type="text"
                                required
                                className="peer input-styles"
                                value={newLogin}
                                onChange={(e) => setNewLogin(e.target.value)}
                                disabled={load}
                                placeholder=" "
                                // maxLength={30}
                              />
                              <label className="label-styles">
                                Введите новый логин
                              </label>
                            </div>
                            {/* <p className="text-center text-2xl">и/или</p> */}
                            {/* <div className="relative">
                              <input
                                type="text"
                                required
                                className="peer input-styles"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                disabled={load}
                                placeholder=" "
                              />
                              <label className="label-styles">
                                Введите новую почту
                              </label>
                            </div> */}
                          </div>
                          <div className="flex items-center flex-col md:flex-row  justify-center gap-2">
                            <button
                              className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                              disabled={load}
                              onClick={() => {
                                setConfirmationCode({ confirmationCode: '' });
                                setStep(1);
                                setIsUpdateUserModalOpen(false);
                              }}
                            >
                              Отмена
                            </button>
                            <button
                              className={`primary-btn order-[-1] md:order-1 items-center justify-center flex ${load ? 'pointer-events-none' : ''}`}
                              onClick={() => updateUserHandler()}
                              disabled={load}
                            >
                              {load ? (
                                <AiOutlineSync
                                  className="animate-spin !text-white"
                                  size={24}
                                />
                              ) : (
                                <>Подтвердить обновление</>
                              )}
                            </button>
                          </div>{' '}
                        </motion.div>
                      </div>
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
