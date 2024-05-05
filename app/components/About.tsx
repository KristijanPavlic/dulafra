export default function About() {
  return (
    <div className="container m-auto pt-20 pb-20 pl-5 pr-5">
      <h1 className="text-center text-3xl uppercase font-bold text-[#001120] mb-5">
        O nama
      </h1>
      <div>
        <p className="text-center text-[#333333] text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi ea odio
          nemo expedita animi quae officia iste ab? Nam expedita cumque modi
          commodi sed odio id sunt, sequi non facere earum consequatur dolorem
          cum eum in neque. Aspernatur modi hic, maxime ducimus dolorum minus
          placeat nam perferendis quidem dolore molestias natus facilis tenetur
          tempora repellendus cumque veritatis ipsa accusantium explicabo
        </p>
      </div>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-center border border-black w-fit m-auto p-4 rounded-lg gap-8">
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">12+</h2>
            <span className="text-[#333333]">godina iskustva</span>
          </div>
          <div className="w-full h-[1px] md:w-[1px] md:h-[50px] bg-black"></div>
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">5+</h2>
            <span className="text-[#333333]">profesionalnih fotografa</span>
          </div>
          <div className="w-full h-[1px] md:w-[1px] md:h-[50px] bg-black"></div>
          <div className="text-center min-w-[192px]">
            <h2 className="font-semibold text-[#001120] text-lg">40+</h2>
            <span className="text-[#333333]">odrađenih događanja</span>
          </div>
        </div>
      </div>
    </div>
  );
}
