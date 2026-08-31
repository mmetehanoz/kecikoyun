import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface LegalBlock {
  type: 'p' | 'list';
  text?: string;
  items?: string[];
}

export interface LegalSection {
  heading?: string;
  blocks: LegalBlock[];
}

export interface LegalContent {
  title: string;
  updated: string;
  intro?: string[];
  sections: LegalSection[];
}

export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="bg-[#FAFAF9]">
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container-site">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green transition-colors mb-4"
          >
            <ArrowLeft size={15} /> Ana Sayfa
          </Link>
          <h1 className="section-title">{content.title}</h1>
          <p className="text-sm text-gray-400 mt-3 font-medium">Son Güncelleme: {content.updated}</p>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-card p-8 md:p-12">
          {content.intro?.map((p, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4">
              {p}
            </p>
          ))}

          {content.sections.map((section, si) => (
            <section key={si} className="mb-8">
              {section.heading && (
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
              )}
              {section.blocks.map((block, bi) =>
                block.type === 'list' ? (
                  <ul key={bi} className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 leading-relaxed mb-3">
                    {block.items?.map((item, ii) => <li key={ii}>{item}</li>)}
                  </ul>
                ) : (
                  <p key={bi} className="text-sm text-gray-600 leading-relaxed mb-3">
                    {block.text}
                  </p>
                )
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}