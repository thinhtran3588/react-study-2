export const AppButton = ({ color, className, children, ...otherProps }) => {
  let buttonClassName =
    "text-white px-4 py-2 text-sm rounded-full cursor-pointer";
  if (color === "red") {
    buttonClassName += " bg-red-500";
  } else if (color === "blue") {
    buttonClassName += " bg-blue-500";
  } else if (color === "gray") {
    buttonClassName += " bg-gray-500";
  }
  if (className) {
    buttonClassName += " " + className;
  }
  return (
    <button className={buttonClassName} {...otherProps}>
      {children}
    </button>
  );
};
