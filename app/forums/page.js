"user client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Forums = () => {

    const cardData = [
        {
            id: 1,
            image: '/sample.jpg',
            title: 'Python',
            description: 'Let\'s Discuss everything related to Python',
            slug:'python-discuss'
        },
        {
            id: 2,
            image: '/sample.jpg',
            title: 'JavaScript',
            description: 'Let\'s Discuss everything related to JavaScript',
            slug:'js-discuss'
        },
        {
            id: 3,
            image: '/sample.jpg',
            title: 'React',
            description: 'Let\'s Discuss everything related to React',
            slug:'react-discuss'
        },
        {
            id: 4,
            image: '/sample.jpg',
            title: 'Node.js',
            description: 'Let\'s Discuss everything related to Node.js',
            slug:'nodejs-discuss'
        },
        {
            id: 5,
            image: '/sample.jpg',
            title: 'AI',
            description: 'Let\'s Discuss everything related to CSS',
            slug:'ai-discuss'
        },
        {
            id: 6,
            image: '/sample.jpg',
            title: 'DSA',
            description: 'Let\'s Discuss everything related to SQL',
            slug:'dsa-discuss'
        },
    ];


    const Card = ({ image, title, description, slug }) => (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
            <div className="flex flex-col items-center py-10">
                <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={image}
                    width={100}
                    height={100}
                    alt={`${title} image`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {title}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </span>
                <div className="flex mt-4 md:mt-6">
                    <Link
                        href={`forum/${slug}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Discuss now
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex flex-wrap gap-6 justify-center max-auto">
                {cardData?.map(({ id, image, title, description, slug }) => (
                    <Card
                        key={id}
                        image={image}
                        title={title}
                        description={description}
                        slug={slug}
                    />
                ))}
            </div>
        </>
    )
}

export default Forums