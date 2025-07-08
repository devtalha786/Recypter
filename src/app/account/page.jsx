
import Account from "@/components/account/Account";
import Receipts from "@/components/receipts/Receipts";

const AccountPage = () => {

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#3288dd] text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <Account/>
      </div>
    </div>
  );
};

export default AccountPage;
