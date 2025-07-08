export  const ScrollToSection=(id)=>{
    const element = document.getElementById(id);
    if (element) {
      // Option 1: Using scrollIntoView with smooth behavior
    //   element.scrollIntoView({ 
    //     behavior: 'smooth',
    //     block: 'start'
    //   });

      // Option 2: Alternative method using smooth scroll polyfill
      window.scroll({
        top: element.offsetTop - 100, // Subtract header height or desired offset
        behavior: 'smooth'
      });
    }
  }

  // Reusable FeatureCard component

export  const FeatureCard = ({ title, description }) => (
  <div className="text-center px-4">
    <h3 className="text-colorTheme-primary font-medium text-xl mb-4">
      {title}
    </h3>
    <p className="text-white text-md leading-relaxed">{description}</p>
  </div>
);