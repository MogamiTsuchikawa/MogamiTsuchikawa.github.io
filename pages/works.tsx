import { WorkDocument } from "../.slicemachine/prismicio";
import { createClient } from "../prismicio";
import { GetStaticProps } from "next";
import { Container, Row } from "react-bootstrap";
import Work from "../component/Work";
import Head from "next/head";
type Props = {
  works: WorkDocument[];
};
const WorkPage = ({ works }: Props) => {
  return (
    <Container>
      <Head>
        <title>mogami.dev - Works</title>
        <meta name="description" content="最上土川のポートフォリオサイト" />
      </Head>
      <h1>Works</h1>
      <Row>
        {works
          .sort(
            (x, y) =>
              new Date(y.data.create_at!).getTime() -
              new Date(x.data.create_at!).getTime()
          )
          .map((work) => (
            <Work work={work} key={work.id} />
          ))}
      </Row>
    </Container>
  );
};
export default WorkPage;

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const works = await client.getAllByType("work", { fetchLinks: "tag.name" });

  return {
    props: { works },
  };
};
