export default function PaperComponent({
  children,
  width,
  height,
  style,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 m-1"
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  );
}
