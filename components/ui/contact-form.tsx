"use client";

import { Button, VStack, HStack, Box } from '@chakra-ui/react';
import { Form, Formik, type FormikValues } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { toaster } from './toaster';
import InputControl from './input-control';
import { buttonStyles } from './shared-styles';
import ContentCard from './content-card';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SERVICES = [
  { value: 'residential', label: 'Residential Mudjacking' },
  { value: 'commercial', label: 'Commercial Concrete Lifting' },
  { value: 'foundation', label: 'Foundation Repair' },
  { value: 'patio', label: 'Patio & Pool Deck Leveling' },
  { value: 'driveway', label: 'Driveway & Walkway Repair' },
  { value: 'other', label: 'Other Services' },
];

export default function ContactForm() {
  const handleSubmit = async (values: FormikValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        let errorMessage = 'Please try again or contact us directly.';
        
        if (response.status === 502) {
          errorMessage = 'Our inquiry service is temporarily unavailable. Please try again later or contact us directly.';
        } else if (response.status === 503) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (response.status === 400) {
          errorMessage = 'Please check your form entries and try again.';
        }

        throw new Error(responseData.message || errorMessage);
      }

      toaster.create({
        title: 'Message sent successfully!',
        description: 'We will get back to you within 24 hours.',
        type: 'success',
        duration: 5000,
      });
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
          validate={withZodSchema(contactSchema)}
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
                    label="Phone Number"
                    type="phone"
                    required={true}
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