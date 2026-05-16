/**
 * Reusable premium card: frosted glass background, gradient border ring
 * and an optional hover-lift effect.
 *
 * Props:
 *   as       - element/tag to render (default "div")
 *   hover    - enable hover lift + shadow (default true)
 *   padded   - apply default padding (default true)
 *   className- extra classes
 */
const GlowCard = ({
  children,
  as: Tag = 'div',
  hover = true,
  padded = true,
  className = '',
  ...rest
}) => (
  <Tag
    className={[
      'glow-card rounded-3xl',
      padded ? 'p-6 sm:p-7' : '',
      hover
        ? 'transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover'
        : '',
      className,
    ].join(' ')}
    {...rest}
  >
    {children}
  </Tag>
);

export default GlowCard;
