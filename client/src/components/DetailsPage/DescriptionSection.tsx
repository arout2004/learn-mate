import React from "react";

const DescriptionSection = ({ sections }: any) => {
  return (
    <section className="w-full">
      {sections.map((section: any, index: any) => (
        <div key={index}>
          <h1 className="text-3xl mt-5">{section.title}</h1>
          {section.content.map((paragraph: any, pIndex: any) => (
            <p className="mt-5 text-gray-600" key={pIndex}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};

export default DescriptionSection;
