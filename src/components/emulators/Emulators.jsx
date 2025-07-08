'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WhatWeOffer from '../WhatWeOffer';
import EmulatorSubscription from './EmulatorSubscription';
import { getEmulators } from '@/store/subscription/subscriptionThunk';
import './OrderStatus.css';


export default function Emulators() {
  const { user } = useSelector((state) => state.auth);
  const { emulators } = useSelector((state) => state.subscription);
  console.log(emulators, "emulators");
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.uid) {
      dispatch(getEmulators(user?.uid));
    }
  }, [dispatch, user?.uid]);
  console.log("user?.status", user)


  // if (user?.status !== "Free" || !user?.uid || (user?.status !== "Free" && (!emulators?.length || emulators?.subscriptionStatus !== "completed"))) {
  //   return <EmulatorSubscription />
  // }

  if((!emulators?.length > 0 && emulators?.subscriptionStatus != "completed" || !user?.uid) && user?.status !== "Free"){
    return <EmulatorSubscription />
  }


  const openModifiedHtml = () => {
    // Create a new window
    const newWindow = window.open('', '_blank');

    // Fetch the HTML file

    fetch('/Emulator.html')
      .then(response => response.text())
      .then(html => {
        // You can modify the HTML content here if needed
        const modifiedHtml = html.replace(
          '{{date}}',
          new Date().toLocaleDateString()
        );

        // Write the modified HTML to the new window
        if (newWindow)
          newWindow.document.write(modifiedHtml);
        newWindow.document.close();
      });


  };

  return (
    <div>
      {openModifiedHtml()}
    </div>
  )
}
