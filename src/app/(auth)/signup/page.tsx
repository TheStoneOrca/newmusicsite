"use client";

import SignUpForm from "./__components/form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center text-center">
        <h1 className="sm:text-5xl md:text-6xl lg:text-4xl mt-2">
          Sign Up To Continue Shopping
        </h1>
      </div>
      <div className="flex justify-center items-center h-[75vh]">
        <SignUpForm />
      </div>
    </div>
  );
}
