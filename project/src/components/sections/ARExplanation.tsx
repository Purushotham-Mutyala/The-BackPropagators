import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Camera, MousePointer, Check } from 'lucide-react';

const ARExplanation: React.FC = () => {
  const steps = [
    {
      icon: <Smartphone className="h-8 w-8 text-primary-700" />,
      title: 'Browse and Select',
      description: 'Find the perfect furniture piece from our extensive catalog'
    },
    {
      icon: <Camera className="h-8 w-8 text-primary-700" />,
      title: 'Scan Your Space',
      description: 'Point your camera at the area where you want to place the furniture'
    },
    {
      icon: <MousePointer className="h-8 w-8 text-primary-700" />,
      title: 'Place and Customize',
      description: 'Position, rotate, and scale the item until it looks perfect in your space'
    },
    {
      icon: <Check className="h-8 w-8 text-primary-700" />,
      title: 'Make Your Decision',
      description: "Once you're happy with how it looks, proceed to purchase with confidence"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">How AR Furnish Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our augmented reality technology makes visualizing furniture in your space simple and intuitive
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto relative z-10">
                  {step.icon}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[50%] w-full h-0.5 bg-primary-100 hidden lg:block" style={{ transform: 'translateX(50%)' }}></div>
                )}
                
                <div className="absolute top-0 left-0 right-0 text-center">
                  <span className="inline-block h-8 w-8 rounded-full bg-primary-700 text-white text-sm font-medium flex items-center justify-center mx-auto">
                    {index + 1}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 bg-neutral-100 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex items-center">
              <div>
                <h3 className="font-serif text-3xl font-bold mb-4">Try Before You Buy</h3>
                <p className="text-neutral-600 mb-6">
                  AR Furnish eliminates the guesswork by letting you see exactly how furniture will look in your home before making a purchase.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>Accurate to-scale 3D models</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>Works on most modern smartphones and tablets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>No app download required—works in your browser</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span>Take screenshots to compare different options</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-cover bg-center h-64 lg:h-auto" style={{ backgroundImage: "url('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARExplanation;