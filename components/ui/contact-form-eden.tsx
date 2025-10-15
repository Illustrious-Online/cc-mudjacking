"use client";

import { Button, VStack, HStack, Box } from '@chakra-ui/react';
import { Form, Formik, type FormikValues } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toaster } from './toaster';
import InputControl from './input-control';
import { buttonStyles } from './shared-styles';
import ContentCard from './content-card';
import { submitContactForm } from '../../lib/eden-client';

const SERVICES = [
  { value: 'residential', label: 'Residential Mudjacking' },
  { value: 'commercial', label: 'Commercial Concrete Lifting' },
  { value: 'foundation', label: 'Foundation Repair' },
  { value: 'patio', label: 'Patio & Pool Deck Leveling' },
  { value: 'driveway', label: 'Driveway & Walkway Repair' },
  { value: 'other', label: 'Other Services' },
];

export default function ContactFormEden() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (values: FormikValues) => {
    try {
      // Execute reCAPTCHA and get the token
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not available');
      }

      const recaptchaToken = await executeRecaptcha('contact_form');

      // Use Eden Treaty for type-safe API call
      const response = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.service,
        message: values.message,
        timestamp: new Date().toISOString(),
      }, {
        headers: {
          'X-Org-Id': 'cc-mudjacking',
          'Authorization': `Bearer ${recaptchaToken}`, // Using recaptcha token as auth for demo
        },
      });

      // TypeScript knows the exact response structure
      if (response.data) {
        toaster.create({
          title: 'Message sent successfully!',
          description: `We will get back to you within 24 hours. Reference ID: ${response.data.data.id}`,
          type: 'success',
          duration: 5000,
        });
      } else if (response.error) {
        // TypeScript knows the exact error structure from Eden Treaty
        let errorMessage = 'Please try again or contact us directly.';
        
        if (response.error.status === 422) {
          errorMessage = 'Please check your form entries and try again.';
        } else if (response.error.status === 500) {
          errorMessage = 'Our inquiry service is temporarily unavailable. Please try again later.';
        } else if (response.error.status === 503) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }

        throw new Error(response.error.value?.message || errorMessage);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      let errorTitle = 'Error sending message';
      let errorDescription = 'Please try again or contact us directly.';

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorTitle = 'Network Error';
          errorDescription = 'Please check your internet connection and try again.';
        } else if (error.message.includes('temporarily unavailable')) {
          errorTitle = 'Service Unavailable';
          errorDescription = 'Our inquiry service is temporarily unavailable. Please try again later.';
        } else if (error.message.includes('Network error')) {
          errorTitle = 'Connection Error';
          errorDescription = 'Unable to reach our servers. Please try again.';
        }
      }

      toaster.create({
        title: errorTitle,
        description: errorDescription,
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <ContentCard 
      variant="service"
      padding={8}
      gap={6}
    >
      <Box w="full" maxW="2xl">
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            service: '',
            message: '',
          }}
          validate={(values) => {
            const errors: any = {};
            
            if (!values.name || values.name.length < 2) {
              errors.name = 'Name must be at least 2 characters';
            }
            
            if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = 'Please enter a valid email address';
            }
            
            if (!values.service) {
              errors.service = 'Please select a service';
            }
            
            if (!values.message || values.message.length < 10) {
              errors.message = 'Message must be at least 10 characters';
            }
            
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, isValid, dirty, values, handleChange, handleBlur, setFieldValue, setFieldTouched }) => (
            <Form>
              <VStack gap={6}>
                <HStack gap={6} w="full" flexWrap="wrap">
                  <InputControl
                    id="name"
                    name="name"
                    label="Full Name"
                    type="text"
                    required={true}
                    placeholder="John Doe"
                    value={values.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.name}
                    errors={errors.name}
                  />

                  <InputControl
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    required={true}
                    placeholder="john@example.com"
                    value={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.email}
                    errors={errors.email}
                  />
                </HStack>

                <HStack gap={6} w="full" flexWrap="wrap">
                  <InputControl
                    id="phone"
                    name="phone"
                    label="Phone Number (Optional)"
                    type="phone"
                    required={false}
                    placeholder="(555) 123-4567"
                    value={values.phone}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    touched={touched.phone}
                    errors={errors.phone}
                  />

                  <InputControl
                    id="service"
                    name="service"
                    label="Service Needed"
                    type="select"
                    required={true}
                    placeholder="Select a service"
                    value={values.service}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.service}
                    errors={errors.service}
                    options={SERVICES}
                  />
                </HStack>

                <InputControl
                  id="message"
                  name="message"
                  label="Project Details"
                  type="textarea"
                  required={true}
                  placeholder="Please describe your project, including the area size, current condition, and any specific concerns..."
                  value={values.message}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.message}
                  errors={errors.message}
                  rows={6}
                />

                <Button
                  type="submit"
                  {...buttonStyles.large}
                  {...buttonStyles.primary}
                  loading={isSubmitting}
                  loadingText="Sending..."
                  w="full"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Send Message
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </ContentCard>
  );
}
