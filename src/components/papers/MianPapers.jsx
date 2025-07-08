'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WhatWeOffer from '../WhatWeOffer';
import PaperSubscription from './PaperSubscription';
import { getPapers } from '@/store/subscription/subscriptionThunk';


export default function MianPapers() {
    const [selectedPaper, setSelectedPaper] = useState(null);
    const {user} = useSelector((state) => state.auth);
    const {papers} = useSelector((state) => state.subscription);
    const dispatch = useDispatch();

    useEffect(() => {
      if(user?.uid){
        dispatch(getPapers(user?.uid));
      }
    }, [dispatch, user?.uid]);

    // if (user?.status !== "Free" || !user?.uid || (user?.status !== "Free" && (!papers?.length > 0 && papers?.subscriptionStatus != "completed"))) {
    //   return <PaperSubscription />
    // }
    // if ((receipts?.subscriptionStatus != "completed" || receipts == null || !user?.uid)  && user?.status !== "Free" ) {
    if((!papers?.length > 0 && papers?.subscriptionStatus != "completed" || user?.uid==null) &&  user?.status !== "Free"){
      return <PaperSubscription />
    }

    const handlePaperSelect = (paperType) => {
      setSelectedPaper(paperType);
    };

    const openModifiedHtml = (value) => {
      // Create a new window
      const newWindow = window.open('', '_blank');
      
      // Fetch the HTML file
      if(value=="apple"){
        fetch('/ApplePaper.html')
        .then(response => response.text())
        .then(html => {
          // You can modify the HTML content here if needed
          const modifiedHtml = html.replace(
            '{{date}}', 
            new Date().toLocaleDateString()
          );
          
          // Write the modified HTML to the new window
        
          newWindow.document.write(modifiedHtml);
          newWindow.document.close();
        });
      }else if(value=="nike"){
        fetch('/Nike.html')
        .then(response => response.text())
        .then(html => {
          // You can modify the HTML content here if needed
          const modifiedHtml = html.replace(
            '{{date}}', 
            new Date().toLocaleDateString()
          );
          
          // Write the modified HTML to the new window
          newWindow.document.write(modifiedHtml);
          newWindow.document.close();
        });
      }else if(value=="stockx"){
        fetch('/StockX.html')
        .then(response => response.text())
        .then(html => {
          // You can modify the HTML content here if needed
          const modifiedHtml = html.replace(
            '{{date}}', 
            new Date().toLocaleDateString()
          );
          
          // Write the modified HTML to the new window
          newWindow.document.write(modifiedHtml);
          newWindow.document.close();
        });
      }
     
    };




    // Render selected paper component
    const renderSelectedPaper = () => {
   
      
          return (
            // Default view with buttons
            <div className="flex justify-center gap-8 flex-wrap">
              <button 
                onClick={() => {
                  openModifiedHtml("apple")
                }}
                className="w-48 h-20 border-2 bg-white rounded-md hover:border-gray-500 transition-all flex items-center justify-center bg-transparent"
              >
                <span className="text-3xl text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </span>
              </button>
              
              <button 
               onClick={() => {
                openModifiedHtml("nike")
              }}
                className="w-48 h-20 border-2 border-gray-700 bg-white rounded-md hover:border-gray-500 transition-all flex items-center justify-center bg-transparent"
              >
                <span className="text-3xl text-gray-700">NIKE</span>
              </button>
              
              <button 
                onClick={() => {
                  openModifiedHtml("stockx")
                }}
                className="w-48 h-20 border-2 border-gray-700 bg-white rounded-md hover:border-gray-500 transition-all flex items-center justify-center bg-transparent"
              >
                <span className="text-3xl text-gray-700">X</span>
              </button>
              
              <button className="w-48 h-20 border-2 border-gray-700 bg-white rounded-md hover:border-gray-500 transition-all flex items-center justify-center bg-transparent">
                <span className="text-gray-700">Coming soon...</span>
              </button>
            </div>
          );
      
    };

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-5xl font-bold text-white mb-16" style={{ fontFamily: 'Arial', letterSpacing: '2px' }}>
          Paper Receipt Maker
        </h1>
        
        {renderSelectedPaper()}
      </div>
    )
}
