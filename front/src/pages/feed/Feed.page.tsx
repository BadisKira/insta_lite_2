import PageContainer from "../../components/PageContainer/PageContainer";
import FeedPageSection from "../../pageSections/feed/feed.pageSection";

const FeedPage = () => {
  return (
    <PageContainer withHeader={true}>
      <FeedPageSection />
    </PageContainer>
  );
};

export default FeedPage;