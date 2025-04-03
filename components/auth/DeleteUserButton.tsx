import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface DeleteUserButtonProps {
  userId: string;
  apiUrl?: string; // Optional prop to override the default API URL
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ 
  userId, 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {

    setIsDeleting(true);
    console.log(`user_id=${userId}` )
    // alert("starting to delete") 
    const apiBaseUrl = process.env.BACKEND_BASE_URL;
    try {
      const response = await fetch(`${apiBaseUrl}/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
        mode: 'cors',
        // credentials: 'include', // Include cookies if using session authentication
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User deleted successfully:', data);
      alert("Account deleted successfully! \n\nNote: All of your data has been deleted on our end, but you can further go to Manage Apps in your Spotify Settings to fully revoke access to this service.")
    } catch (error) {
      console.error('Error deleting user:', error);
      alert("Sorry, something went wrong! Email us at support@songsofafeather.com to finalize your account deletion.")
    } finally {
      setIsDeleting(false);

      // Lastly, be sure to sign out of the supabase session.
      console.log("Finalize and sign out user...")
      await handleSignOut()
    }
  };

  // Lastly, be sure to sign out of the supabase session.
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  
  return (
    <div>
        <button 
        onClick={() => setShowDeleteConfirm(true)}
        disabled={isDeleting}
        className="flex text-neutral-500 hover:text-red-400 transition-colors text-sm"
        >
        {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
        
        {/* This will show a box to the user to confirm before deleting! */}
        {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold text-neutral-200 mb-2">
                Delete Account
                </h3>
                <p className="text-neutral-400 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
                </p>
                <div className="flex gap-3 justify-end">
                <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-sm font-medium text-neutral-200 hover:text-neutral-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors"
                >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
                </div>
            </div>
            </div>
        )} 
    </div>

  );
};

export default DeleteUserButton;