'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthService from '@/app/services/Auth';

export default function GitHubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Processing GitHub authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('GitHub authentication was cancelled or failed.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
        return;
      }

      if (!code) {
        setError('No authorization code received from GitHub.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
        return;
      }

      try {
        setStatus('Authenticating with GitHub...');
        const response = await AuthService.handleGitHubCallback(code);
        
        setStatus('Success! Redirecting to dashboard...');
        console.log('✅ GitHub authentication successful:', response);

        // Get redirect URL or default to dashboard
        const redirectUrl = AuthService.getGitHubAuthRedirect();
        AuthService.clearGitHubAuthRedirect();

        setTimeout(() => {
          router.push(redirectUrl);
        }, 1000);
      } catch (err: any) {
        console.error('❌ GitHub callback error:', err);
        setError(err.message || 'GitHub authentication failed. Please try again.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="mb-4">
          <svg
            className="animate-spin h-12 w-12 text-indigo-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {error ? (
          <>
            <h2 className="text-xl font-bold text-red-500 mb-4">Authentication Failed</h2>
            <p className="text-gray-300">{error}</p>
            <p className="text-gray-400 text-sm mt-4">Redirecting to login...</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-4">GitHub Authentication</h2>
            <p className="text-gray-300">{status}</p>
          </>
        )}
      </div>
    </div>
  );
}


