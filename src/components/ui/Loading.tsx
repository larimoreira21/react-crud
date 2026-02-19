type LoadingProps = {
  fullScreen?: boolean;
};

function Loading({ fullScreen = false }: LoadingProps) {
  const spinner = (
    <div
      className="w-10 h-10 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"
      aria-hidden="true"
    />
  );

  if (fullScreen) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-black">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Loading;
