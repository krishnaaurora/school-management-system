import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────
   What Makes Greenfield Special?
   6 full-bleed image cards in a Bento-style grid.
   Each card shows only the image at rest.
   On hover → image blurs + dark overlay slides up
   revealing the title, tag, and description.
───────────────────────────────────────────────────── */

const FEATURES = [
  {
    id: 'holistic',
    tag: 'Core Philosophy',
    title: 'Holistic Education',
    desc: 'Nurturing intellectual depth, physical vitality, artistic expression, and ethical character in equal measure.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    alt: 'Students collaborating in a vibrant classroom seminar',
    span: 'md:col-span-7',
  },
  {
    id: 'digital',
    tag: 'Next-Gen Classrooms',
    title: 'Smart & Digital Learning',
    desc: 'Interactive panels, collaborative tablets, and digital repositories that elevate conceptual mastery for every learner.',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1000&auto=format&fit=crop',
    alt: 'Students using digital smart boards and laptops in modern classroom',
    span: 'md:col-span-5',
  },
  {
    id: 'stem',
    tag: 'Research & Discovery',
    title: 'Innovation & STEM',
    desc: 'Hands-on scientific inquiry, design thinking, and computational literacy integrated across all grade levels.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop',
    alt: 'Students programming and testing robotics kits in the STEM lab',
    span: 'md:col-span-5',
  },
  {
    id: 'growth',
    tag: 'Personal Mentorship',
    title: 'Student-Centred Growth',
    desc: 'Individualized mentoring pathways that honor distinct learning styles and personal passions.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop',
    alt: 'Teacher mentoring a student one-on-one in a quiet study space',
    span: 'md:col-span-4',
  },
  {
    id: 'values',
    tag: 'Character & Ethics',
    title: 'Life Skills & Values',
    desc: 'Developing leadership, empathy, teamwork, and lasting social responsibility through service learning.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop',
    alt: 'Students engaged in community service and outdoor leadership activity',
    span: 'md:col-span-3',
  },
  {
    id: 'sports',
    tag: 'Athletics & Performing Arts',
    title: 'Sports & Extra-Curriculars',
    desc: 'Olympic-standard facilities for athletics, swimming, basketball, music ensembles, drama, debate, and Model UN.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
    alt: 'Students competing in a school sports tournament on athletic turf',
    span: 'md:col-span-12',
    wide: true,
  },
];

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-editorial transition-shadow duration-300 ${feature.span}`}
      style={{ aspectRatio: feature.wide ? '21 / 7' : '4 / 3' }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      {/* ── Background Photo ── */}
      <img
        src={feature.image}
        alt={feature.alt}
        className="absolute inset-0 w-full h-full object-cover object-center
                   filter grayscale-[20%]
                   group-hover:scale-106 group-hover:blur-sm
                   transition-all duration-600 ease-out"
        loading="lazy"
      />

      {/* Always-on base gradient so card never feels completely raw */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent pointer-events-none" />

      {/* ── Resting state: just the title at the bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-14
                      bg-gradient-to-t from-forest-950/95 via-forest-950/60 to-transparent
                      group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <h3 className="font-serif text-base sm:text-lg font-bold text-ivory leading-snug">
          {feature.title}
        </h3>
      </div>

      {/* ── Hover overlay — slides up ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end
                   bg-gradient-to-t from-forest-950/98 via-forest-950/85 to-forest-950/30
                   px-5 pb-6 pt-10"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tag */}
        <span className="inline-block self-start text-[10px] text-gold-300
                         bg-forest-800/80 border border-gold-500/30
                         px-2.5 py-0.5 rounded uppercase tracking-widest font-semibold mb-3">
          {feature.tag}
        </span>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory leading-snug mb-1.5">
          {feature.title}
        </h3>

        {/* Gold rule */}
        <div className="w-8 h-[1.5px] bg-gold-500 mb-3" />

        {/* Description */}
        <p className="text-ivory/80 text-xs sm:text-sm leading-relaxed">
          {feature.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function SpecialFeatures() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-ivory-dark/70 border-t border-ivory-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-18 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-gold-600" />
              <span className="text-xs uppercase tracking-super-wide font-bold text-forest-800">
                Distinctive Strengths
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 leading-tight">
              What Makes Greenfield Special?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-md">
            Our pedagogical ecosystem harmonizes intellectual rigor, practical innovation, and personalized character development.
          </p>
        </div>

        {/* Bento Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
