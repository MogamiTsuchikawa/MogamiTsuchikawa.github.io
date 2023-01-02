import { createClient } from "../../prismicio";
import { GetStaticProps, GetStaticPaths } from "next";
import { WorkDocument } from "../../.slicemachine/prismicio";
import { asText } from "@prismicio/helpers";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
type Props = {
  work: WorkDocument;
};
const WorkDetailPage = ({ work }: Props) => {
  return (
    <Container>
      <Row>
        <Link href="/work">← Work一覧</Link>
      </Row>
      <Row>
        <h1>{work.data.title}</h1>
      </Row>
      <Row>
        <div
          dangerouslySetInnerHTML={{ __html: asText(work.data.description) }}
        ></div>
      </Row>
    </Container>
  );
};
export default WorkDetailPage;
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;
  const client = createClient();
  const work = await client.getByID<WorkDocument>(id as string);

  return { props: { work } };
};
export async function getStaticPaths() {
  const client = createClient();
  const works = await client.getAllByType("work", { fetchLinks: "tag.name" });
  const paths = works.map((work) => `/works/${work.id}`);
  return { paths, fallback: false };
}
