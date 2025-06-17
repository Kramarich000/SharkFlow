import * as Yup from 'yup';

export const passwordResetEmailSchema = Yup.object({
  email: Yup.string()
    .email('Неверный формат почты')
    .matches(noCyrillicRegex, 'Кириллица запрещена в адресе электронной почты')
    .required('Обязательное поле'),
});

export const passwordResetCodeSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, 'Код должен состоять из 6 цифр')
    .required('Обязательное поле'),
});

export const passwordResetNewPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Пароль должен быть не меньше 8 символов')
    .max(100, 'Пароль должен быть не длиннее 100 символов')
    .matches(
      /[A-Z]/,
      'Пароль должен содержать хотя бы одну заглавную латинскую букву',
    )
    .matches(
      /[a-z]/,
      'Пароль должен содержать хотя бы одну строчную латинскую букву',
    )
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(
      /[@$!%*?&#]/,
      'Пароль должен содержать хотя бы один специальный символ (@, $, !, %, *, ?, &, #)',
    )
    .matches(noCyrillicRegex, 'Кириллица запрещена')
    .test('no-profanity', 'Пароль содержит недопустимые слова', (val) =>
      val ? !filter.isProfane(val) : true,
    )

    .required('Обязательное поле'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
