import CompLayout from "./CompLayout";
import CarouselComp from "./CarouselComp";

export default function TestimonialSection() {
  return (
    <div id="testimonials">
      <CompLayout
        title="Testimonials"
        description="We craft Al-generated music that instantly elevates your mood, backed by
neuroscience and expert techniques. Experience personalized melodies that adapt to
your needs, bringing harmony with just a tap. Our psychologist-refined algorithms
ensure evidence-based mood enhancement, blending technology and expertise in
every track."
      >
        <CarouselComp />
      </CompLayout>
    </div>
  );
}
