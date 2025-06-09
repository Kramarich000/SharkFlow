import * as Yup from 'yup';
import { Filter } from 'bad-words';
import owasp from 'owasp-password-strength-test';

const filter = new Filter();
const noCyrillicRegex = /^[^\u0400-\u04FF]*$/;

owasp.config({
  minLength: 8,
  maxLength: 100,
  minOptionalTestsToPass: 3,
});

function getPasswordStrengthLevel(errorsCount) {
  if (errorsCount === 0) return 'Очень сильный';
  if (errorsCount <= 2) return 'Средний';
  if (errorsCount <= 4) return 'Слабый';
  return 'Очень слабый';
}

export function testPasswordStrength(password) {
  const result = owasp.test(password);
  const level = getPasswordStrengthLevel(result.errors.length);
  return {
    level,
    errors: result.errors,
  };
}

export function getStrengthBarProps(level) {
  switch (level) {
    case 'Очень сильный':
      return { width: '100%', color: 'bg-green-500' };
    case 'Средний':
      return { width: '66%', color: 'bg-yellow-400' };
    case 'Слабый':
      return { width: '33%', color: 'bg-orange-500' };
    case 'Очень слабый':
      return { width: '15%', color: 'bg-red-600' };
    default:
      return { width: '0%', color: 'bg-gray-300' };
  }
}

export const registerSchema = Yup.object({
  login: Yup.string()
    .min(3, 'Логин должен быть не меньше 3 символов')
    .max(20, 'Логин должен быть не длиннее 20 символов')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Логин может содержать только латинские буквы, цифры и подчёркивания',
    )
    .matches(noCyrillicRegex, 'Кириллица запрещена')
    .test('no-profanity', 'Логин содержит недопустимые слова', (val) =>
      val ? !filter.isProfane(val) : true,
    )
    .required('Обязательное поле'),

  email: Yup.string()
    .email('Неверный формат почты')
    .matches(noCyrillicRegex, 'Кириллица запрещена в адресе электронной почты')
    .required('Обязательное поле'),

  password: Yup.string()
    .min(8, 'Пароль должен быть не меньше 8 символов')
    .max(100, 'Пароль слишком длинный')
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
    .test('password-strength', (val) => {
      if (!val) return false;
      const result = owasp.test(val);
      const level = getPasswordStrengthLevel(result.errors.length);

      if (result.errors.length > 2) {
        return new Yup.ValidationError(
          `Пароль слишком слабый (${level}) — используйте более сложную комбинацию`,
        );
      }

      return true;
    })

    .required('Обязательное поле'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
