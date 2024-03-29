import { FilledLinkToMediaField, FilledLinkToWebField } from "@prismicio/types";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { ToppageDocument } from "../.slicemachine/prismicio";
import { createClient } from "../prismicio";
type Props = {
  contents: ToppageDocument<string>;
};
const IndexPage = ({ contents }: Props) => {
  const iconStyle = {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    display: "block",
    margin: "0 auto",
  };
  return (
    <Container>
      <Head>
        <title>mogami.dev</title>
        <meta name="description" content="最上土川のポートフォリオサイト" />
      </Head>
      <Row style={{ marginTop: "40px" }}>
        <Col xs={12} md={4}>
          <img src="./myicon.jpg" alt="icon" style={iconStyle} />
        </Col>
        <Col xs={12} md={8}>
          <h3
            style={{ fontSize: "30px", margin: "0 0 0 0", textAlign: "center" }}
          >
            最上土川
          </h3>
          <h4
            style={{
              fontSize: "16px",
              margin: "0 0 5px 0",
              textAlign: "center",
            }}
          >
            Mogami Tsuchikawa
          </h4>
          <p style={{ textAlign: "center" }}>{contents.data.description}</p>
          <h4 style={{ margin: "10px 0 5px 0", textAlign: "center" }}>所属</h4>
          {contents.data.affiliation.map((af) => (
            <p
              style={{
                fontSize: "14px",
                margin: "0 0 0 0",
                textAlign: "center",
              }}
              key={af.viewid}
            >
              {af.content}
            </p>
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2 style={{ textAlign: "center", margin: "40px 0 10px 0" }}>
            Award
          </h2>
          <div style={{ margin: "40px 0 10px 0", textAlign: "center" }}>
            {contents.data.awards.map((aw) =>
              aw.link.link_type !== "Any" ? (
                <a href={aw.link.link_type} key={aw.content}>
                  {aw.content}
                </a>
              ) : (
                <p key={aw.content}>{aw.content}</p>
              )
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2 style={{ textAlign: "center", margin: "40px 0 10px 0" }}>
            Contacts
          </h2>
          <div
            className="d-flex justify-content-center"
            style={{ margin: "40px 0 10px 0" }}
          >
            {contents.data.contacts.map((con) => (
              <a
                href={(con.link as FilledLinkToWebField).url}
                target="_blank"
                rel="noreferrer"
                style={{
                  margin: "2px",
                  textDecoration: "none",
                  color: "inherit",
                  width: "150px",
                  textAlign: "center",
                }}
                key={con.name}
              >
                <img
                  src={(con.icon as FilledLinkToMediaField).url}
                  alt=""
                  style={{ width: "100px" }}
                />
                <p>{con.name}</p>
              </a>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2 style={{ textAlign: "center", margin: "40px 0 10px 0" }}>
            Skill
          </h2>
        </Col>
        {contents.data.skills.map((skill) => (
          <Col key={skill.name}>
            <img
              src={skill.url!}
              alt={skill.name!}
              style={{ height: 80, width: 80 }}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ margin: "40px 0 10px 0" }}></Row>
    </Container>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const contents = await client.getSingle("toppage");

  return {
    props: { contents },
  };
};
