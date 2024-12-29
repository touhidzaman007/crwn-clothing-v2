import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-ipnut.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWIthGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.error('Error signing in:', error);
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            name: 'email',
            type: 'email',
            value: email,
            onChange: handleChange,
            required: true,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            name: 'password',
            type: 'password',
            value: password,
            onChange: handleChange,
            required: true,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWIthGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
