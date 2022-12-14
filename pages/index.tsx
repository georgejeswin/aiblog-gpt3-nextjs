import Head from "next/head";
import { FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState<{
    subject: string;
    images: boolean;
    imagesLength: number;
  }>({
    subject: "",
    images: false,
    imagesLength: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult("");
    const response = await fetch("/api/gpt3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionInput }),
    });
    const data = await response.json();
    setLoading(false);
    setResult(data.result);
    setQuestionInput({
      subject: "",
      images: false,
      imagesLength: 0,
    });
  }

  return (
    <div>
      <Head>
        <title>AI Blog</title>
        <link rel="icon" href="/logo.jpeg" />
      </Head>

      <h3 className={styles.heading}>Create your blog</h3>
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter your subject"
            value={questionInput.subject}
            required
            onChange={(e) =>
              setQuestionInput({ ...questionInput, subject: e.target.value })
            }
          />

          <input
            type="submit"
            value={loading ? "Creating..." : "Create"}
            disabled={!questionInput.subject.length}
          />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
