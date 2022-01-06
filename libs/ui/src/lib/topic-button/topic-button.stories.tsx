import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { TopicButton, TopicButtonProps } from './topic-button';

export default {
  component: TopicButton,
  title: 'TopicButton',
  argTypes: {
    onClick: { action: 'onClick executed' },
  },
} as Meta;

const Template: Story<TopicButtonProps> = (args) => {
  const [clickedTopic, setClickedTopic] = useState('');

  console.log({ clickedTopic });

  return (
    <div className="bg-gray-300 p-20">
      <TopicButton {...args} onClick={(topic) => setClickedTopic(topic)} />

      {clickedTopic && <span>Clicked topic: {clickedTopic}</span>}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'Next.js',
};
