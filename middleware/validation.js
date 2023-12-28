const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateFavoriteArtistBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    followers: Joi.number().required().min(2).messages({
      "number.base": 'The "name" field must be a number',
      "number.empty": 'The "name" field must be filled in',
      "number.min": 'The minimum value of the "name" field is 2',
      "number.max": 'The maximum value of the "name" field is 30',
    }),
  }),
});

const validateFavoriteTrackBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateFavoriteAlbumBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    artist: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),
    totalTracks: Joi.number().required().messages({
      "number.base": 'The "name" field must be a number',
      "number.empty": 'The "name" field must be filled in',
    }),
  }),
});

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
    }),
    userName: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

const validateLoginAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "imageUrl" field must be filled in',
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    userName: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

module.exports = {
  validateId,
  validateFavoriteArtistBody,
  validateFavoriteAlbumBody,
  validateFavoriteTrackBody,
  validateUpdateUser,
  validateLoginAuthentication,
  validateUserInfoBody,
};
