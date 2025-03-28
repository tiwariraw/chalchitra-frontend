"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  setClickedcard,
  setLoading,
  setShowDialog,
  setStoreMovie,
} from "../app/redux/slice/movieSlice";
import { useRouter } from "next/navigation";

const HeroSection = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVideo = () => {
    dispatch(setStoreMovie(data?.videoUrl));
    router.push(`video/${data?.urlName}`);
  };

  const handleInfo = () => {
    dispatch(setLoading(true));
    dispatch(setShowDialog(true));
    dispatch(
      setClickedcard({
        title: data?.title,
        type: data?.type,
        genre: data?.genre,
        poster: data?.image,
        aiDescription: data?.description,
      })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="hero relative h-screen w-full overflow-hidden">
      {/* Background Image - Optimized */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data?.image}
          alt="Hero Background"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content Overlay */}
      <motion.div
        className="relative z-20 h-full flex items-center px-4 sm:px-8 lg:px-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl space-y-6 hero-container">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            variants={itemVariants}
          >
            {data?.title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-100 max-w-2xl hero-description"
            variants={itemVariants}
          >
            {data?.description}
          </motion.p>

          <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
            <motion.button
              className="playBtn px-6 py-3 rounded-md bg-red-600 text-white font-medium"
              onClick={handleVideo}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              ▶ Watch Now
            </motion.button>

            <motion.button
              className="moreInfoBtn px-6 py-3 rounded-md bg-white/20 text-white font-medium"
              onClick={handleInfo}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              ℹ More Info
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
