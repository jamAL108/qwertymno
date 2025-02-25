import { useState } from "react";

const ResizableImage = (props:any) => {
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    console.log(naturalHeight,naturalWidth)
    setSize({ width: naturalWidth, height: naturalHeight });
  };


  return (
    <div className='w-full my-10 h-auto flex justify-center items-center'>
        <img 
            // height={size.height}
            // width={size.width}
            onLoad={handleImageLoad} 
            src={props.src}
            className="max-w-[70%] object-fit"
            alt="Resizable"
        />
    </div>
  );
};

export default ResizableImage;
