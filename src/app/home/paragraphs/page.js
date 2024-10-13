"use client"
import { useState } from 'react';

export default function DynamicParagraphs() {
    const [paragraphs, setParagraphs] = useState([
        { text: 'Initial paragraph from user', emitter: 'user' },
        { text: 'Initial paragraph from checker', emitter: 'checker' },
    ]);

    const addUserParagraph = () => {
        setParagraphs([
            ...paragraphs,
            { text: 'New generated paragraph from user', emitter: 'user' },
        ]);
    };

    const addCheckerParagraph = () => {
        setParagraphs([
            ...paragraphs,
            { text: 'New generated paragraph from checker', emitter: 'checker' },
        ]);
    };

    return (
        <div className="flex flex-col mb-10 mt-5 dark:bg-slate-800 w-5/6 rounded p-8">
            <div className=' h-96 overflow-y-scroll'>
                {paragraphs.map((paragraph, index) => (
                    <div
                        key={index}
                        className={`flex mb-5 w-full ${paragraph.emitter === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`text-l font-medium focus:border-blue-900 focus:ring-blue-900 w-auto overflow-scroll overscroll-auto p-3 border border-slate-50 rounded-md ${paragraph.emitter === 'user'
                                ? 'text-white bg-blue-500'
                                : 'text-black bg-green-300'
                                }`}
                        >
                            {paragraph.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 ml-32">
                <button
                    onClick={addUserParagraph}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Add User Paragraph
                </button>
                <button
                    onClick={addCheckerParagraph}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Checker Paragraph
                </button>
            </div>
        </div>

    );
}
