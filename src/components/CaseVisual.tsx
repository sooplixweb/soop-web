import type { CaseStudy } from '../types';

type CaseVisualProps = {
  caseStudy: CaseStudy;
  showProjectMockup?: boolean;
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

export function CaseVisual({ caseStudy, showProjectMockup = false }: CaseVisualProps) {
  const variant = getCaseVariant(caseStudy.segment);
  const isMaisBurguerCase = caseStudy.title.trim().toLowerCase() === 'mais burguer';
  const shouldShowProjectMockup = showProjectMockup && isMaisBurguerCase;

  return (
    <div className={`case-visual case-visual--${variant}${shouldShowProjectMockup ? ' case-visual--project-mockup' : ''}`}>
      <div className="case-visual__mock" aria-hidden="true">
        <div className="mock-browser">
          <div className="mock-browser__bar">
            <span />
            <span />
            <span />
          </div>
          {shouldShowProjectMockup ? (
            <div className="mock-browser__screen">
              <img src="/assets/mais-burguer-desktop.png" alt="" loading="lazy" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="mock-phone">
          {shouldShowProjectMockup ? (
            <div className="mock-phone__screen">
              <img src="/assets/mais-burguer-mobile.png" alt="" loading="lazy" />
            </div>
          ) : (
            <>
              <span />
              <strong />
              <i />
              <i />
            </>
          )}
        </div>
      </div>
      <div className="case-visual__caption">
        <span>{caseStudy.segment}</span>
        <strong>{caseStudy.title}</strong>
      </div>
    </div>
  );
}
