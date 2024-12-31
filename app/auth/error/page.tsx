export default function AuthError() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-md space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Authentication Error</h1>
            <p className="text-gray-500">
              There was a problem authenticating with Spotify. Please try again or contact support.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/"
              className="rounded-full bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    )
  }