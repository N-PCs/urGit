import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface GithubMarkdownPreviewProps {
  markdown: string;
}

const GithubMarkdownPreview: React.FC<GithubMarkdownPreviewProps> = ({ markdown }) => {
  return (
    <div className="markdown-body p-8 md:p-12 animate-in fade-in duration-700">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <img {...props} style={{ maxWidth: '100%', display: 'inline-block' }} />
          ),
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold border-b pb-2 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold border-b pb-2 mb-4 mt-6" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-4 mt-6" {...props} />,
          p: ({ node, ...props }) => <div className="mb-4" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          hr: ({ node, ...props }) => <hr className="my-8 border-slate-200 dark:border-slate-800" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-slate-200 dark:border-slate-800 pl-4 py-1 italic opacity-80 mb-4" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>

      <style>{`
        .markdown-body {
          color: inherit;
          line-height: 1.6;
        }
        .markdown-body [align="center"] {
          text-align: center;
          display: block;
          margin: 1.5rem 0;
        }
        .markdown-body [align="center"] img {
          margin: 0 4px;
        }
        .markdown-body [align="left"] {
          text-align: left;
          display: block;
          margin: 1.5rem 0;
        }
        .markdown-body p img {
          vertical-align: middle;
        }
        .markdown-body table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1rem;
        }
        .markdown-body th, .markdown-body td {
          border: 1px solid #d0d7de;
          padding: 6px 13px;
        }
        .dark .markdown-body th, .dark .markdown-body td {
          border-color: #30363d;
        }
      `}</style>
    </div>
  );
};

export default GithubMarkdownPreview;
