import React from 'react';
import image1 from '../assets/images/Yikes.svg';
import image2 from '../assets/images/Yes.svg';
import image3 from '../assets/images/Hello.svg';
import image4 from '../assets/images/Yikes.svg';

const articles = [
  {
    id: 1,
    title: 'KSL book 1',
    description: 'Lorem ipsum',
    image: image1,
    link: 'https://www.ndcs.org.uk/media/2983/kenyan-sign-language-book-1.pdf',
  },
  {
    id: 2,
    title: 'KSL book 2',
    description: 'Lorem ipsum',
    image: image2,
    link: 'https://www.ndcs.org.uk/media/1483/kenyan-sign-language-book-2.pdf',
  },
  {
    id: 3,
    title: 'KSL as a medium of instruction',
    description: 'Lorem ipsum',
    image: image3,
    link: 'https://multilingual-education.springeropen.com/articles/10.1186/s13616-014-0014-1',
  },
  {
    id: 4,
    title: 'KSL blog 4',
    description: 'Lorem ipsum',
    image: image4,
    link: 'https://example.com/article4',
  },
];

const About = () => {
  return (
    <div className="container mx-auto justify-center py-8">
      <h1 className="text-[25px] font-poppins font-normal mb-8 text-center">Explore n' More</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            </a>
            <div className="p-4">
              <h2 className="text-[18px] font-poppins font-semibold mb-2">{article.title}</h2>
              <p className="font-poppins text-[10px] text-gray-600">{article.description}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-poppins text-[15px] text-[#8b4513] hover:text-grey-700"
              >
                Read more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
