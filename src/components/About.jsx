import React from 'react';

const About = () => {
  return (
    <section id="about" className="min-h-screen text-slate-300 py-20 pr-16">
      <div className="max-w-3xl">
        <div className="mb-12">
    <h2 class="text-2xl font-bold mb-4">
        <span class="text-purple-400 text-md">console</span><span class="text-slate-300 text-md">.</span><span class="text-blue-400 text-md">log</span><span class="text-slate-300">(</span><span class="text-teal-200">"From Mechanical Eng to Software Eng"</span><span class="text-slate-300">)</span>
    </h2>
          <div className="w-16 h-0.5 bg-teal-300"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            <p className="text-md  leading-relaxed text-justify text-slate-400">
              I’m a Software Engineering undergraduate with a not so traditional start. 
              I was studying <b><span class="text-slate-300">Mechanical Engineering.</span></b> While I enjoyed the logic and structure of engineering, 
              I was way more excited about building web and cloud based ideas I had in mind than designing CAD diagrams & mechanical systems.
            </p>
            
            <p className="text-md leading-relaxed text-justify text-slate-400">
            The switch felt risky, but it was one of the best decisions I've made.            </p>

            <p className="text-md leading-relaxed text-justify text-slate-400">
             Now I'm focused on full-stack development, building real projects and diving into web development and cloud systems. My engineering background still plays a huge role. 
             it  helps me think analytically, structure solutions, and approach challenges with a builder’s mindset.
            </p>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-200 mb-4">
                Technologies I work with:
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  JavaScript (ES6+)
                </div>
                 <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  Java
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  React
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  Node.js
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  MongoDB
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  Express.js
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  Tailwind CSS
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  Git & GitHub
                </div>
                <div className="flex items-center">
                  <span className="text-teal-300 mr-2">▸</span>
                  SQL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;