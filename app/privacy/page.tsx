import React from 'react';
import LegalDocument from '@/components/legal/LegalDocument';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata = {
  title: 'Terms of Service | Your Add-on Name',
  description: 'Terms of service and end-user license agreement for Your Add-on Name',
};

export default function TermsPage() {
  // Read content at build time
  const content = readFileSync(
    join(process.cwd(), 'public', 'spotify-privacy-policy.md'),
    'utf8'
  );
  
  return <LegalDocument title="Privacy Policy" content={content} />;
}