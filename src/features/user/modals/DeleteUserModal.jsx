import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { AiOutlineSync } from 'react-icons/ai';
import { useModalsStore } from '@store/modalsStore';
import { deleteUser } from '@features/user';
import { emailSchema } from '@validators/emailSchema';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { userVerify } from '@features/user';

export function DeleteUserModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState({
    confirmationCode: '',
  });

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

  const deleteUserHandler = async (confirmationCode) => {
    await confirmCodeSchema.validate(confirmationCode);
    setLoad(true);
    try {
      await deleteUser(confirmationCode.confirmationCode);
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
              <DialogPanel className="modal-base w-full border-2 max-w-2xl overflow-hidden transform relative rounded-2xl rounded-b-none p-4 md:p-6 text-left align-middle shadow-xl !transition-all">
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
                      <h2 className="text-center text-2xl md:text-3xl mb-4">
                        Вы уверены что хотите удалить аккаунт? Это действие{' '}
                        <span className="text-red-700">необратимо</span>
                      </h2>
                      <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                        <button
                          className={`btn-primary ${load ? 'pointer-events-none' : ''}`}
                          disabled={load}
                          onClick={() => {
                            setConfirmationCode({ confirmationCode: '' });
                            setStep(1);
                            setIsDeleteUserModalOpen(false);
                          }}
                        >
                          Нет
                        </button>
                        <button
                          className={`btn-primary order-[-1] md:order-1 items-center justify-center flex ${load ? 'btn-loading' : ''}`}
                          onClick={() => {
                            sendEmailHandler();
                          }}
                          disabled={load}
                        >
                          {load ? (
                            <AiOutlineSync className="animate-spin" size={24} />
                          ) : (
                            <>Да, отправить код на почту</>
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
                      className="flex flex-col gap-6 h-full justify-center"
                    >
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
                      <div className="flex gap-2 flex-col md:flex-rowflex-col md:flex-row items-center justify-center">
                        <button
                          className={`btn-primary ${load ? 'pointer-events-none' : ''}`}
                          disabled={load}
                          onClick={() => {
                            setConfirmationCode({ confirmationCode: '' });
                            setStep(1);
                            setIsDeleteUserModalOpen(false);
                          }}
                        >
                          Отмена
                        </button>
                        <button
                          className={`btn-primary order-[-1] md:order-1 items-center justify-center flex ${load ? 'pointer-events-none' : ''}`}
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
                    </motion.div>
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
