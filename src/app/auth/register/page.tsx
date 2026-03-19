import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Register for a free Faire Retreat Booking account and unlock the full interactive map, booking dashboard, and exclusive deals.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 py-20">
      <RegisterForm />
    </div>
  );
}
