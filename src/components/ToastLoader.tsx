import { Loader } from "./Loader";
type Props = {
  loadingMessage?: string;
};
export const ToastLoader = ({ loadingMessage }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span>{loadingMessage ?? "Loading..."}</span>
      <Loader />
    </div>
  );
};
