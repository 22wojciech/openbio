'use server';

import { env } from '@/env.mjs';
import type { ReactElement } from 'react';
import { Resend } from 'resend';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export interface Email {
  react: ReactElement;
  subject: string;
  to: string[];
  from?: string;
}

export const sendEmail = async (email: Email) => {
  // Email is optional: without RESEND_API_KEY messages are skipped.
  if (!resend) {
    return null;
  }
  return await resend.emails.send({
    from: 'Vanxh <hello@vanxh.dev>',
    ...email,
  });
};
