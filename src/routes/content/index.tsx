import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shared/ui';
export const Route = createFileRoute('/content/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <span> Hello "/content/"!</span>
      {/* <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        ArrowUpIcon
      </Button>
      <video src="https://www.pexels.com/vi-vn/download/video/4115420/" />
      <video src="https://www.pexels.com/vi-vn/download/video/34722109/" />
      <video src="https://www.pexels.com/vi-vn/download/video/34762062/" />
      <video src="https://www.pexels.com/vi-vn/download/video/28645772/" />
      <video src="https://www.pexels.com/vi-vn/download/video/4115420/" />
      <video src="https://www.pexels.com/vi-vn/download/video/4115420/" />
      <video src="https://www.pexels.com/vi-vn/download/video/4115420/" /> */}
    </>
  );
}
