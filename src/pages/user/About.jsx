import React, { useState } from 'react';
import { ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
import choemvannin from '../../assets/ChoemVannin.jpg';

const About = () => {
  const [openBioIndex, setOpenBioIndex] = useState(null);

  const toggleBio = (index) => {
    setOpenBioIndex(openBioIndex === index ? null : index);
  };

  const credits = [
    {
      name: "Choem Vannin",
      role: "Project Manager",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
    {
      name: "Choem Vannin",
      role: "Business Logic",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
    {
      name: "Choem Vannin",
      role: "Database Design",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
    {
      name: "Choem Vannin",
      role: "Backend Developer",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
    {
      name: "Choem Vannin",
      role: "Designer",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
    {
      name: "Choem Vannin",
      role: "Frontend Developer",
      image: choemvannin,
      bio: "Computer Science student with hands-on experience in full-stack development using Java, Spring Boot, React.js, Vue.js, and SQL. Interested in backend and full-stack development, with a strong willingness to learn and grow."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            About the Project
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Driven by Passion & Innovation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">
            From architectural design to frontend execution, this project represents 
            an end-to-end commitment to crafting seamless user experiences and robust systems.
          </p>
        </section>

        {/* Lead / Creator Spotlight */}
        <section className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-blue-400 font-medium text-sm tracking-wide uppercase">
                Full-Stack Creator
              </span>
              <h2 className="text-3xl font-bold tracking-tight">Choem Vannin</h2>
              <p className="text-gray-300 max-w-md text-sm leading-relaxed">
                Spearheading the entire development lifecycle, bridging complex 
                business logic with clean, modern engineering.
              </p>
            </div>
            
            {/* Badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
              <UserCheck className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-300">Total Ownership</p>
                <p className="text-base font-semibold">Solo Team Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Our Team & Roles</h2>
            <p className="text-sm text-gray-500">Every responsibility behind bringing this application to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {credits.map((item, index) => {
              const isOpen = openBioIndex === index;

              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center space-y-4"
                >
                  {/* Developer Avatar Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/20 shadow-sm"
                  />

                  {/* Minimal Overview: Name and Role */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
                      {item.role}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleBio(index)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors pt-2 border-t border-gray-100 w-full justify-center cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{isOpen ? 'Hide Biography' : 'View Biography'}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Dropdown Biography Content */}
                  {isOpen && (
                    <div className="w-full pt-2 text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 transition-all duration-300">
                      {item.bio}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;