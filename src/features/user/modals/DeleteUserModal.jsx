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
import { Button } from '@common/ui/utilities/Button';

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
    <Transition
      afterLeave={() => {
        setStep(1);
        setConfirmationCode({ confirmationCode: '' });
      }}
      appear
      show={isDeleteUserModalOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {}}
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-none sm:backdrop-blur-sm" />
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
                      Вы уверены что хотите удалить аккаунт?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                      <Button
                        variant="primary"
                        disabled={load}
                        onClick={() => {
                          setIsDeleteUserModalOpen(false);
                          setStep(1);
                        }}
                      >
                        Нет
                      </Button>
                      <Button
                        variant="primary"
                        className="order-[-1] md:order-1"
                        onClick={() => {
                          sendEmailHandler();
                        }}
                        disabled={load}
                      >
                        {load ? (
                          <AiOutlineSync className="animate-spin" size={23} />
                        ) : (
                          <>Да, отправить код на почту</>
                        )}
                      </Button>
                    </div>
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
                    <h2 className="text-center text-3xl mb-4">Введите код:</h2>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="peer input-styles input-primary"
                        value={confirmationCode.confirmationCode}
                        onChange={(e) =>
                          setConfirmationCode({
                            confirmationCode: e.target.value,
                          })
                        }
                        disabled={load}
                        placeholder=" "
                      />
                      <label className="label-styles !bg-[var(--main-modal-bg)]">
                        Введите код подтверждения
                      </label>
                    </div>
                    <div className="flex gap-2 flex-col md:flex-rowflex-col md:flex-row items-center justify-center">
                      <Button
                        variant="primary"
                        disabled={load}
                        onClick={() => {
                          setIsDeleteUserModalOpen(false);
                        }}
                      >
                        Отмена
                      </Button>
                      <Button
                        variant="primary"
                        className="order-[-1] md:order-1 !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                        onClick={() => deleteUserHandler(confirmationCode)}
                        disabled={load}
                      >
                        {load ? (
                          <AiOutlineSync
                            className="animate-spin !text-white"
                            size={23}
                          />
                        ) : (
                          <>Подтвердить удаление</>
                        )}
                      </Button>
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
