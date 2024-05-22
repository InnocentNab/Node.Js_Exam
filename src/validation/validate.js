import joi from "joi";

export const CreateValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

export const LoginValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      password: joi.string().min(8).required(),
      email: joi.string().email().required(),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(422).json({
      message: error.message,
      success: false,
    });
  }
};
