import type { CaseStudy } from '../types';

type CaseVisualProps = {
  caseStudy: CaseStudy;
  showProjectMockup?: boolean;
};

const projectMockups: Record<string, { desktopSrc: string; mobileSrc: string }> = {
  'mais burguer': {
    desktopSrc: '/assets/mais-burguer-desktop.png',
    mobileSrc: '/assets/mais-burguer-mobile.png',
  },
  'amagus lapidar': {
    desktopSrc: '/assets/amagus-lapidar-desktop.png',
    mobileSrc: '/assets/amagus-lapidar-mobile.png',
  },
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
  const normalizedTitle = caseStudy.title.trim().toLowerCase();
  const projectMockup = showProjectMockup ? projectMockups[normalizedTitle] : undefined;
  const shouldShowProjectMockup = Boolean(projectMockup);

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
              <img src={projectMockup!.desktopSrc} alt="" loading="lazy" />
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
              <img src={projectMockup!.mobileSrc} alt="" loading="lazy" />
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
