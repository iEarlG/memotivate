
const PublicLayout = ({
    children
}: { children: React.ReactNode }) => {
    return ( 
        <div className="h-full dark:bg-[#0F0F0F]">
            {children}
        </div>
    );
}
 
export default PublicLayout;