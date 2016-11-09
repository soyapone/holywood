const val_err = "Validation errors: ";
const val_err_notEmpty = "The parameter is needed";
const val_err_isInt = "The parameter must be an Integer number";
const val_err_isFloat = "The parameter must be a Float number";
const val_err_isIn = "The paremeter do not have one of the expected values: ";


exports.val_err = function(){
  return val_err;
}

exports.val_err_notEmpty = function(){
  return val_err_notEmpty;
}

exports.val_err_isInt = function(){
  return val_err_isInt;
}

exports.val_err_isIn = function(expectedValues){
  return val_err_isIn.concat(expectedValues);
}

exports.val_err_isFloat = function(){
  return val_err_isFloat;
}
