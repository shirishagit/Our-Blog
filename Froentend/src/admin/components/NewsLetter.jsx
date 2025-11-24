import React, { useState } from 'react';

const NewsLetter = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!email) return;

    alert("Thank you for subscribing!");

    // Clear input field
    setEmail("");
  };

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog</h1>
      <p className='md:text-lg text-gray-500 pb-8'>
        Subscribe to get the latest blog, new tech, and exclusive news
      </p>

      <form className='flex justify-center gap-2 mt-4' onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='Enter your email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='px-4 py-2 border border-gray-300 rounded-l outline-none'
        />
        <button
          type='submit'
          className='bg-blue-700 text-white px-6 py-2 rounded-r hover:scale-105 transition-all cursor-pointer'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
