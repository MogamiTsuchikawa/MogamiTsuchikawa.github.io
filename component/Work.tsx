import Link from "next/link";
import { Col, Card, Button } from "react-bootstrap";
import { WorkDocument } from "../.slicemachine/prismicio";

type Props = {
  work: WorkDocument;
};

const Work = ({ work }: Props) => {
  return (
    <Col xs={4} style={{ marginBottom: "10px" }} suppressHydrationWarning>
      <Link
        href={`/works/${work.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card>
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
            <Card.Text>
              {new Date(work.data.create_at!).toLocaleString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Work;
