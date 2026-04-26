export default function Contact() {
  const contacts = [
    {
      name: "Email",
      value: "bigyamkarmacharya@gmail.com",
      icon: "fa-regular fa-envelope",
      color: "bg-red-100",
      iconColor: "text-red-600",
      href: "mailto:bigyamkarmacharya@gmail.com"
    },
    {
      name: "LinkedIn",
      value: "LinkedIn Profile",
      icon: "fa-brands fa-linkedin-in",
      color: "bg-blue-100",
      iconColor: "text-blue-700",
      href: "https://www.linkedin.com/in/bigyam-karmacharya-7274a036a/"
    },
    {
      name: "Instagram",
      value: "Instagram Profile",
      icon: "fa-brands fa-instagram",
      color: "bg-pink-100",
      iconColor: "text-pink-600",
      href: "https://www.instagram.com/bigyam_karmacharya/"
    },
    {
      name: "GitHub",
      value: "GitHub Profile",
      icon: "fa-brands fa-github",
      color: "bg-gray-100",
      iconColor: "text-gray-800",
      href: "https://github.com/bizzyumK"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Contact Me
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-teal-600 mx-auto rounded-full"></div>

          <p className="text-gray-600 mt-3 text-sm sm:text-base md:text-lg">
            Feel free to reach out through any of the platforms below:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition group"
            >
              <div className="flex items-center gap-3 sm:gap-4">

                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${contact.color} rounded-full flex items-center justify-center group-hover:scale-110 transition`}>
                  <i className={`${contact.icon} ${contact.iconColor} text-lg sm:text-xl`}></i>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm text-gray-500 mb-1">
                    {contact.name}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-800 font-medium group-hover:text-teal-600 transition">
                    {contact.value}
                  </p>
                </div>

              </div>
            </a>
          ))}

        </div>

      </div>
    </div>
  );
}