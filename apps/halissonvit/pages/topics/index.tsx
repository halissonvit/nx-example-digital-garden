import { TopicButton } from '@halissonvit/ui';

import './index.module.css';

/* eslint-disable-next-line */
export interface TopicsProps {}

export function Topics(props: TopicsProps) {
  return (
    <div className="md:container md:mx-auto p-20 bg-gray-100">
      <TopicButton name="Next.js" />
    </div>
  );
}

export default Topics;
