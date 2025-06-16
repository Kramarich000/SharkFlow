import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import deleteUser from '@api/http/user/deleteUser';
import userVerify from '@api/http/user/userVerify';
import { emailSchema } from '@validators/emailSchema';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeleteUserModal() {
  const [load, setLoad] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [confirmationCode, setConfirmationCode] = useState({
    confirmationCode: '',
  });

  const isDeleteUserModalOpen = useModalsStore(
    (state) => state.isDeleteUserModalOpen,
  );
  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );

  const sendEmailHandler = async (email) => {
    try {
      await emailSchema.validate(email);
    } catch (validationError) {
      return;
    }
    setLoad(true);
    try {
      try {
        const success = await userVerify(email);
        if (success) {
          setStep(3);
        }
      } catch (error) {
        console.error('Ошибка отправки кода:', error);
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
    } finally {
      setLoad(false);
    }
  };

  const deleteUserHandler = async (confirmationCode) => {
    await confirmCodeSchema.validate(confirmationCode);
    setLoad(true);
    try {
      await deleteUser(confirmationCode.confirmationCode);
      setConfirmationCode({ confirmationCode: '' });
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition appear show={isDeleteUserModalOpen} as={Fragment}>
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
              <DialogPanel className="w-full border-2 max-w-2xl h-[280px] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, transform: 'translateX(50px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex flex-col gap-6 h-full justify-evenly"
                  >
                    {step === 1 && (
                      <>
                        <h2 className="text-center text-3xl mb-4">
                          Вы уверены что хотите удалить аккаунт? Это действие
                          необратимо!
                        </h2>
                        <div className="flex items-center justify-between gap-6">
                          <button
                            className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                            disabled={load}
                            onClick={() => {
                              setInputValue('');
                              setConfirmationCode({ confirmationCode: '' });
                              setStep(1);
                              setIsDeleteUserModalOpen(false);
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
                              <AiOutlineSync
                                className="animate-spin"
                                size={24}
                              />
                            ) : (
                              <>Да</>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <h2 className="text-center text-3xl mb-4">
                          Введите почту для удаления аккаунта:
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
                              setIsDeleteUserModalOpen(false);
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
                              <AiOutlineSync
                                className="animate-spin"
                                size={24}
                              />
                            ) : (
                              <>Отправить код</>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
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
                        <div className="flex gap-6">
                          <button
                            className={`primary-btn ${load ? 'pointer-events-none' : ''}`}
                            disabled={load}
                            onClick={() => {
                              setInputValue('');
                              setConfirmationCode({ confirmationCode: '' });
                              setStep(1);
                              setIsDeleteUserModalOpen(false);
                            }}
                          >
                            Отмена
                          </button>{' '}
                          <button
                            className={`primary-btn items-center !bg-red-700 hover:!bg-red-800 justify-center flex ${load ? 'pointer-events-none' : ''}`}
                            onClick={() => deleteUserHandler(confirmationCode)}
                            disabled={load}
                          >
                            {load ? (
                              <AiOutlineSync
                                className="animate-spin !text-white"
                                size={24}
                              />
                            ) : (
                              <>Подтвердить удаление</>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
