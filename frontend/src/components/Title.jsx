import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="text-3xl font-bold text-gray-800">
      {text1} <span className="text-indigo-600">{text2}</span>
    </h2>
  );
};

export default Title;
