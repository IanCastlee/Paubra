import { useInView } from "react-intersection-observer";

const LazyLoader = ({ src, alt, placeholder }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <img
      ref={ref}
      src={inView ? src : placeholder}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        transition: "opacity 0.5s ease-in-out",
        opacity: inView ? 1 : 0.5,
      }}
    />
  );
};

export default LazyLoader;
