'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthService from '@/app/services/Auth';

function AuthSuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Finalizing authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('No token found in redirect.');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    try {
      AuthService.handleGitHubSuccessRedirect(token);
      setStatus('Success! Redirecting...');

      const redirectUrl = AuthService.getGitHubAuthRedirect() || '/dashboard';
      AuthService.clearGitHubAuthRedirect();
      setTimeout(() => router.push(redirectUrl), 800);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Authentication failed.';
      setError(errorMessage);
      setTimeout(() => router.push('/login'), 2000);
    }
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

export default function AuthSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <div className="animate-spin h-12 w-12 text-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <AuthSuccessInner />
    </Suspense>
  );
}


