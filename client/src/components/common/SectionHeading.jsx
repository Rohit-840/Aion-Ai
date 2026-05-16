import { motion } from 'framer-motion';
import Badge from './Badge';

/**
 * Standard section header: eyebrow badge + title + description.
 *
 * Props: eyebrow, title, description, align ("center" | "left").
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'flex flex-col gap-4',
        isCenter
          ? 'items-center text-center mx-auto max-w-2xl'
          : 'items-start text-left max-w-xl',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <Badge tone="gold" dot>
          {eyebrow}
        </Badge>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.14] tracking-tight text-white text-balance ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg leading-relaxed text-aion-muted text-balance">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
