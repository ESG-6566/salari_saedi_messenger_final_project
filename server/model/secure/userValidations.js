const Yup = require("yup");

exports.schema = Yup.object().shape({
  fullName: Yup.string().required().min(3).max(64),
  email: Yup.string().email().required().min(11).max(64),
  password: Yup.string().required().min(8).max(25),
  confirmPassword: Yup.string()
    .required()
    .oneOf(
      [Yup.ref("password"), null],
      "pay attention passwords are not same!"
    ),
});
