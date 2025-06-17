import { Fragment, useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import useBoardStore from '@store/boardStore';
import { AiOutlineSync } from 'react-icons/ai';
import { updateUser } from '@api/http/user/updateUser';
import { userVerify } from '@api/http/user/userSendCode';
import { emailSchema } from '@validators/emailSchema';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@utils/toast/showToast';

export default function UpdateUserModal() {
  const [load, setLoad] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const [confirmationCode, setConfirmationCode] = useState({
    confirmationCode: '',
  });

  const [newLogin, setNewLogin] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (step === 3) {
      showToast(
        'Пожалуйста, убедитесь, что вы указали правильную почту. В случае ошибки вы можете потерять доступ к аккаунту. Навсегда',
        'warning',
        10000,
      );
    }
  }, [step]);

  const isUpdateUserModalOpen = useModalsStore(
    (state) => state.isUpdateUserModalOpen,
  );

  const setIsUpdateUserModalOpen = useModalsStore(
    (state) => state.setIsUpdateUserModalOpen,
  );

  const sendEmailHandler = async () => {
    setLoad(true);
    try {
      const success = await userVerify();
      if (success) {
        setStep(3);
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
    } finally {
      setLoad(false);
    }
  };

  const finallyConfirmHandler = () => {};

  const updateUserHandler = async () => {
    const code = confirmationCode.confirmationCode;

    try {
      await confirmCodeSchema.validate({ confirmationCode: code });
      if (newEmail) {
        await emailSchema.validate(newEmail);
      }
    } catch (err) {
      return;
    }
    setLoad(true);
    try {
      await updateUser(code, {
        ...(newLogin ? { login: newLogin } : {}),
        ...(newEmail ? { email: newEmail } : {}),
      });
      setIsUpdateUserModalOpen(false);
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition appear show={isUpdateUserModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {}}
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
              <DialogPanel className="w-full border-2 max-w-6xl h-[270px] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 1, transform: 'translateX(0px)' }}
                      animate={{ opacity: 1, transform: 'translateX(0px)' }}
                      exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex flex-col gap-6 h-full justify-evenly"
                    >
                      <h2 className="text-center text-3xl mb-4">
                        Вы уверены что хотите обновить данные аккаунта?
                      </h2>
                      <div className="flex items-center justify-between gap-6">
                        <button
                          className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                          disabled={load}
                          onClick={() => {
                            setInputValue('');
                            setConfirmationCode({ confirmationCode: '' });
                            setStep(1);
                            setIsUpdateUserModalOpen(false);
                          }}
                        >
                          Нет
                        </button>
                        <button
                          className={`primary-btn items-center justify-center flex ${load ? '!bg-gray-600 pointer-events-none' : ''}`}
                          onClick={() => setStep(2)}
                          disabled={load}
                        >
                          {load ? (
                            <AiOutlineSync className="animate-spin" size={24} />
                          ) : (
                            <>Да</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, transform: 'translateX(50px)' }}
                      animate={{ opacity: 1, transform: 'translateX(0px)' }}
                      exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex flex-col gap-6 h-full justify-evenly"
                    >
                      <h2 className="text-center text-3xl mb-4">
                        Введите почту для обновления данных аккаунта:
                      </h2>
                      <div className="relative">
                        <input
                          type="email"
                          className="peer input-styles w-full p-2 border rounded mb-4"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={load}
                          required
                          id="email"
                          name="email"
                          autoComplete="email"
                          placeholder=" "
                        />
                        <label htmlFor="email" className="label-styles">
                          Введите почту
                        </label>
                      </div>
                      <div className="flex gap-6">
                        <button
                          className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                          disabled={load}
                          onClick={() => {
                            setInputValue('');
                            setConfirmationCode({ confirmationCode: '' });
                            setStep(1);
                            setIsUpdateUserModalOpen(false);
                          }}
                        >
                          Отмена
                        </button>
                        <button
                          className={`primary-btn items-center justify-center flex ${load ? '!bg-gray-600 pointer-events-none' : ''}`}
                          onClick={() => sendEmailHandler(inputValue)}
                          disabled={load}
                        >
                          {load ? (
                            <AiOutlineSync className="animate-spin" size={24} />
                          ) : (
                            <>Отправить код</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col justify-between h-full ">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, transform: 'translateX(50px)' }}
                        animate={{ opacity: 1, transform: 'translateX(0px)' }}
                        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex gap-6 h-full justify-evenly"
                      >
                        <div className="">
                          <h2 className="text-center text-3xl mb-4">
                            Введите код:
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
                        <p className="text-3xl">затем</p>
                        <div className="">
                          <h2 className="text-center text-3xl mb-4">
                            Введите новые данные:
                          </h2>
                          <div className="flex items-center justify-center gap-2">
                            <div className="relative">
                              <input
                                type="text"
                                required
                                className="peer input-styles"
                                value={newLogin}
                                onChange={(e) => setNewLogin(e.target.value)}
                                disabled={load}
                                placeholder=" "
                              />
                              <label className="label-styles">
                                Введите новый логин
                              </label>
                            </div>
                            <p className="text-center text-2xl">и/или</p>
                            <div className="relative">
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
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <div className="flex gap-6">
                        <button
                          className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                          disabled={load}
                          onClick={() => {
                            setInputValue('');
                            setConfirmationCode({ confirmationCode: '' });
                            setStep(1);
                            setIsUpdateUserModalOpen(false);
                          }}
                        >
                          Отмена
                        </button>
                        <button
                          className={`primary-btn items-center justify-center flex ${load ? 'pointer-events-none' : ''}`}
                          onClick={() =>
                            updateUserHandler(
                              confirmationCode,
                              newLogin,
                              newEmail,
                            )
                          }
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
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
