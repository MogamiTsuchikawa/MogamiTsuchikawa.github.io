import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { WorkDocument } from "../.slicemachine/prismicio";
type Props = {
  works: WorkDocument[];
};
export default function Home({ works }: Props) {
  return (
    <div className={styles.container}>
      {works.map((w) => (
        <p key={w.id}>{w.data.title}</p>
      ))}
    </div>
  );
}

import { createClient } from "../prismicio";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const works = await client.getAllByType("work");

  return {
    props: { works },
  };
};
