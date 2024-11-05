import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../apis/Api';
import './Register.css';

const Register = () => {

  //Make a useState for 5 Fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')

  //useState for error message
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  //Make an each function for changing the value
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  //validation
  var validate = () => {
    var isValid = true;

    //validate the firstname
    if (firstName.trim() === '') {
      setFirstNameError("First name is required!")
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError("Last name is required!")
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError("Email is required!")
      isValid = false;
    }

    if (phone.trim() === '') {
      setPhoneError("Phone Number is required!")
      isValid = false
    }

    if (password.trim() === '') {
      setPasswordError("Password is required!")
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError("Confirm password is required!")
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password does not match")
      isValid = false;
    }

    return isValid;

  }

  //Submit button Function
  const handleSubmit = (e) => {
    e.preventDefault()

    //validate
    var isValidated = validate();
    if (!isValidated) {
      return
    }

    //sending request to the api

    //Making json object
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "phone" : phone
    }

    registerUserApi(data).then((res) => {
      // console.log(res.data)

      //Received data : success, message
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
      }
    }).catch((error) => {
      if (error.response.status === 400) {
          toast.error(error.response.data.message);
      }
  })

    // console.log(firstName, lastName, email, password, confirmPassword)
  }
  const handleFacebookLogin = () => {
  }

  const handleGoogleLogin = () => {
  }

  return (
    <div className='register-container'>
      <div className="register-box">
        <div className="register-form">

          <h1>Welcome!</h1>
          <h2>Let's create an account!</h2>

          <form className='w-100'>
            <label>Firstname : {firstName}</label>
            <input onChange={handleFirstName} type='text' className='form-control' placeholder='Enter your first name'></input>
            {
              firstNameError && <p className='text-danger'>{firstNameError}</p>
            }

            <label className='mt-2'>Lastname : {lastName}</label>
            <input onChange={handleLastName} type='text' className='form-control' placeholder='Enter your last name'></input>
            {
              lastNameError && <p className='text-danger'>{lastNameError}</p>
            }

            <label className='mt-2'>Email : {email}</label>
            <input onChange={handleEmail} type='text' className='form-control' placeholder='Enter your email'></input>
            {
              emailError && <p className='text-danger'>{emailError}</p>
            }

            <label className='mt-2'>Phone number </label>
            <input onChange={handlePhone} type='number' className='form-control' placeholder='Enter your phone number'></input>
            {
            phoneError && <p className='text-danger'>{phoneError}</p>
          }

            <label className='mt-2'>Password</label>
            <input onChange={handlePassword} type='text' className='form-control' placeholder='Enter your password'></input>
            {
              passwordError && <p className='text-danger'>{passwordError}</p>
            }

            <label className='mt-2'>Confirm Password</label>
            <input onChange={handleConfirmPassword} type='text' className='form-control' placeholder='Confirm your password'></input>
            {
              confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>
            }

            <button onClick={handleSubmit} className='register-button'>Register</button>
          </form>
          <div className="social-login-container">
            <p className="or-text">or</p>
            <div className="social-icons">
              <img src="/assets/icons/facebook.png" alt="Facebook Login" onClick={handleFacebookLogin} />
              <img src="/assets/icons/google.png" alt="Google Login" onClick={handleGoogleLogin} />
            </div>
          </div>
          <p className='login-text'>Already have an account? <a href='/login'>Login</a></p>
        </div>
        <div className="welcome-text">
          <h2>WELCOME!</h2>
          <img src='/assets/images/loginpage.png' alt='Register' />
          <p>Join us to find your dream home. Create an account now!</p>
        </div>
      </div>
    </div>
  )
}

export default Register;
