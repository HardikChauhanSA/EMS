const constants = require('../../../helper/constants');

const validator = {};
const input = {
  '/signup': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    image: {
      isOptional: true,
      rules: [{ type: 'isValidBase64' }],
    },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
    password: [
      { type: 'notEmpty' },
    ],
    fullName: [
      { type: 'notEmpty' },
      { type: 'checkLength', options: { max: 100 } },
    ],
  },
  '/authenticate': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
    password: [
      { type: 'notEmpty' },
    ],
  },
  '/authenticate-provider': {
    provider: { type: 'isValidEnum', options: { aEnum: constants.auth.providers } },
    socialInfo: {
      hasChilds: true,
      childs: {
        id: {
          byPassWhen: (body) => { return !constants.auth.providers.Facebook.is(body.provider); },
          rules: [{ type: 'notEmpty' }],
        },
        accessToken: {
          byPassWhen: (body) => { return !constants.auth.providers.Facebook.is(body.provider); },
          rules: [{ type: 'notEmpty' }],
        },
      },
      rules: [
        { type: 'notEmpty' },
      ],
    },
    fullName: [
      { type: 'notEmpty' },
      { type: 'checkLength', options: { max: 100 } },
    ],
  },
  '/forget-password': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
  },
  '/reset-password': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
    otp: [{ type: 'notEmpty' }, { type: 'isInt' }, { type: 'checkLength', options: { min: 5, max: 5 } }],
    password: [
      { type: 'notEmpty' },
      { type: 'validPassword' },
    ],
  },
  '/otp-verify': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
    otp: [{ type: 'notEmpty' }, { type: 'isInt' }, { type: 'checkLength', options: { min: 5, max: 5 } }],
  },
  '/resend-otp': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
  },
  '/recover-account-otp': {
    email: [
      { type: 'notEmpty' },
      { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
    ],
  },
  '/recover-account': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    recoverEmailId: [
      { type: 'notEmpty' },
      { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
    ],
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
    otp: [{ type: 'notEmpty' }, { type: 'isInt' }, { type: 'checkLength', options: { min: 5, max: 5 } }],
    password: [
      { type: 'notEmpty' },
      { type: 'validPassword' },
    ],
  },
  '/update-profile': {
    // loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    // email: {
    //   byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
    //   rules: [
    //     { type: 'notEmpty' },
    //     { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
    //   ],
    // },
    // phone: {
    //   byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
    //   rules: [
    //     { type: 'notEmpty' },
    //     { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
    //   ],
    // },
    firstName: {
      isOptional: true,
      rules: [
        { type: 'checkLength', options: { max: 50 } },
      ],
    },
    lastName: {
      isOptional: true,
      rules: [
        { type: 'checkLength', options: { max: 50 } },
      ],
    },
    dob: {
      isOptional: true,
      rules: [
        { type: 'isValidDate' },
      ],
    },
    gender: {
      isOptional: true,
      rules: [
        { type: 'isValidEnum', options: { aEnum: constants.user.genders } },
      ],
    },
    address: {
      isOptional: true,
      hasChilds: true,
      childs: {
        addressLine1: [{ type: 'notEmpty' }, { type: 'checkLength', options: { max: 100 } }],
        city: [{ type: 'notEmpty' }, { type: 'checkLength', options: { max: 50 } }],
        state: [{ type: 'notEmpty' }, { type: 'checkLength', options: { max: 50 } }],
        country: [{ type: 'notEmpty' }, { type: 'checkLength', options: { max: 50 } }],
        pinCode: [{ type: 'notEmpty' }, { type: 'checkLength', options: { min: 2, max: 11 } }, { type: 'isAlphanumeric' }],
      },
      rules: [
        { type: 'notEmpty' },
      ],
    },
    card: {
      isOptional: true,
      hasChilds: true,
      childs: {
        cardNo: [{ type: 'notEmpty' }, { type: 'isValidCC' }],
        expDate: [{ type: 'notEmpty' }, { type: 'isValidCCExpDate' }],
        cvv: [{ type: 'notEmpty' }, { type: 'isInt' }, { type: 'checkLength', options: { min: 3, max: 4 } }],
        ccName: [{ type: 'notEmpty' }, { type: 'checkLength', options: { max: 100 } }],
      },
      rules: [
        { type: 'notEmpty' },
      ],
    },
  },
  '/check-user-exist': {
    loginType: { type: 'isValidEnum', options: { aEnum: constants.auth.loginTypes } },
    email: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Email.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
      ],
    },
    phone: {
      byPassWhen: (body) => { return !constants.auth.loginTypes.Mobile.is(body.loginType); },
      rules: [
        { type: 'notEmpty' },
        { type: 'isValidPhoneNumber', msg: 'ERR_VALID_PHONE_NUMBER' },
      ],
    },
  },
};

validator.get = (route) => {
  return input[route];
};

module.exports = validator;
