'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik, type FormikValues } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { z } from 'zod';
import { toaster } from '@/components/ui/toaster';
import Wrapper from '@/components/ui/wrapper';
import { PHONE_NUMBER } from '../constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const handleSubmit = async (values: FormikValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toaster.create({
        title: 'Message sent successfully!',
        description: 'We will get back to you within 24 hours.',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const services = [
    { value: 'residential', label: 'Residential Mudjacking' },
    { value: 'commercial', label: 'Commercial Concrete Lifting' },
    { value: 'foundation', label: 'Foundation Repair' },
    { value: 'patio', label: 'Patio & Pool Deck Leveling' },
    { value: 'driveway', label: 'Driveway & Walkway Repair' },
    { value: 'other', label: 'Other Services' },
  ];

  return (
    <Wrapper>
      <Box py={12} px={6}>
        <Container maxW="7xl">
          <VStack gap={12}>
            {/* Header */}
            <VStack textAlign="center" gap={4}>
              <Heading as="h1" size="2xl" color="brand.500">
                Contact Us
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="3xl">
                Get your free estimate today! Our team is ready to help you with all your concrete
                lifting and mudjacking needs. Fill out the form below or contact us directly.
              </Text>
            </VStack>

            <Box w="full">
              <Card.Root shadow="lg">
                <Card.Body p={8}>
                  <Formik<ContactFormData>
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
                    {({
                      isValid,
                      isSubmitting,
                      touched,
                      errors,
                      values,
                      handleChange,
                      handleBlur,
                    }) => (
                      <Form>
                        <VStack gap={6}>
                          {/* Contact Information */}
                          <VStack gap={4} w="full">
                            <HStack gap={6} w="full" flexWrap="wrap">
                              <Field.Root required invalid={touched.name && !!errors.name}>
                                <Field.Label>Full Name</Field.Label>
                                <Input
                                  name="name"
                                  placeholder="John Doe"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <Field.ErrorText>{errors.name}</Field.ErrorText>
                              </Field.Root>

                              <Field.Root required invalid={touched.email && !!errors.email}>
                                <Field.Label>Email Address</Field.Label>
                                <Input
                                  name="email"
                                  type="email"
                                  placeholder="john@example.com"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <Field.ErrorText>{errors.email}</Field.ErrorText>
                              </Field.Root>
                            </HStack>

                            <HStack gap={6} w="full" flexWrap="wrap">
                              <Field.Root required invalid={touched.phone && !!errors.phone}>
                                <Field.Label>Phone Number</Field.Label>
                                <Input
                                  name="phone"
                                  type="tel"
                                  placeholder="(555) 123-4567"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <Field.ErrorText>{errors.phone}</Field.ErrorText>
                              </Field.Root>

                              <Field.Root required invalid={touched.service && !!errors.service}>
                                <Field.Label>Service Needed</Field.Label>
                                <Input
                                  name="service"
                                  list="services"
                                  placeholder="Select a service"
                                  value={values.service}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <datalist id="services">
                                  {services.map((service) => (
                                    <option key={service.value} value={service.value}>
                                      {service.label}
                                    </option>
                                  ))}
                                </datalist>
                                <Field.ErrorText>{errors.service}</Field.ErrorText>
                              </Field.Root>
                            </HStack>

                            <Field.Root required invalid={touched.message && !!errors.message}>
                              <Field.Label>Project Details</Field.Label>
                              <Textarea
                                name="message"
                                placeholder="Please describe your project, including the area size, current condition, and any specific concerns..."
                                rows={6}
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <Field.ErrorText>{errors.message}</Field.ErrorText>
                            </Field.Root>
                          </VStack>

                          <Button
                            type="submit"
                            size="lg"
                            colorScheme="brand"
                            loading={isSubmitting}
                            disabled={!isValid}
                            w="full"
                          >
                            Send Message
                          </Button>
                        </VStack>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card.Root>
            </Box>

            {/* Contact Information Cards */}
            <VStack gap={6} w="full">
              <Heading as="h2" size="lg" textAlign="center">
                Get In Touch
              </Heading>
              <HStack gap={6} flexWrap="wrap" justify="center">
                <Card.Root shadow="md" minW="250px">
                  <Card.Body>
                    <VStack gap={3}>
                      <Icon as={FaEnvelope} color="brand.500" boxSize={6} />
                      <Text fontWeight="semibold">Email Us</Text>
                      <Text color="gray.500">ccmudjacking@gmail.com</Text>
                      <Text fontSize="sm" color="gray.400">
                        Reach out to us 24/7
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                <Card.Root shadow="md" minW="250px">
                  <Card.Body>
                    <VStack gap={3}>
                      <Icon as={FaMapMarkerAlt} color="brand.500" boxSize={6} />
                      <Text fontWeight="semibold">Service Area</Text>
                      <Text color="gray.500">Greater Metro Area</Text>
                      <Text fontSize="sm" color="gray.400">
                        Free Estimates
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                <Card.Root shadow="md" minW="250px">
                  <Card.Body>
                    <VStack gap={3}>
                      <Icon as={FaPhone} color="brand.500" boxSize={6} />
                      <Text fontWeight="semibold">Call Us</Text>
                      <Text color="gray.500">{PHONE_NUMBER}</Text>
                      <Text fontSize="sm" color="gray.400">
                        Speedy Response Time
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Wrapper>
  );
}
