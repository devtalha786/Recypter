
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import brandData from './brandData.json';
import { uploadImage } from '../store/auth/authThunk';
import { checkReceiptCreation, createReceiptTracking, getLatestReceiptCreation, getReceipts, updateReceipts } from '@/store/subscription/subscriptionThunk';
import imageCompression from 'browser-image-compression';
const ReceiptForm = ({ brand }) => {



  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
const [timeRemaining, setTimeRemaining] = useState(0);
console.log("timeRemaining",timeRemaining);

  const { receipts } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.uid) {
      dispatch(getLatestReceiptCreation(user.uid))
        .unwrap()
        .then((latestCreation) => {
          const { canCreate, timeRemaining } = checkReceiptCreation(latestCreation);
          if (!canCreate) {
            setTimeRemaining(timeRemaining);
          if(user?.email !="itskrish.thusi@gmail.com")
            setShowTimeModal(true);
          }
        });
    }
  }, [user]);

  const route = useRouter();

  useEffect(() => {
    if (user?.uid) {
      dispatch(getReceipts(user?.uid));
    }
  }, [user]);



// ...existing code...

// const handleImageChange = async (file) => {
//   if (file) {
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('File size should be less than 10MB');
//       return;
//     }

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true
//     };

//     try {
//       const compressedFile = await imageCompression(file, options);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(compressedFile);

//       handleInputChange('image_link', compressedFile);
//     } catch (error) {
//       console.error('Error compressing image:', error);
//       toast.error('Failed to compress image. Please try again.');
//     }
//   }
// };



// ...existing code...
  const handleImageChange = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      handleInputChange('image_link', file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleImageChange(file);
    }
  };

  const handleInputChange = (field, value) => {
    const fieldType = brandData[brand]?.attr[field];
    const processedValue = fieldType === 'number' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

 
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateOrderNumber = () => {
    const part1 = generateRandomNumber(3434343, 4545434545);
    const part2 = generateRandomNumber(3434343, 4545434545);
    return `${part1} - ${part2}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const latestCreation = await dispatch(getLatestReceiptCreation(user.uid)).unwrap();
    const { canCreate, timeRemaining } = checkReceiptCreation(latestCreation);
  
    if (!canCreate) {
      setTimeRemaining(timeRemaining);
      if (user?.email !== "itskrish.thusi@gmail.com") {
        setShowTimeModal(true);
        return;
      }
  
    }
  
    try {
      setIsLoading(true);
      const total = Object.entries(formData).reduce((sum, [key, value]) => {
        if (key !== 'price_total' && typeof value === 'number') {
          return sum + value;
        }
        return sum;
      }, 0);
  
      let imageUrl = formData.image_link;
      if (formData.image_link instanceof File) {
        const uploadResult = await dispatch(uploadImage({
          file: formData.image_link,
          onSuccess: (url) => {
            console.log("Image uploaded successfully:", url);
          }
        })).unwrap();
  
        imageUrl = uploadResult;
      }
  
      const finalFormData = {
        ...formData,
        price_total: total.toFixed(2),
        image_link: imageUrl,
        order_number: generateOrderNumber()
      };
  
      // Format number fields to two decimal places
      Object.keys(finalFormData).forEach(key => {
        if (typeof finalFormData[key] === 'number') {
          finalFormData[key] = finalFormData[key].toFixed(2);
        }
      });
      Object.keys(finalFormData).forEach(key => {
        if (key.includes('date')) {
          finalFormData[key] = formatDate(finalFormData[key]);
        }
      });
  
      // Format the estimated_arrival_date if it exists
      // if (finalFormData.estimated_arrival_date) {
      //   finalFormData.estimated_arrival_date = formatDate(finalFormData.estimated_arrival_date);
      // }
  
      // Append string to condition if it exists and is "New"
      if (finalFormData.condition && finalFormData.condition === "New") {
        finalFormData.condition += ", 100% Authentic";
      }
  
      const response = await axios.post('/api/send-email', {
        inputs: finalFormData,
        templateName: brand,
        to: user?.email
      });
      await dispatch(createReceiptTracking(user.uid));
  
      toast.success("Receipt sent successfully!");
  
      if (receipts != null && receipts.productName == "Per Receipt" && user?.uid) {
        dispatch(updateReceipts({
          userId: user?.uid,
          onSuccess: () => {
            route.push("/home");
          }
        }));
      } else {
        route.push("/home");
      }
  
    } catch (error) {
      console.error('Error processing receipt:', error);
      toast.error('Failed to process receipt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();


  //   const latestCreation = await dispatch(getLatestReceiptCreation(user.uid)).unwrap();
  // const { canCreate, timeRemaining } = checkReceiptCreation(latestCreation);
  
  // if (!canCreate) {
  //   setTimeRemaining(timeRemaining);
  //   if(user?.email !="itskrish.thusi@gmail.com"){
  //  setShowTimeModal(true);
  //   }
 
  //   return;
  // }

  //   try {
  //     setIsLoading(true);
  //     const total = Object.entries(formData).reduce((sum, [key, value]) => {
  //       if (key !== 'price_total' && typeof value === 'number') {
  //         return sum + value;
  //       }
  //       return sum;
  //     }, 0);

  //     let imageUrl = formData.image_link;
  //     if (formData.image_link instanceof File) {
  //       const uploadResult = await dispatch(uploadImage({
  //         file: formData.image_link,
  //         onSuccess: (url) => {
  //           console.log("Image uploaded successfully:", url);
  //         }
  //       })).unwrap();
        
  //       imageUrl = uploadResult;
  //     }

  //     const finalFormData = {
  //       ...formData,
  //       price_total: total,
  //       image_link: imageUrl,
  //       order_number :generateOrderNumber()
  //     };

  //     // Format the estimated_arrival_date if it exists
  //     if (finalFormData.estimated_arrival_date) {
  //       finalFormData.estimated_arrival_date = formatDate(finalFormData.estimated_arrival_date);
  //     }

  //     // Generate random order number if order_number key exists
     

  //     // Append string to condition if it exists and is "New"
  //     if (finalFormData.condition && finalFormData.condition === "New") {
  //       finalFormData.condition += ", 100% Authentic";
  //     }

  //     const response = await axios.post('/api/send-email', {
  //       inputs: finalFormData,
  //       templateName: brand,
  //       to: user?.email
  //     });
  //     await dispatch(createReceiptTracking(user.uid));

  //     toast.success("Receipt sent successfully!");

  //     if (receipts != null && receipts.productName == "Per Receipt" && user?.uid) {
  //       dispatch(updateReceipts({
  //         userId: user?.uid,
  //         onSuccess: () => {
  //           route.push("/home");
  //         }
  //       }));
  //     } else {
  //       route.push("/home");
  //     }
      
  //   } catch (error) {
  //     console.error('Error processing receipt:', error);
  //     toast.error('Failed to process receipt. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const renderFormField = (fieldName, fieldType) => {
    if (fieldName === 'price_total') return null;
    if (fieldName === 'order_number') return null;


    const label = fieldName.replace(/_/g, ' ').replace(/-/g, ' ');

    if (fieldName === 'image_link' || fieldName === 'image_url') {
      return (
        <div key={fieldName} className="col-span-full">
          <label className="block text-sm font-medium text-white mb-2">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
          
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              isDragging ? 'border-purple-400 bg-purple-400/10' : 'border-purple-400/50'
            } border-dashed rounded-lg transition-colors duration-200`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-2 text-center">
              {previewImage ? (
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData(prev => ({
                        ...prev,
                        [fieldName]: ''
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    switch (fieldType) {
      case 'date':
        return (
          <div key={fieldName}>
            <label className="block text-sm font-medium text-white">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <input
              type="date"
              className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
              value={formData[fieldName] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
            />
          </div>
        );

      case 'number':
        return (
          <div key={fieldName}>
            <label className="block text-sm font-medium text-white">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
              placeholder={`Enter ${label}`}
              value={formData[fieldName] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
            />
          </div>
        );

      default:
        return (
          <div key={fieldName}>
            <label className="block text-sm font-medium text-white">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <input
              type="text"
              className="mt-1 block w-full bg-black/20 text-white border border-purple-400/50 rounded-lg shadow-sm focus:ring-pink-400 focus:border-pink-400 p-3 backdrop-blur-sm"
              placeholder={`Enter ${label}`}
              value={formData[fieldName] || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
            />
          </div>
        );
    }
  };

  const brandFields = brandData[brand]?.attr || {};

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto pt-10 pb-20 px-4">
        <form 
          className="space-y-6 bg-black/20 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-purple-500/20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[#3288dd] to-[#3288dd] bg-clip-text text-transparent">
            Create {brandData[brand]?.displayName} Receipt
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(brandFields).map(([fieldName, fieldType]) => 
              renderFormField(fieldName, fieldType)
            )}
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => route.back()}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Processing...' : 'Create Receipt'}
            </button>
          </div>
        </form>
      </div>
      {showTimeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-lg p-6 max-w-sm w-full mx-4">
      <h3 className="text-lg font-bold mb-4">Please Wait</h3>
      <p className="mb-4 text-black">
        You can create another receipt in {timeRemaining} minutes.
      </p>
      <button
        onClick={() => setShowTimeModal(false)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ok
      </button>
    </div>
  </div>
)}
    </div>

    
  );
};

export default ReceiptForm;
