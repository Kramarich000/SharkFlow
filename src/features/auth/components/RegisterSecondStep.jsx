// import AnimatedError from 'common/ui/feedback/AnimatedError';
// import { confirmCode } from 'features/user/api/createUser';
// import { useRegisterStore } from 'features/auth/store/registerStore';
// import { confirmCodeSchema } from '@validators/confirmCodeSchema';

import { useState } from 'react';
import { AiOutlineSync } from 'react-icons/ai';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';

import { AnimatedError } from '@common/ui';
import { confirmCode } from '@features/user';
import { useRegisterStore } from '@features/auth';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { Button } from '@common/ui/utilities/Button';

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
          <Form className="grid gap-8 mt-8 border-2 border-[var(--main-primary)] p-8 rounded-2xl bg-surface shadow-glow">
            <h2 className="text-3xl">Код подтверждения</h2>
            <div className="relative">
              <Field
                name="confirmationCode"
                type="text"
                id="confirmationCode"
                required
                  className="peer input-styles input-primary"
                placeholder=" "
                disabled={load}
              />
              <label
                htmlFor="confirmationCode"
                className="label-styles !bg-[var(--main-surface)]"
              >
                Введите код подтверждения
              </label>
              <ErrorMessage name="confirmationCode">
                {(msg) => <AnimatedError msg={msg} variant="register" />}
              </ErrorMessage>
              {/* <ErrorMessage name="confirmationCode" component={AnimatedError} /> */}
            </div>
            <Button variant="primary" type="submit" disabled={load}>
              {load ? (
                <AiOutlineSync className="animate-spin" size={23} />
              ) : (
                <>Подтвердить</>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
