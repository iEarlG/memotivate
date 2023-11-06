import Image from "next/image";

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                    <Image 
                        alt="A person writing on a notebook"
                        src="/documents.png"
                        className="object-contain"
                        fill
                    />
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image 
                        alt="A person reading a book"
                        src="/reading.png"
                        className="object-contain"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}