import Button from "@/components/atoms/button";
import CaretLeft from "@/assets/icons/CaretLeft.svg";
import MyLibraryList from "@/components/pages/my-library/MyLibraryList";
const DetectedFiles = () => {
  return (
    <>
      <div className="mb-12 flex items-center justify-center">
        <Button rounded="md" variant="outline" size="small">
          <div className="flex items-center gap-6">
            <CaretLeft />
            <span className="title-md-medium">Detected Files</span>
          </div>
        </Button>
      </div>
      <MyLibraryList className="mb-[124px]" />
    </>
  );
};
export default DetectedFiles;
