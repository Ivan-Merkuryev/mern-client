import { motion } from "framer-motion";

function Loader({ err }) {
  const btnReload = () => {
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <motion.div
        className="loader"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "inline-block",
          position: "relative",
          background:
            "linear-gradient(0deg, rgba(31, 165, 240, 0.2) 33%, #1FA5F0 100%)",
          boxSizing: "border-box",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: .8, ease: "linear", repeat: Infinity }}
      >
        <motion.div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#fff",
          }}
        ></motion.div>
      </motion.div>
      {err && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Произошла ошибка</p>
          <button className="open-btn" onClick={btnReload}>
            Обновить
          </button>
        </div>
      )}
    </div>
  );
}
export default Loader;
