import GooglePlayImage from "../assets/images/GooglePlay.png";

const footerData = [
  {
    title: "Company",
    items: [
      { name: "About", link: "https://www.google.com" },
      { name: "Menu", link: "https://www.google.com" },
      { name: "Inscrire un Livreur", link: "/register-delivery" },
      { name: "Inscrire un restaurant", link: "/restaurateur" },
    ]
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", link: "https://www.google.com" },
      { name: "Licensing", link: "https://www.google.com" },
      { name: "Terms & Conditions", link: "https://www.google.com" },
    ]
  },
  {
    title: "Help",
    items: [
      { name: "Contact Us", link: "https://www.google.com" },
      { name: "FAQs", link: "https://www.google.com" },
    ]
  },
  {
    title: "Download App",
    items: [
      { 
        name: <img src={GooglePlayImage} alt="GooglePlayImage" style={{ width: '150px', height: '50px' }} />,
        link: "https://play.google.com/store" 
      },
    ]
  },
]

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        {footerData.map((section, idx) => (
          <div key={idx} className="mb-8 md:mb-0">
            <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">{section.title}</h2>
            <ul className="text-gray-300">
              {section.items.map((item, id) => (
                <li key={id} className="mb-4">
                  <a href={item.link} className="hover:underline" target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="py-6 px-4 bg-black md:flex md:items-center md:justify-between">
        <span className="text-sm text-yellow-400 sm:text-center">© 2023 CESI EATS. All Rights Reserved.</span>
      </div>
    </footer>
  );
};
