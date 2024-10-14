"use client"
import { useState } from 'react';

export default function DynamicParagraphs({ paragraphs }) {

    return (
        <div className="flex flex-col mb-0.5 mt-5 dark:bg-slate-600 w-5/6 rounded-md p-8">
            <div className=' h-96 overflow-y-scroll'>
                {paragraphs.map((paragraph, index) => (
                    <div
                        key={index}
                        className={`flex mb-5 w-full ${paragraph.emitter === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`text-l font-medium focus:border-blue-900 focus:ring-blue-900 w-auto overflow-scroll overscroll-auto p-3 border border-slate-50 rounded text-white ${paragraph.emitter === 'user'
                                ? 'bg-[#1e1b4b]'
                                : 'bg-[#4a044e]'
                                }`}
                        >
                            {paragraph.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
