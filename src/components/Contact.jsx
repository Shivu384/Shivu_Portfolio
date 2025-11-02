import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { contactInfo } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: contactInfo.name,
          from_email: form.email,
          to_email: contactInfo.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden mb-10`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact Me</h3>

        <div className='mt-8 mb-6 flex flex-wrap gap-4'>
          <div className='flex items-center gap-2 text-secondary'>
            <span className='text-white font-medium'>📧</span>
            <a href={`mailto:${contactInfo.email}`} className='hover:text-white transition-colors'>
              {contactInfo.email}
            </a>
          </div>
          <div className='flex items-center gap-2 text-secondary'>
            <span className='text-white font-medium'>📱</span>
            <a href={`tel:${contactInfo.phone}`} className='hover:text-white transition-colors'>
              {contactInfo.phone}
            </a>
          </div>
          <div className='flex items-center gap-2 text-secondary'>
            <span className='text-white font-medium'>📍</span>
            <span>{contactInfo.location}</span>
          </div>
        </div>

        <div className='mb-6 flex gap-4'>
          <a
            href={contactInfo.github}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 rounded-full bg-tertiary flex items-center justify-center hover:bg-[#915EFF] transition-colors'
          >
            <span className='text-white text-xl'>⚡</span>
          </a>
          <a
            href={contactInfo.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 rounded-full bg-tertiary flex items-center justify-center hover:bg-[#0077b5] transition-colors'
          >
            <span className='text-white text-xl'>💼</span>
          </a>
          <a
            href={contactInfo.leetcode}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 rounded-full bg-tertiary flex items-center justify-center hover:bg-[#ffa116] transition-colors'
          >
            <span className='text-white text-xl'>🔧</span>
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
