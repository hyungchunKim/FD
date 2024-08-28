import Button from "@/components/atoms/button";
import CaretLeft from "@/assets/icons/CaretLeft.svg";
import ArticleList from "@/components/pages/my-library/ArticleList";

const DetectedFiles = () => {
  return (
    <>
      <div className="mb-12 flex items-center justify-center">
        <Button rounded="md" variant="outline" size="small">
          <div className="flex items-center gap-6">
            <CaretLeft />
            <span className="title-md-medium">Clipping Article</span>
          </div>
        </Button>
      </div>
      <ArticleList />
    </>
  );
};
export default DetectedFiles;
