import aboutImage from "../assets/images/about-image.png";

export const About = () => {
  return (
    <div className="bg-blue">
      <div className="p-4 md:p-8 lg:p-16 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">About Us</h2>
          <p className="text-base md:text-lg lg:text-xl mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, beatae! Doloribus fuga aperiam magni
            ipsum repellat voluptates itaque error, atque, exercitationem fugit ab, modi ut voluptatum sequi ad eum!
            Rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quia suscipit deserunt, neque nemo
            veniam adipisci deleniti culpa dolor dolores omnis, rem veritatis assumenda eaque dignissimos ut, nam
            debitis numquam!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={aboutImage} alt="" className="w-full md:w-[400px] lg:w-[500px] h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};
