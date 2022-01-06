import './topic-button.module.css';

/* eslint-disable-next-line */
export interface TopicButtonProps {
  name: string;
  onClick?: (topic: string) => void;
}

export function TopicButton(props: TopicButtonProps) {
  return (
    <div
      onClick={() => {
        props.onClick?.(props.name);
      }}
      className="bg-white pl-4 rounded-lg shadow flex max-w-md min-w-max hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <h2 className="font-bold text-4xl">{props.name}</h2>
      </div>
    </div>
  );
}

export default TopicButton;
