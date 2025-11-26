import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shared/ui';
export const Route = createFileRoute('/content/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/content/"!
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        ArrowUpIcon
      </Button>
    </div>
  );
}
