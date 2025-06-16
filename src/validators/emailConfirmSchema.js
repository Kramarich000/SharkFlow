import * as Yup from 'yup';

export const emailConfirmSchema = Yup.object({
  confirmationCode: Yup.string()
    .matches(/^\d{6}$/, 'Код должен состоять из 6 цифр')
    .required('Обязательное поле'),
});
