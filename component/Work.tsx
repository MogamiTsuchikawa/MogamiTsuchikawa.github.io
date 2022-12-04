import { FilledContentRelationshipField } from "@prismicio/types";
import Link from "next/link";
import { Col, Card, Button, Badge } from "react-bootstrap";
import {
  TagDocument,
  TagDocumentData,
  WorkDocument,
} from "../.slicemachine/prismicio";

type Props = {
  work: WorkDocument;
};

const Work = ({ work }: Props) => {
  const createAt = new Date(work.data.create_at!);
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      style={{ marginBottom: "10px" }}
      suppressHydrationWarning
    >
      <Link
        href={`/works/${work.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={
              work.data.cover_image.url
                ? work.data.cover_image.url
                : "myicon.jpg"
            }
            style={{
              aspectRatio: "4/3",
              objectFit: "cover",
              backgroundColor: "rgba(#fff, 0.7)",
              backgroundBlendMode: "overlay",
            }}
          />
          <Card.Body>
            <Card.Title>{work.data.title}</Card.Title>
            <Card.Text>{work.data.short_description}</Card.Text>
            <Card.Text style={{ margin: "0" }}>
              {createAt.getFullYear()} - {createAt.getMonth() + 1}
            </Card.Text>
            <Card.Text>
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
                    style={{ marginRight: "2px" }}
                  >
                    {t.name}
                  </Badge>
                );
              })}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Work;
