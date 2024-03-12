import { useState } from 'react';
import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (emailIsInvalid || passwordIsInvalid) {
      console.log('Please enter valid credentials!');
      return;
    }
    console.log(enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          type="email"
          name="email"
          value={enteredValues.email}
          onChange={(event) => handleInputChange('email', event.target.value)}
          onBlur={() => handleInputBlur('email')}
          error={emailIsInvalid && 'Please enter a valid email address'}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={enteredValues.password}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          onBlur={() => handleInputBlur('password')}
          error={
            passwordIsInvalid && 'Password should be more than 6 characters'
          }
        />
      </div>

      <div className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </div>
    </form>
  );
}
