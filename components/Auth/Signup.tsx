"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Account created successfully!");
      } else {
        const result = await response.json();
        setError(result.message || "Something went wrong!");
      }
    } catch (error) {
      setError("Network error! Please try again later.");
    }
  };

  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Create an Account
            </h2>

            <div className="flex items-center gap-8">
              <button
                aria-label="signup with google"
                className="text-body-color dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
              >
                <span className="mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_95:967)">
                      <path
                        d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_95:967">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Signup with Google
              </button>

              <button
                aria-label="signup with github"
                className="text-body-color dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
              >
                <span className="mr-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 0C4.92518 0 0 4.92482 0 11C0 15.8704 3.1648 19.9992 7.55232 21.488C8.08795 21.5866 8.27478 21.2508 8.27478 20.9588C8.27478 20.694 8.26437 19.965 8.25899 19.0313C5.2059 19.7083 4.63492 17.7963 4.63492 17.7963C4.14576 16.5373 3.40676 16.1971 3.40676 16.1971C2.40732 15.5613 3.48128 15.5741 3.48128 15.5741C4.58369 15.6524 5.15409 16.7003 5.15409 16.7003C6.1104 18.3687 7.66466 17.8858 8.27788 17.6218C8.37674 16.888 8.66317 16.3944 8.98371 16.1288C6.54059 15.862 3.9315 14.9199 3.9315 10.6278C3.9315 9.39633 4.37067 8.37383 5.10383 7.5765C4.98685 7.31011 4.59942 6.21266 5.21409 4.68973C5.21409 4.68973 6.18761 4.40549 8.24752 5.87205C9.17976 5.61399 10.1894 5.48505 11.1937 5.48098C12.1985 5.48505 13.2081 5.61399 14.1413 5.87205C16.1987 4.40549 17.1708 4.68973 17.1708 4.68973C17.7872 6.21266 17.3998 7.31011 17.2828 7.5765C18.0181 8.37383 18.4535 9.39633 18.4535 10.6278C18.4535 14.9297 15.8397 15.8576 13.3877 16.1198C13.8051 16.4578 14.1948 17.1631 14.1948 18.1958C14.1948 19.6853 14.179 20.6092 14.179 20.9588C14.179 21.2524 14.363 21.5914 14.9057 21.487C19.2946 19.997 22.4575 15.8696 22.4575 11C22.4575 4.92482 17.5323 0 11 0Z"
                      fill="black"
                    />
                  </svg>
                </span>
                Signup with Github
              </button>
            </div>

            <div className="text-body-color mb-5 text-center">
              <span>Or, register with your email address</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="firstName"
                      className="text-dark mb-3 block text-sm font-medium dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={data.firstName}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.target.value })
                      }
                      placeholder="John"
                      className="text-body-color dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border border-stroke bg-white px-6 py-3 text-base font-medium outline-none transition-all duration-300 focus:border-primary focus:shadow-primary dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="lastName"
                      className="text-dark mb-3 block text-sm font-medium dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={data.lastName}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                      placeholder="Doe"
                      className="text-body-color dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border border-stroke bg-white px-6 py-3 text-base font-medium outline-none transition-all duration-300 focus:border-primary focus:shadow-primary dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="text-dark mb-3 block text-sm font-medium dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="text-body-color dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border border-stroke bg-white px-6 py-3 text-base font-medium outline-none transition-all duration-300 focus:border-primary focus:shadow-primary dark:focus:border-primary"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="text-dark mb-3 block text-sm font-medium dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="Your Password"
                  className="text-body-color dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border border-stroke bg-white px-6 py-3 text-base font-medium outline-none transition-all duration-300 focus:border-primary focus:shadow-primary dark:focus:border-primary"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="w-full rounded-lg border border-primary bg-primary px-9 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </form>

            <p className="text-body-color mt-8 text-center text-sm font-medium">
              Already have an account?
              <Link href="/signin" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  );
};

export default Signup;
