import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaGoogle, FaDiscord } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, loginWithDiscord } from '@/store/auth/authThunk';
import { Loader2 } from "lucide-react";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      setIsOpen(false); // Close modal on successful login
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleDiscordLogin = () => {
    const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    // const REDIRECT_URI = 'https://receiptgenerator.shop/api/login';
    const REDIRECT_URI = 'http://localhost:3000';
    const SCOPES = encodeURIComponent('identify email');
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&scope=${SCOPES}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    
    window.location.href = discordAuthUrl;
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] min-h-[550px] p-8 bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-gray-100 border border-purple-500/20">
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to Recypter
          </DialogTitle>
          <p className="text-gray-400 text-center text-lg">
            Join our community to unlock all features
          </p>
        </DialogHeader>
        
        <div className="flex flex-col gap-8 py-12">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group relative flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 py-7 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <FaGoogle className="w-6 h-6" />
                <span className="text-lg font-medium">Continue with Google</span>
              </>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 w-full h-full bg-[#5865F2] blur-lg opacity-20 group-hover:opacity-40 rounded-xl" />
            <Button
              onClick={handleDiscordLogin}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 bg-[#6259b5] hover:bg-[#6259b5] py-7 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#5865F2]/30"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <FaDiscord className="w-6 h-6" />
                  <span className="text-lg font-medium">Continue with Discord</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mt-4">
            {error}
          </p>
        )}

        <div className="mt-auto text-center text-sm text-gray-400">
          <p>By continuing, you agree to our</p>
          <div className="space-x-2 mt-2">
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
            <span>&</span>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal; 