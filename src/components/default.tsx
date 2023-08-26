import { InboxIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface IDefaultStateProps {
  title: string;
  description?: string;
  btn?: string;
  onClick?: () => void;
}

export default function Default(props: IDefaultStateProps) {
  const { title, description, btn, onClick } = props;

  const iconStyle = "h-8 w-8 text-white";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <figure className="rounded-full bg-primary p-3">
        <InboxIcon className={iconStyle} />,
      </figure>
      <h1 className="mt-10 font-medium capitalize">{title}</h1>
      {description && (
        <p className="mb-5  mt-5 w-full text-center text-lg text-gray-400 xl:w-1/2">
          {description}
        </p>
      )}
      {btn && onClick && (
        <Button variant="default" onClick={() => onClick()}>
          {btn}
        </Button>
      )}
    </div>
  );
}
