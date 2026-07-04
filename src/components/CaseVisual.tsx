import type { CaseStudy } from '../types';

type CaseVisualProps = {
  caseStudy: CaseStudy;
};

function getCaseVariant(segment: string) {
  const normalizedSegment = segment.toLowerCase();

  if (normalizedSegment.includes('delivery') || normalizedSegment.includes('hamburgueria')) {
    return 'delivery';
  }

  if (normalizedSegment.includes('advocacia')) {
    return 'legal';
  }

  if (normalizedSegment.includes('clÃ­nica') || normalizedSegment.includes('clinica')) {
    return 'clinic';
  }

  return 'psychology';
}

export function CaseVisual({ caseStudy }: CaseVisualProps) {
  const variant = getCaseVariant(caseStudy.segment);

  return (
    <div className={`case-visual case-visual--${variant}`}>
      <div className="case-visual__mock" aria-hidden="true">
        <div className="mock-browser">
          <div className="mock-browser__bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-browser__hero">
            <div>
              <span />
              <strong />
              <strong />
            </div>
            <i />
          </div>
          <div className="mock-browser__grid">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="mock-phone">
          <span />
          <strong />
          <i />
          <i />
        </div>
      </div>
      <div className="case-visual__caption">
        <span>{caseStudy.segment}</span>
        <strong>{caseStudy.title}</strong>
      </div>
    </div>
  );
}
