import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { testimonials } from '../../data/landingData';

const Testimonials = () => (
  <section className="section-padding relative">
    <Container>
      <SectionHeading
        eyebrow="Loved by early users"
        title="Built for people who work with AI every day."
        description="Early voices on the Aion AI platform. (Placeholder profiles for this first version.)"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <figure className="glow-card flex h-full flex-col rounded-3xl p-6">
              <Quote className="h-7 w-7 text-aion-violet/60" />

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-3.5 w-3.5 fill-aion-gold text-aion-gold" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-aion-gold via-aion-violet to-aion-blue text-sm font-bold text-white">
                  {testimonial.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-aion-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default Testimonials;
