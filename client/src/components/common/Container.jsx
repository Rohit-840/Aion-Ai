/**
 * Centred, max-width content wrapper with responsive horizontal padding.
 */
const Container = ({ children, className = '', as: Tag = 'div' }) => (
  <Tag className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </Tag>
);

export default Container;
