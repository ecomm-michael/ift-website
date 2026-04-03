import { TaglineReveal } from '@/components/home/TaglineReveal';
import { StatsSection } from '@/components/home/StatsSection';
import { ThreePillars } from '@/components/home/ThreePillars';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { SponsorStrip } from '@/components/home/SponsorStrip';
import { EmailCapture } from '@/components/home/EmailCapture';

export default function HomePage() {
  return (
    <>
      {/* CinematicHero will go here once the hero pipeline is built */}
      <TaglineReveal />
      <StatsSection />
      <ThreePillars />
      <UpcomingEvents />
      <SponsorStrip />
      <EmailCapture />
    </>
  );
}
