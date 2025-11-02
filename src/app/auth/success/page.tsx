'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthService from '@/app/services/Auth';

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Finalizing authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const finalize = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('No token found in redirect.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        AuthService.handleGitHubSuccessRedirect(token);
        setStatus('Success! Redirecting...');

        const redirectUrl = AuthService.getGitHubAuthRedirect();
        AuthService.clearGitHubAuthRedirect();
        setTimeout(() => router.push(redirectUrl), 800);
      } catch (e: any) {
        setError(e?.message || 'Authentication failed.');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    finalize();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        {!error ? (
          <>
            <h1 className="text-xl font-semibold mb-2">{status}</h1>
            <p className="text-gray-400">Please wait...</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold mb-2">Authentication Error</h1>
            <p className="text-red-400">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}


