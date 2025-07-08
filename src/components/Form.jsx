"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import CompLayout from "./CompLayout";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createFormSubmission } from "@/store/request/requestThunk";

export function FormComponent() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.request);

  const [formType, setFormType] = React.useState("try-it");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    age: "",
    message: "",
  });
  const [errors, setErrors] = React.useState({});

  const ageRanges = [
    "0-12",
    "13-17",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55+",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.age) {
      newErrors.age = "Age range is required";
    }

    if (formType === "make-a-wish" && !formData.message.trim()) {
      newErrors.message = "Message is required for Make a wish";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const finalFormData = {
        ...formData,
        formType,
      };

      dispatch(
        createFormSubmission({
          payload: finalFormData,
          onSuccess: () => {
            // Reset form after successful submission
            setFormData({
              name: "",
              email: "",
              age: "",
              message: "",
            });
            setFormType("try-it");
          },
        })
      );
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  return (
    <div id="formSection">
      <CompLayout
        title="Start Your Journey"
        description="Be a mindfulness pioneer. Join our exclusive community for weekly updates and free feature testing, or share your vision to shape the future of Al meditation."
      >
        <div className="w-full mx-auto py-6 sm:py-8 lg:py-12 bg-colorTheme-gray rounded-xl sm:rounded-2xl lg:rounded-3xl px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-6 lg:pl-8 xl:pl-16 order-2 lg:order-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6 text-left"
              >
                {/* Radio Group */}
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue="try-it"
                    className="flex flex-wrap gap-4 sm:gap-8"
                    onValueChange={setFormType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="try-it"
                        id="try-it"
                        className="border text-lime-400"
                      />
                      <Label htmlFor="try-it" className="text-base sm:text-lg">
                        Try it
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="make-a-wish"
                        id="make-a-wish"
                        className="border text-lime-400"
                      />
                      <Label
                        htmlFor="make-a-wish"
                        className="text-base sm:text-lg"
                      >
                        Make a wish
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name"
                      className={`rounded-lg ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      value={formData.name}
                      onChange={handleInputChange("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className={`rounded-lg ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Age Field */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age*</Label>
                    <Select
                      value={formData.age}
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          age: value,
                        });
                        if (errors.age) {
                          setErrors({
                            ...errors,
                            age: "",
                          });
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`rounded-lg ${
                          errors.age ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.age && (
                      <p className="text-red-500 text-sm">{errors.age}</p>
                    )}
                  </div>

                  {/* Conditional Message Field */}
                  {formType === "make-a-wish" && (
                    <div className="space-y-2">
                      <Label htmlFor="message">Message*</Label>
                      <Textarea
                        id="message"
                        placeholder="Message"
                        className={`rounded-lg min-h-[120px] ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        value={formData.message}
                        onChange={handleInputChange("message")}
                        required
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#18181B] text-white rounded-lg py-4 sm:py-6 hover:bg-[#27272A] text-base sm:text-lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Join now"}
                </Button>
              </form>
            </div>

            {/* Image Section */}
          
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2">
              <div className="relative w-48 sm:w-64 lg:w-auto hidden lg:block -mr-12">
                {" "}
                {/* Hidden on mobile and shown on larger screens */}
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/mizanme-42dca.firebasestorage.app/o/images%2FIllustration2.png?alt=media&token=23fa6ce3-e0a9-4f4d-8a60-ad4f3b59ff5e"
                  alt=""
                  width={300}
                  height={100}
                  className="w-full h-auto "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </CompLayout>
    </div>
  );
}
