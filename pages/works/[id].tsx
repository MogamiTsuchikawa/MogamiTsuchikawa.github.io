import { createClient } from "../../prismicio";
import { GetStaticProps, GetStaticPaths } from "next";
import { TagDocumentData, WorkDocument } from "../../.slicemachine/prismicio";
import { asText } from "@prismicio/helpers";
import { Container, Row, Col, Badge, Carousel, Button } from "react-bootstrap";
import Link from "next/link";
import { convertToHtml } from "../../util/markdown-util";
import { FilledContentRelationshipField } from "@prismicio/types";
import Head from "next/head";
type Props = {
  work: WorkDocument;
};
const WorkDetailPage = ({ work }: Props) => {
  return (
    <Container>
      <Head>
        <title>{work.data.title}</title>
        <meta name="description" content="最上土川のポートフォリオサイト" />
      </Head>
      <Row className="mt-2">
        <Link href="/works">
          <Button variant="secondary" size="sm">
            ← Work一覧
          </Button>
        </Link>
      </Row>
      <Row>
        <h1>{work.data.title}</h1>
      </Row>
      <Row>
        <div>
          {work.data.tags.map((tag) => {
            const t = (
              tag.tag as FilledContentRelationshipField<
                "tag",
                string,
                TagDocumentData
              >
            ).data!;
            return (
              <Badge
                bg="primary"
                key={t.name}
                style={{ marginRight: "2px", display: "inline-block" }}
              >
                {t.name}
              </Badge>
            );
          })}
        </div>
      </Row>
      <hr />
      <Row>
        <Carousel>
          <Carousel.Item>
            <img
              src={work.data.cover_image.url!}
              alt={work.data.cover_image.alt!}
              style={{ objectFit: "cover", maxHeight: 400, width: "100%" }}
            />
          </Carousel.Item>
          {work.data.images.map((image) => (
            <Carousel.Item key={image.image.url!}>
              <img
                src={image.image.url!}
                alt={image.description!}
                style={{ objectFit: "cover", maxHeight: 400, width: "100%" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row>
        <div
          dangerouslySetInnerHTML={{
            __html: convertToHtml(asText(work.data.description)),
          }}
        ></div>
      </Row>
    </Container>
  );
};
export default WorkDetailPage;
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;
  const client = createClient();
  const work = await client.getByID<WorkDocument>(id as string, {
    fetchLinks: "tag.name",
  });

  return { props: { work } };
};
export const getStaticPaths = async () => {
  const client = createClient();
  const works = await client.getAllByType("work");
  const paths = works.map((work) => `/works/${work.id}`);
  return { paths, fallback: false };
};
