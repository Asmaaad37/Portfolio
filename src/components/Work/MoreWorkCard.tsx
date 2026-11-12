import { moreWork } from '@/data/caseStudies';

/** Dashed end card pointing to everything else on GitHub. */
export default function MoreWorkCard() {
  return (
    <a
      className="card end"
      href={moreWork.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="GitHub ↗"
    >
      <div className="row">
        <span>Everything else</span>
        <span aria-hidden="true">↗</span>
      </div>
      <h3>{moreWork.title}</h3>
      <p>{moreWork.summary}</p>
    </a>
  );
}
