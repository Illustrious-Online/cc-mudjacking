import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PHONE_NUMBER } from '../constants';
import PrivacyPage from './page';

// Mock the wrapper component
vi.mock('@/components/ui/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('PrivacyPage', () => {
  const renderPrivacyPage = () => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <PrivacyPage />
      </ChakraProvider>
    );
  };

  it('renders the privacy policy page', () => {
    renderPrivacyPage();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    renderPrivacyPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
  });

  it('displays the last updated date', () => {
    renderPrivacyPage();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Last updated: ${currentYear}`)).toBeInTheDocument();
  });

  it('displays all major sections', () => {
    renderPrivacyPage();

    const expectedSections = [
      'Introduction',
      'Information We Collect',
      'How We Use Your Information',
      'Information Sharing and Disclosure',
      'Data Security',
      'Your Rights',
      'Cookies and Tracking Technologies',
      'Third-Party Links',
      "Children's Privacy",
      'Changes to This Privacy Policy',
      'Contact Us',
    ];

    for (const section of expectedSections) {
      expect(screen.getByRole('heading', { name: section })).toBeInTheDocument();
    }
  });

  it('displays personal information collection details', () => {
    renderPrivacyPage();

    expect(screen.getByText('Fill out our contact form')).toBeInTheDocument();
    expect(screen.getByText('Call us for estimates or services')).toBeInTheDocument();
    expect(screen.getByText('Request on-site consultations')).toBeInTheDocument();
  });

  it('displays information usage details', () => {
    renderPrivacyPage();

    expect(screen.getByText('Provide and maintain our services')).toBeInTheDocument();
    expect(
      screen.getByText('Respond to your inquiries and provide customer support')
    ).toBeInTheDocument();
    expect(screen.getByText('Send you estimates and project updates')).toBeInTheDocument();
    expect(screen.getByText('Improve our website and services')).toBeInTheDocument();
    expect(screen.getByText('Comply with legal obligations')).toBeInTheDocument();
  });

  it('displays user rights information', () => {
    renderPrivacyPage();

    expect(
      screen.getByText('Access the personal information we hold about you')
    ).toBeInTheDocument();
    expect(screen.getByText('Request correction of inaccurate information')).toBeInTheDocument();
    expect(screen.getByText('Request deletion of your personal information')).toBeInTheDocument();
    expect(screen.getByText('Opt out of marketing communications')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderPrivacyPage();

    expect(screen.getByText('ccmudjacking@gmail.com')).toBeInTheDocument();
    expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
    expect(screen.getByText('Greater Metro Area')).toBeInTheDocument();
  });

  it('displays company name in introduction', () => {
    renderPrivacyPage();
    expect(screen.getByText(/CC Mudjacking/)).toBeInTheDocument();
  });

  it('mentions data security measures', () => {
    renderPrivacyPage();
    expect(screen.getByText(/security measures/)).toBeInTheDocument();
  });

  it('mentions cookies and tracking', () => {
    renderPrivacyPage();
    expect(screen.getByText(/cookies and similar tracking technologies/)).toBeInTheDocument();
  });

  it('mentions children privacy protection', () => {
    renderPrivacyPage();
    expect(screen.getByText(/children under the age of 13/)).toBeInTheDocument();
  });

  it('mentions policy updates', () => {
    renderPrivacyPage();
    expect(screen.getByText(/update this Privacy Policy/)).toBeInTheDocument();
  });
});
