'use client'
import { addUser } from '@/store/auth/authThunk';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {
    const [email, setEmail] = useState('');
    const [receiptType, setReceiptType] = useState('');
    const [subscription, setSubscription] = useState('');
   

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addUser({
            email,
            receiptType,
            subscription,
            onSuccess: () => {
                setEmail('')
                setReceiptType('')
                setSubscription('')
            }
        }))
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-2xl mx-auto pt-10 pb-20 px-4">
                <form
                    className="space-y-6 bg-black/20 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-purple-500/20"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[#3288dd] to-[#3288dd] bg-clip-text text-transparent">
                        Add Account Email
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">
                              Type
                            </label>
                            <select
                                value={receiptType}
                                onChange={(e) => {
                                    setReceiptType(e.target.value)
                                    if(e.target.value=="Papers" || e.target.value=="Emulator"){
                                        setSubscription("Lifetime")
                                    }
                                }}
                                className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
                            >
                                <option value="">Select Type</option>
                                <option value="Email Receipt Generator">Receipt</option>
                                <option value="Papers">Paper</option>
                                <option value="Emulator">Emulator</option>
                            </select>
                        </div>

                        {receiptType=="Email Receipt Generator" && (
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Subscription
                                </label>
                                <select
                                    value={subscription}
                                    onChange={(e) =>{
                                        setSubscription(e.target.value)
                                      
                                    } }
                                    className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 bg rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
                                >
                                    <option value="">Select Subscription</option>
                                    <option value="Free">Free</option>
                                    <option value="Per Receipt">Per Receipt</option>
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Lifetime">Lifetime</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-gradient-to-r bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Processing...' : ' Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}