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
import { updateUser } from '@api/http/user/update/updateUser';
import { confirmUpdate } from '@api/http/user/update/updateUserConfirm';
import { emailSchema } from '@validators/emailSchema';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@utils/toast/showToast';
import useUserStore from '@store/userStore';
import { use } from 'react';

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
              <DialogPanel className="w-full border-2 overflow-auto max-w-6xl max-h-[270px] transform relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
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
                      <div className="flex items-center justify-center gap-6">
                        <button
                          className={`primary-btn !w-fit ${load ? 'pointer-events-none' : ''}`}
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
                          className={`primary-btn !w-fit items-center justify-center flex ${load ? '!bg-gray-600 pointer-events-none' : ''}`}
                          onClick={() => {
                            sendEmailHandler();
                          }}
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
                    <div className="flex flex-col justify-between h-full ">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, transform: 'translateX(50px)' }}
                        animate={{ opacity: 1, transform: 'translateX(0px)' }}
                        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-6 h-full justify-evenly mb-4"
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
                        </div>
                      </motion.div>
                      <div className="flex items-center justify-center gap-6">
                        <button
                          className={`primary-btn !w-[255px] ${load ? 'pointer-events-none' : ''}`}
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
                          className={`primary-btn !w-[255px] items-center justify-center flex ${load ? 'pointer-events-none' : ''}`}
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
