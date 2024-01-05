import { StyleSheet, Text, View, ToastAndroid, Keyboard } from 'react-native';
import React from 'react';
import { TextInput, Button, IconButton, HelperText } from 'react-native-paper';
import AuthService from '../services/AuthService'; // Your Firebase authentication service
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function SignUpForm({ navigation }) {
  const [showPass, setShowPass] = React.useState(true);
  const [showRePass, setShowRePass] = React.useState(true);

  const showToast = (message = 'Something went wrong') => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleRegistration = async (values, { resetForm }) => {
    try {
      // Call Firebase registration function
      const result = await AuthService.signUp(values.email, values.password);

      if (result.success) {
        showToast('Registration successful');

        // Introduce a delay (adjust the time as needed)
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);

        // Reset the form
        resetForm({
          values: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repassword: '',
          },
        });
      } else {
        showToast(result.error || 'Registration failed');
      }
    } catch (e) {
      showToast(e.toString() || 'Something went wrong');
    }
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Please enter your first name'),
    lastname: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid Email').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  });

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm, setErrors }) => {
        await handleRegistration(values, { resetForm, setErrors });
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, setFieldError, setFieldTouched, handleSubmit, isSubmitting, errors, touched, setTouched }) => {
        return (
          <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <IconButton icon="keyboard-backspace" iconColor="white" size={30} marginLeft={15} marginTop={10} onPress={() => navigation.navigate('Login')} />
            </View>

            <View style={styles.signUpWrapper}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 50, color: 'white', marginBottom: 40 }} variant="displayMedium">
                SIGNUP
              </Text>

              <View style={styles.usernameWrapper}>
                <TextInput
                  style={styles.textInputUsername}
                  left={<TextInput.Icon icon="account" />}
                  mode="outlined"
                  placeholder="Firstname"
                  defaultValue={values.firstname}
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                  onBlur={() => {
                    handleBlur('firstname');
                    setFieldError('firstname', ''); // Reset error for the field
                    setFieldTouched('firstname', false); // Reset touched state for the field
                  }}
                  error={errors.firstname && touched.firstname}
                  onFocus={() => setTouched({ firstname: true }, false)}
                />

                <TextInput
                  style={styles.textInputUsername}
                  left={<TextInput.Icon icon="account" />}
                  mode="outlined"
                  placeholder="Lastname"
                  defaultValue={values.lastname}
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                  onBlur={() => {
                    handleBlur('lastname');
                    setFieldError('lastname', ''); // Reset error for the field
                    setFieldTouched('lastname', false); // Reset touched state for the field
                  }}
                  error={errors.lastname && touched.lastname}
                  onFocus={() => setTouched({ lastname: true }, false)}
                />
              </View>

              {errors.firstname && touched.firstname && (
                <HelperText style={{ marginLeft: 25 }} type="error" visible={errors.firstname}>
                  {errors.firstname}
                </HelperText>
              )}
              {errors.lastname && touched.lastname && (
                <HelperText style={{ marginLeft: 25 }} type="error" visible={errors.lastname}>
                  {errors.lastname}
                </HelperText>
              )}

              <TextInput
                style={{ marginTop: 20 }}
                left={<TextInput.Icon icon="email" />}
                mode="outlined"
                placeholder="Your Email"
                defaultValue={values.email}
                value={values.email}
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={() => {
                  handleBlur('email');
                  setFieldError('email', ''); // Reset error for the field
                  setFieldTouched('email', false); // Reset touched state for the field
                }}
                error={errors.email && touched.email}
                onFocus={() => setTouched({ email: true }, false)}
              />
              {errors.email && touched.email && (
                <HelperText style={{ marginLeft: 25 }} type="error" visible={errors.email}>
                  {errors.email}
                </HelperText>
              )}

              <TextInput
                style={{ marginTop: 20 }}
                left={<TextInput.Icon icon="lock" />}
                mode="outlined"
                placeholder="Password"
                defaultValue={values.password}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => {
                  handleBlur('password');
                  setFieldError('password', ''); // Reset error for the field
                  setFieldTouched('password', false); // Reset touched state for the field
                }}
                error={errors.password && touched.password}
                onFocus={() => setTouched({ password: true }, false)}
                secureTextEntry={showPass}
                right={<TextInput.Icon icon={!showPass ? 'eye' : 'eye-off'} onPress={() => setShowPass(!showPass)} />}
              />
              {errors.password && touched.password && (
                <HelperText style={{ flexDirection: 'column', marginLeft: 25 }} type="error" visible={errors.password}>
                  {errors.password}
                </HelperText>
              )}

              <TextInput
                style={{ marginTop: 20 }}
                left={<TextInput.Icon icon="lock" />}
                mode="outlined"
                placeholder="Repeat your Password"
                defaultValue={values.repassword}
                value={values.repassword}
                onChangeText={handleChange('repassword')}
                onBlur={() => {
                  handleBlur('repassword');
                  setFieldError('repassword', ''); // Reset error for the field
                  setFieldTouched('repassword', false); // Reset touched state for the field
                }}
                error={errors.repassword && touched.repassword}
                onFocus={() => setTouched({ repassword: true }, false)}
                secureTextEntry={showRePass}
                right={<TextInput.Icon icon={!showRePass ? 'eye' : 'eye-off'} onPress={() => setShowRePass(!showRePass)} />}
              />
              {errors.repassword && touched.repassword && (
                <HelperText style={{ marginLeft: 25 }} type="error" visible={errors.repassword}>
                  {errors.repassword}
                </HelperText>
              )}

              <Button
                loading={isSubmitting}
                disabled={!Object.values(touched).every(Boolean) || !Object.values(values).every(Boolean)}
                onPress={handleSubmit}
                style={[styles.buttonStyle, (!Object.values(touched).every(Boolean) || !Object.values(values).every(Boolean)) && styles.disabledButtonStyle]}
                icon="account-plus"
                mode="contained"
              >
                CREATE ACCOUNT
              </Button>
            </View>
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signUpWrapper: {
    flex: 3,
    alignSelf: 'center',
    width: '90%',
  },
  usernameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputUsername: {
    width: '49%',
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#233DFD',
  },
  disabledButtonStyle: {
    backgroundColor: 'gray',
  },
});
