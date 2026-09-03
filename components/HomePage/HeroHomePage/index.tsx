import React from "react";

interface HeroHomeSectionProps {
  headerText: string;
  TitleText: string;
  descriptionText: string;
}

const HeroHomeSection = ({
  headerText,
  TitleText,
  descriptionText,
}: HeroHomeSectionProps) => {
  return (
    <section className="relative overflow-hidden border border-mist bg-ink px-6 py-14 text-pearl shadow-boutique sm:px-10 lg:px-14">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 border-l border-brass/30 bg-[radial-gradient(circle_at_40%_35%,rgba(185,155,95,0.24),transparent_34%),linear-gradient(135deg,rgba(143,168,154,0.18),transparent_55%)] lg:block" />
      <div className="relative max-w-2xl">
        <p className="mb-4 w-fit border-b border-brass pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brass">
          {headerText}
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
          {TitleText}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-pearl/75 sm:text-lg">
          {descriptionText}
        </p>
      </div>
    </section>
  );
};

export default HeroHomeSection;
