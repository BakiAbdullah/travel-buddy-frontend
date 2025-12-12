import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full py-20 bg-background">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
      <motion.span
        className="ml-4 text-lg font-semibold text-primary"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Loading...
      </motion.span>
    </div>
  );
}
