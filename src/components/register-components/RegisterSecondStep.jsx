import { ErrorMessage, Field, Form, Formik } from 'formik';
import AnimatedError from '@components/main-components/AnimatedError';
import { confirmCode } from '@api/http/users/create/createUser';
import { motion } from 'framer-motion';
import { useRegisterStore } from '@store/registerStore';
import { useState } from 'react';
import { AiOutlineSync } from 'react-icons/ai';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';

export default function RegisterSecondStep() {
  const { setStep } = useRegisterStore();
  const [load, setLoad] = useState(false);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, transform: 'translateX(50px)' }}
      animate={{ opacity: 1, transform: 'translateX(0)' }}
      exit={{ opacity: 0, transform: 'translateX(-50px)' }}
    >
      <motion.h2
        initial={{ opacity: 0, transform: 'translateX(50px)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
        className="text-7xl"
      >
        Шаг 2/3
      </motion.h2>

      <Formik
        validationSchema={confirmCodeSchema}
        initialValues={{ confirmationCode: '' }}
        onSubmit={async (values, actions) => {
          setLoad(true);
          const success = await confirmCode(values);
          if (success) {
            setStep(3);
            setLoad(false);
          } else {
            actions.setSubmitting(false);
            setLoad(false);
          }
        }}
      >
        {() => (
          <Form className="grid gap-8 mt-8 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
            <h2 className="text-3xl">Код подтверждения</h2>
            <div className="relative">
              <Field
                name="confirmationCode"
                type="text"
                id="confirmationCode"
                required
                className="peer input-styles"
                placeholder=" "
                disabled={load}
              />
              <label htmlFor="confirmationCode" className="label-styles">
                Введите код подтверждения
              </label>
              <ErrorMessage name="confirmationCode">
                {(msg) => <AnimatedError msg={msg} variant="register" />}
              </ErrorMessage>
              <ErrorMessage name="confirmationCode" component={AnimatedError} />
            </div>
            <button
              className="primary-btn flex items-center justify-center"
              type="submit"
              disabled={load}
            >
              {load ? (
                <AiOutlineSync className="animate-spin" size={24} />
              ) : (
                <>Подтвердить</>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
