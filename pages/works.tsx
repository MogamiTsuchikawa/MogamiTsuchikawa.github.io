import { WorkDocument } from "../.slicemachine/prismicio";
import { createClient } from "../prismicio";
import { GetStaticProps } from "next";
type Props = {
  works: WorkDocument[];
};
const WorkPage = ({ works }: Props) => {
  return (
    <div>
      {works.map((w) => (
        <p key={w.id}>{w.data.title}</p>
      ))}
    </div>
  );
};
export default WorkPage;

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const works = await client.getAllByType("work");

  return {
    props: { works },
  };
};
